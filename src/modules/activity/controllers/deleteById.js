import Activity from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const activityDeleteById = (req, res) => {
  // читаем id из параметров URL запроса
  const _id = get(req, 'params.activityId');

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  Activity.deleteOne({ _id })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Activity deleted'));
      } else {
        res.status(400).json(message.fail('Activity not found'));
      }
    })
    .catch((error) => {
      // Формируем, записываем данные события для аналитики
      const analyticsId = analytics('ACTIVITY_DELETE_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Activity',
        entityId: _id,
        user: userId,
        controller: 'activityCreate',
      });

      res.status(400).json(message.fail('Activity delete error', analyticsId));
    });
};

export default activityDeleteById;
