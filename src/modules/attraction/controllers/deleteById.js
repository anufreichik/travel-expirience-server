import Attraction from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const attractionDeleteById = (req, res) => {
  // читаем id из параметров URL запроса
  const _id = get(req, 'params.attractionId');

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  Attraction.deleteOne({ _id })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Attraction deleted'));
      } else {
        res.status(400).json(message.fail('Attraction not found'));
      }
    })
    .catch((error) => {
      // Формируем, записываем данные события для аналитики
      const analyticsId = analytics('ATTRACTION_DELETE_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Attraction',
        entityId: _id,
        user: userId,
        controller: 'attractionCreate',
      });

      res.status(400).json(message.fail('Attraction delete error', analyticsId));
    });
};

export default attractionDeleteById;
