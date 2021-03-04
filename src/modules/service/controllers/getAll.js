import Service from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

// Такие контроллеры нельзя давать всем.
// Использовать только на начальных этапах
// так как ответ может быть слишком большим

const serviceGetAll = (req, res) => {
  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  // Найти все
  Service.find()
    .sort({ createdAt: -1 })
    // .select('name') // если нужно получить отдельные поля
    .exec()
    .then((docs) => {
      res.status(200).json(message.success('Get all services ok', docs));
    })
    .catch((error) => {
      const analyticsId = analytics('SERVICE_GET_ALL_ERROR', {
        error,
        body: req.body,
        entity: 'Service',
        user: userId,
        controller: 'serviceGetAll',
      });

      res.status(400).json(message.fail('Service get all error', analyticsId));
    });
};

export default serviceGetAll;
