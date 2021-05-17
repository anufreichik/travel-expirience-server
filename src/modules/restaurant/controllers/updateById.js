import Restaurant from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

export default async function restaurantUpdateById(req, res) {
  const restaurantId = get(req, 'params.restaurantId');
  const userId = get(req, 'userData.userId');

  Restaurant.updateOne({ _id: restaurantId }, { $set: req.body }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Restaurant updated'));
      } else {
        res.status(400).json(message.fail('Restaurant not found'));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('RESTAURANT_UPDATE_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Restaurant',
        entityId: restaurantId,
        user: userId,
        controller: 'restaurantUpdateById',
      });

      res.status(400).json(message.fail('Restaurant update error', analyticsId));
    });
}
