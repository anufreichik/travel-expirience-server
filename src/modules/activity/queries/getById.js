import Activity from '../Model';
import message from '../../utils/messages';

const activityGetByIdQuery = (activityId) => {
  return Activity.findById(activityId)
    .exec()
    .then((doc) => {
      if (doc) {
        return message.success('Activity get by id OK', doc);
      } else {
        return message.fail('No Activity for provided id');
      }
    })
    .catch((err) => {
      return message.fail('Get Activity by id ERROR', err);
    });
};

export default activityGetByIdQuery;
