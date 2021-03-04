import mongoose from 'mongoose';
import Service from '../Model';
import message from '../../utils/messages';

export default function createServiceQuery(values) {
  const _id = values._id || new mongoose.Types.ObjectId();

  const service = new Service({
    _id,
    ...values,
  });

  return service
    .save()
    .then(() => {
      return message.success('Service created', _id);
    })
    .catch((err) => {
      return message.fail('Service create error', err);
    });
}
