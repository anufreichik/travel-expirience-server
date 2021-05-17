import mongoose from 'mongoose';
import Accommodation from '../Model';
import message from '../../utils/messages';

export default function createAccommodationQuery(values) {
  const _id = values._id || new mongoose.Types.ObjectId();

  const accommodation = new Accommodation({
    _id,
    ...values,
  });

  return accommodation
    .save()
    .then(() => {
      return message.success('Accommodation created', _id);
    })
    .catch((err) => {
      return message.fail('Accommodation create error', err);
    });
}
