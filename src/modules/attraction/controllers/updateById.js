import Attraction from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

export default async function attractionUpdateById(req, res) {
  const attractionId = get(req, 'params.attractionId');
  const userId = get(req, 'userData.userId');

  Attraction.updateOne({ _id: attractionId }, { $set: req.body }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Attraction updated'));
      } else {
        res.status(400).json(message.fail('Attraction not found'));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('ATTRACTION_UPDATE_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Attraction',
        entityId: attractionId,
        user: userId,
        controller: 'attractionUpdateById',
      });

      res.status(400).json(message.fail('Attraction update error', analyticsId));
    });
}
