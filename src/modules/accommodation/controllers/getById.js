import Accommodation from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const accommodationGetById = (req, res) => {
  const accommodationId = get(req, 'params.accommodationId');
  const userId = get(req, 'userData.userId');

  Accommodation.findById(accommodationId)
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
        res.status(200).json(message.success('Get Accommodation by id ok', doc));
      } else {
        res.status(404).json(message.fail('No accommodation for provided id'));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('ACCOMMODATION_GET_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Accommodation',
        user: userId,
        controller: 'accommodationGetById',
      });

      res.status(400).json(message.fail('Accommodation get error', analyticsId));
    });
};

export default accommodationGetById;
