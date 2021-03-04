import Vendor from '../Model';
import message from '../../utils/messages';

const vendorUpdateByIdQuery = ({ vendorId, values }) => {
  return Vendor.updateOne({ _id: vendorId }, { $set: values }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        return message.success('Vendor updated');
      } else {
        return message.fail('Vendor not found');
      }
    })
    .catch((error) => {
      return message.fail('Vendor update error', error);
    });
};

export default vendorUpdateByIdQuery;
