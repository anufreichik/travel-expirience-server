import Order from '../Model';
import message from '../../utils/messages';

const orderDeleteByIdQuery = (orderId) => {
  return Order.findOneAndDelete({ _id: orderId })
    .exec()
    .then((doc) => {
      if (doc) {
        return message.success('Order deleted', doc);
      } else {
        return message.fail('Order not found');
      }
    })
    .catch((error) => {
      return message.fail('Order delete error', error);
    });
};

export default orderDeleteByIdQuery;
