import Accommodation from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const accommodationDeleteById = (req, res) => {
  // читаем id из параметров URL запроса
  const _id = get(req, 'params.accommodationId');

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  Accommodation.deleteOne({ _id })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Accommodation deleted'));
      } else {
        res.status(400).json(message.fail('Accommodation not found'));
      }
    })
    .catch((error) => {
      // Формируем, записываем данные события для аналитики
      const analyticsId = analytics('ACCOMMODATION_DELETE_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Accommodation',
        entityId: _id,
        user: userId,
        controller: 'accommodationCreate',
      });

      res.status(400).json(message.fail('Accommodation delete error', analyticsId));
    });
};

export default accommodationDeleteById;
