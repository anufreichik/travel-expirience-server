import Accommodation from '../Model';
import message from '../../utils/messages';

const accommodationUpdateByIdQuery = ({ accommodationId, values }) => {
  return Accommodation.updateOne({ _id: accommodationId }, { $set: values }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        return message.success('Accommodation updated');
      } else {
        return message.fail('Accommodation not found');
      }
    })
    .catch((error) => {
      return message.fail('Accommodation update error', error);
    });
};

export default accommodationUpdateByIdQuery;
