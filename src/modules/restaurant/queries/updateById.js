import Restaurant from '../Model';
import message from '../../utils/messages';

const restaurantUpdateByIdQuery = ({ restaurantId, values }) => {
  return Restaurant.updateOne({ _id: restaurantId }, { $set: values }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        return message.success('Restaurant updated');
      } else {
        return message.fail('Restaurant not found');
      }
    })
    .catch((error) => {
      return message.fail('Restaurant update error', error);
    });
};

export default restaurantUpdateByIdQuery;
