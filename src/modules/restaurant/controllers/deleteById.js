import Restaurant from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const restaurantDeleteById = (req, res) => {
  // читаем id из параметров URL запроса
  const _id = get(req, 'params.restaurantId');

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  Restaurant.deleteOne({ _id })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Restaurant deleted'));
      } else {
        res.status(400).json(message.fail('Restaurant not found'));
      }
    })
    .catch((error) => {
      // Формируем, записываем данные события для аналитики
      const analyticsId = analytics('RESTAURANT_DELETE_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Restaurant',
        entityId: _id,
        user: userId,
        controller: 'restaurantCreate',
      });

      res.status(400).json(message.fail('Restaurant delete error', analyticsId));
    });
};

export default restaurantDeleteById;
