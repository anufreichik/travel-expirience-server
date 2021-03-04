import Order from '../Model';
import message from '../../utils/messages';
import { get } from 'lodash';
import escapeRegExp from '../../utils/escapeRegExp';
import analytics from '../../analytics/controllers/analytics';
import paginationSearchFormatter from '../../utils/paginationSearchFormatter';

// Поиск с пагинацией

const orderSearch = async (req, res) => {
  const userId = get(req, 'userData.userId');

  try {
    let limit = +get(req, 'body.limit', 20);
    limit = limit > 100 ? 100 : limit; // показать не больше 100
    const page = +get(req, 'body.page', 1);

    // параметры поиска
    const name = get(req, 'body.name', '');
    // const accessType = get(req, 'body.accessType', 'all');

    // формирование запроса
    const query = {};

    if (name) {
      query.name = { $regex: escapeRegExp(name), $options: 'i' };
    }

    // if (accessType) {
    //   query.accessType = { $eq: accessType };
    // }

    const totalCountPromise = Order.countDocuments(query); // Находим кол-во результатов
    const searchPromise = orderSearchQuery({ query, page, limit }); // Находим результат

    // Запускаем запросы параллельно
    const PromiseAllResult = await Promise.all([totalCountPromise, searchPromise]);

    const searchResultCount = PromiseAllResult[0];
    const searchResult = PromiseAllResult[1];

    const result = paginationSearchFormatter({
      page,
      limit,
      searchResultCount,
      searchResult: searchResult.payload,
    });

    res.status(200).json(message.success('OrderSearch ok', result));
  } catch (error) {
    const analyticsId = analytics('ORDER_SEARCH_ERROR', {
      error,
      body: req.body,
      entity: 'Order',
      user: userId,
      controller: 'orderSearch',
    });

    res.status(400).json(message.fail('OrderSearch error', analyticsId));
  }
};

export default orderSearch;

function orderSearchQuery({ query, page, limit }) {
  return Order.find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(limit * (page - 1))
    .populate({
      path: 'client',
      select: 'name',
    })
    .exec()
    .then((docs) => {
      return message.success('Order found', docs);
    });
}
