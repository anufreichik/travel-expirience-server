import Vendor from '../Model';
import message from '../../utils/messages';

const vendorGetByIdQuery = (vendorId) => {
  return Vendor.findById(vendorId)
    .exec()
    .then((doc) => {
      if (doc) {
        return message.success('Vendor get by id OK', doc);
      } else {
        return message.fail('No Vendor for provided id');
      }
    })
    .catch((err) => {
      return message.fail('Get Vendor by id ERROR', err);
    });
};

export default vendorGetByIdQuery;
