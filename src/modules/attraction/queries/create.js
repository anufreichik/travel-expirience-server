import mongoose from 'mongoose';
import Attraction from '../Model';
import message from '../../utils/messages';

export default function createAttractionQuery(values) {
  const _id = values._id || new mongoose.Types.ObjectId();

  const attraction = new Attraction({
    _id,
    ...values,
  });

  return attraction
    .save()
    .then(() => {
      return message.success('Attraction created', _id);
    })
    .catch((err) => {
      return message.fail('Attraction create error', err);
    });
}
