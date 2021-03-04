import Service from '../Model';
import message from '../../utils/messages';

const serviceGetByIdQuery = (serviceId) => {
  return Service.findById(serviceId)
    .exec()
    .then((doc) => {
      if (doc) {
        return message.success('Service get by id OK', doc);
      } else {
        return message.fail('No Service for provided id');
      }
    })
    .catch((err) => {
      return message.fail('Get Service by id ERROR', err);
    });
};

export default serviceGetByIdQuery;
