import Attraction from '../Model';
import message from '../../utils/messages';

const attractionUpdateByIdQuery = ({ attractionId, values }) => {
  return Attraction.updateOne({ _id: attractionId }, { $set: values }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        return message.success('Attraction updated');
      } else {
        return message.fail('Attraction not found');
      }
    })
    .catch((error) => {
      return message.fail('Attraction update error', error);
    });
};

export default attractionUpdateByIdQuery;
