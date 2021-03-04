import mongoose from 'mongoose';
import Order from '../Model';
import message from '../../utils/messages';

export default function createOrderQuery(values) {
  const _id = values._id || new mongoose.Types.ObjectId();

  const order = new Order({
    _id,
    ...values,
  });

  return order
    .save()
    .then(() => {
      return message.success('Order created', _id);
    })
    .catch((err) => {
      return message.fail('Order create error', err);
    });
}
