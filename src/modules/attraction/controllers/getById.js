import Attraction from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const attractionGetById = (req, res) => {
  const attractionId = get(req, 'params.attractionId');
  const userId = get(req, 'userData.userId');

  Attraction.findById(attractionId)
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
        res.status(200).json(message.success('Get Attraction by id ok', doc));
      } else {
        res.status(404).json(message.fail('No attraction for provided id'));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('ATTRACTION_GET_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Attraction',
        user: userId,
        controller: 'attractionGetById',
      });

      res.status(400).json(message.fail('Attraction get error', analyticsId));
    });
};

export default attractionGetById;
