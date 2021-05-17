import Activity from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const activityGetById = (req, res) => {
  const activityId = get(req, 'params.activityId');
  const userId = get(req, 'userData.userId');

  Activity.findById(activityId)
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
        res.status(200).json(message.success('Get Activity by id ok', doc));
      } else {
        res.status(404).json(message.fail('No activity for provided id'));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('ACTIVITY_GET_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Activity',
        user: userId,
        controller: 'activityGetById',
      });

      res.status(400).json(message.fail('Activity get error', analyticsId));
    });
};

export default activityGetById;
