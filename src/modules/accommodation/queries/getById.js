import Accommodation from '../Model';
import message from '../../utils/messages';

const accommodationGetByIdQuery = (accommodationId) => {
  return Accommodation.findById(accommodationId)
    .exec()
    .then((doc) => {
      if (doc) {
        return message.success('Accommodation get by id OK', doc);
      } else {
        return message.fail('No Accommodation for provided id');
      }
    })
    .catch((err) => {
      return message.fail('Get Accommodation by id ERROR', err);
    });
};

export default accommodationGetByIdQuery;
