import Attraction from '../Model';
import message from '../../utils/messages';

const attractionGetByIdQuery = (attractionId) => {
  return Attraction.findById(attractionId)
    .exec()
    .then((doc) => {
      if (doc) {
        return message.success('Attraction get by id OK', doc);
      } else {
        return message.fail('No Attraction for provided id');
      }
    })
    .catch((err) => {
      return message.fail('Get Attraction by id ERROR', err);
    });
};

export default attractionGetByIdQuery;
