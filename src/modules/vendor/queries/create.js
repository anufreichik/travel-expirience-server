import mongoose from 'mongoose';
import Vendor from '../Model';
import message from '../../utils/messages';

export default function createVendorQuery(values) {
  const _id = values._id || new mongoose.Types.ObjectId();

  const vendor = new Vendor({
    _id,
    ...values,
  });

  return vendor
    .save()
    .then(() => {
      return message.success('Vendor created', _id);
    })
    .catch((err) => {
      return message.fail('Vendor create error', err);
    });
}
