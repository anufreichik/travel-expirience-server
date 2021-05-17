import Activity from '../Model';
import message from '../../utils/messages';

const activityUpdateByIdQuery = ({ activityId, values }) => {
  return Activity.updateOne({ _id: activityId }, { $set: values }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        return message.success('Activity updated');
      } else {
        return message.fail('Activity not found');
      }
    })
    .catch((error) => {
      return message.fail('Activity update error', error);
    });
};

export default activityUpdateByIdQuery;
