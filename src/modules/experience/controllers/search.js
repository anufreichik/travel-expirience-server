import Experience from '../Model';
import message from '../../utils/messages';
import { get } from 'lodash';
import escapeRegExp from '../../utils/escapeRegExp';
import paginationSearchFormatter from '../../utils/paginationSearchFormatter';

// Поиск с пагинацией

const experienceSearch = async (req, res) => {
  try {
    let limit = +get(req, 'body.limit', 20);
    limit = limit > 100 ? 100 : limit; // показать не больше 100
    const page = +get(req, 'body.page', 1);

    // параметры поиска
    const name = get(req, 'body.name', '');
    const country = get(req, 'body.country', '');
    const city = get(req, 'body.city', '');

    // формирование запроса
    const query = {};

    if (name) {
      query.name = { $regex: escapeRegExp(name), $options: 'i' };
    }

    if (country) {
      query.country = { $eq: country };
    }
    if (city) {
      query.city = { $regex: escapeRegExp(city), $options: 'i' };
    }

    const totalCountPromise = Experience.countDocuments(query); // Находим кол-во результатов
    const searchPromise = experienceSearchQuery({ query, page, limit }); // Находим результат

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

    res.status(200).json(message.success('ExperienceSearch ok', result));
  } catch (error) {
    res.status(400).json(message.fail('ExperienceSearch error', analyticsId));
  }
};

export default experienceSearch;

function experienceSearchQuery({ query, page, limit }) {
  return Experience.find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(limit * (page - 1))
    .populate({
      path: 'activities',
      select: 'name description',
    })
    .populate({
      path: 'restaurants',
      select: 'name description',
    })
    .populate({
      path: 'attractions',
      //options: { sort: { date: -1 } },
      //populate: { path: 'understood', select: 'name' },
    })
    .exec()
    .then((docs) => {
      return message.success('Experience found', docs);
    });
}
