import Activity from '../Model';
import message from '../../utils/messages';
import { get } from 'lodash';
import escapeRegExp from '../../utils/escapeRegExp';
import analytics from '../../analytics/controllers/analytics';
import paginationSearchFormatter from '../../utils/paginationSearchFormatter';

// Поиск с пагинацией

const activitySearch = async (req, res) => {
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

    const totalCountPromise = Activity.countDocuments(query); // Находим кол-во результатов
    const searchPromise = activitySearchQuery({ query, page, limit }); // Находим результат

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

    res.status(200).json(message.success('ActivitySearch ok', result));
  } catch (error) {
    const analyticsId = analytics('ACTIVITY_SEARCH_ERROR', {
      error,
      body: req.body,
      entity: 'Activity',
      user: userId,
      controller: 'activitySearch',
    });

    res.status(400).json(message.fail('ActivitySearch error', analyticsId));
  }
};

export default activitySearch;

function activitySearchQuery({ query, page, limit }) {
  return Activity.find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(limit * (page - 1))
    .exec()
    .then((docs) => {
      return message.success('Activity found', docs);
    });
}
