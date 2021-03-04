import Service from '../Model';
import message from '../../utils/messages';

const serviceUpdateByIdQuery = ({ serviceId, values }) => {
  return Service.updateOne({ _id: serviceId }, { $set: values }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        return message.success('Service updated');
      } else {
        return message.fail('Service not found');
      }
    })
    .catch((error) => {
      return message.fail('Service update error', error);
    });
};

export default serviceUpdateByIdQuery;
