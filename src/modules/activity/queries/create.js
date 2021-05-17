import mongoose from 'mongoose';
import Activity from '../Model';
import message from '../../utils/messages';

export default function createActivityQuery(values) {
  const _id = values._id || new mongoose.Types.ObjectId();

  const activity = new Activity({
    _id,
    ...values,
  });

  return activity
    .save()
    .then(() => {
      return message.success('Activity created', _id);
    })
    .catch((err) => {
      return message.fail('Activity create error', err);
    });
}
