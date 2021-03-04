import Order from '../Model';
import message from '../../utils/messages';

const orderUpdateByIdQuery = ({ orderId, values }) => {
  values.clientDebt = values.clientPrice - values.clientPaid;
  values.vendorDebt = values.vendorPrice - values.vendorPaid;

  return Order.updateOne({ _id: orderId }, { $set: values }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        return message.success('Order updated');
      } else {
        return message.fail('Order not found');
      }
    })
    .catch((error) => {
      return message.fail('Order update error', error);
    });
};

export default orderUpdateByIdQuery;
