import Experience from '../Model';
import message from '../../utils/messages';

const experienceUpdateByIdQuery = ({ experienceId, values }) => {
  return Experience.updateOne({ _id: experienceId }, { $set: values }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        return message.success('Experience updated');
      } else {
        return message.fail('Experience not found');
      }
    })
    .catch((error) => {
      return message.fail('Experience update error', error);
    });
};

export default experienceUpdateByIdQuery;
