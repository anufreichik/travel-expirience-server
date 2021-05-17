import mongoose from 'mongoose';
import Experience from '../Model';
import message from '../../utils/messages';

export default function createExperienceQuery(values) {
  const _id = values._id || new mongoose.Types.ObjectId();

  const experience = new Experience({
    _id,
    ...values,
  });

  return experience
    .save()
    .then(() => {
      return message.success('Experience created', _id);
    })
    .catch((err) => {
      return message.fail('Experience create error', err);
    });
}
