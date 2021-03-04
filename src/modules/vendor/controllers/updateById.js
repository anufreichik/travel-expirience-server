import Vendor from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

export default async function vendorUpdateById(req, res) {
  const vendorId = get(req, 'params.vendorId');
  const userId = get(req, 'userData.userId');

  Vendor.updateOne({ _id: vendorId }, { $set: req.body }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Vendor updated'));
      } else {
        res.status(400).json(message.fail('Vendor not found'));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('VENDOR_UPDATE_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Vendor',
        entityId: vendorId,
        user: userId,
        controller: 'vendorUpdateById',
      });

      res.status(400).json(message.fail('Vendor update error', analyticsId));
    });
}
