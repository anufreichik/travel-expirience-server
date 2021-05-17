import Restaurant from '../Model';
import message from '../../utils/messages';

const restaurantGetByIdQuery = (restaurantId) => {
  return Restaurant.findById(restaurantId)
    .exec()
    .then((doc) => {
      if (doc) {
        return message.success('Restaurant get by id OK', doc);
      } else {
        return message.fail('No Restaurant for provided id');
      }
    })
    .catch((err) => {
      return message.fail('Get Restaurant by id ERROR', err);
    });
};

export default restaurantGetByIdQuery;
