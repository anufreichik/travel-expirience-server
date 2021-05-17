import mongoose from 'mongoose';
import Restaurant from '../Model';
import message from '../../utils/messages';

export default function createRestaurantQuery(values) {
  const _id = values._id || new mongoose.Types.ObjectId();

  const restaurant = new Restaurant({
    _id,
    ...values,
  });

  return restaurant
    .save()
    .then(() => {
      return message.success('Restaurant created', _id);
    })
    .catch((err) => {
      return message.fail('Restaurant create error', err);
    });
}
