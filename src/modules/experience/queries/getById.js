import Experience from '../Model';
import message from '../../utils/messages';

const experienceGetByIdQuery = (experienceId) => {
  return Experience.findById(experienceId)
    .exec()
    .then((doc) => {
      if (doc) {
        return message.success('Experience get by id OK', doc);
      } else {
        return message.fail('No Experience for provided id');
      }
    })
    .catch((err) => {
      return message.fail('Get Experience by id ERROR', err);
    });
};

export default experienceGetByIdQuery;
