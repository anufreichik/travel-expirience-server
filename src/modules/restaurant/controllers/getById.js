import Restaurant from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const restaurantGetById = (req, res) => {
  const restaurantId = get(req, 'params.restaurantId');
  const userId = get(req, 'userData.userId');

  Restaurant.findById(restaurantId)
    // подтягивает данные из соседних коллекций, аналог SQL JOIN
    // .populate({
    //   path: 'members',
    //   select: 'name links',
    // })
    // .populate({
    //   path: 'lectures',
    //   options: { sort: { date: -1 } },
    //   populate: { path: 'understood', select: 'name' },
    // })
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(message.success('Get Restaurant by id ok', doc));
      } else {
        res.status(404).json(message.fail('No restaurant for provided id'));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('RESTAURANT_GET_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Restaurant',
        user: userId,
        controller: 'restaurantGetById',
      });

      res.status(400).json(message.fail('Restaurant get error', analyticsId));
    });
};

export default restaurantGetById;
