import Activity from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

export default async function activityUpdateById(req, res) {
  const activityId = get(req, 'params.activityId');
  const userId = get(req, 'userData.userId');

  Activity.updateOne({ _id: activityId }, { $set: req.body }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Activity updated'));
      } else {
        res.status(400).json(message.fail('Activity not found'));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('ACTIVITY_UPDATE_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Activity',
        entityId: activityId,
        user: userId,
        controller: 'activityUpdateById',
      });

      res.status(400).json(message.fail('Activity update error', analyticsId));
    });
}
