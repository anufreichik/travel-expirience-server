import Service from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

export default async function serviceUpdateById(req, res) {
  const serviceId = get(req, 'params.serviceId');
  const userId = get(req, 'userData.userId');

  Service.updateOne({ _id: serviceId }, { $set: req.body }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Service updated'));
      } else {
        res.status(400).json(message.fail('Service not found'));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('SERVICE_UPDATE_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Service',
        entityId: serviceId,
        user: userId,
        controller: 'serviceUpdateById',
      });

      res.status(400).json(message.fail('Service update error', analyticsId));
    });
}
