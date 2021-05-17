import Accommodation from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

export default async function accommodationUpdateById(req, res) {
  const accommodationId = get(req, 'params.accommodationId');
  const userId = get(req, 'userData.userId');

  Accommodation.updateOne({ _id: accommodationId }, { $set: req.body }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Accommodation updated'));
      } else {
        res.status(400).json(message.fail('Accommodation not found'));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('ACCOMMODATION_UPDATE_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Accommodation',
        entityId: accommodationId,
        user: userId,
        controller: 'accommodationUpdateById',
      });

      res.status(400).json(message.fail('Accommodation update error', analyticsId));
    });
}
