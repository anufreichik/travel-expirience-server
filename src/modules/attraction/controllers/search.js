import Attraction from '../Model';
import message from '../../utils/messages';
import { get } from 'lodash';
import escapeRegExp from '../../utils/escapeRegExp';
import analytics from '../../analytics/controllers/analytics';
import paginationSearchFormatter from '../../utils/paginationSearchFormatter';

// Поиск с пагинацией

const attractionSearch = async (req, res) => {
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

    const totalCountPromise = Attraction.countDocuments(query); // Находим кол-во результатов
    const searchPromise = attractionSearchQuery({ query, page, limit }); // Находим результат

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

    res.status(200).json(message.success('AttractionSearch ok', result));
  } catch (error) {
    const analyticsId = analytics('ATTRACTION_SEARCH_ERROR', {
      error,
      body: req.body,
      entity: 'Attraction',
      user: userId,
      controller: 'attractionSearch',
    });

    res.status(400).json(message.fail('AttractionSearch error', analyticsId));
  }
};

export default attractionSearch;

function attractionSearchQuery({ query, page, limit }) {
  return Attraction.find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(limit * (page - 1))
    .exec()
    .then((docs) => {
      return message.success('Attraction found', docs);
    });
}
