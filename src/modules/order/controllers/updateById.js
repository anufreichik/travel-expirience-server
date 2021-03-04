import Order from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

export default async function orderUpdateById(req, res) {
  const orderId = get(req, 'params.orderId');
  const userId = get(req, 'userData.userId');

  const values = {
    ...req.body,
    clientDebt: req.body.clientPrice - req.body.clientPaid,
    vendorDebt: req.body.vendorPrice - req.body.vendorPaid,
  };

  Order.updateOne({ _id: orderId }, { $set: values }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Order updated'));
      } else {
        res.status(400).json(message.fail('Order not found'));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('ORDER_UPDATE_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Order',
        entityId: orderId,
        user: userId,
        controller: 'orderUpdateById',
      });

      res.status(400).json(message.fail('Order update error', analyticsId));
    });
}
