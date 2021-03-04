import Service from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const serviceDeleteById = (req, res) => {
  // читаем id из параметров URL запроса
  const _id = get(req, 'params.serviceId');

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  Service.deleteOne({ _id })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Service deleted'));
      } else {
        res.status(400).json(message.fail('Service not found'));
      }
    })
    .catch((error) => {
      // Формируем, записываем данные события для аналитики
      const analyticsId = analytics('SERVICE_DELETE_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Service',
        entityId: _id,
        user: userId,
        controller: 'serviceCreate',
      });

      res.status(400).json(message.fail('Service delete error', analyticsId));
    });
};

export default serviceDeleteById;
