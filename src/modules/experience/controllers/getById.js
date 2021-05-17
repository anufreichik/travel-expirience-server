import Experience from '../Model';
import message from '../../utils/messages';
import { get } from 'lodash';

const experienceGetById = (req, res) => {
  const experienceId = get(req, 'params.experienceId');

  Experience.findById(experienceId)
    // подтягивает данные из соседних коллекций, аналог SQL JOIN
    .populate({
      path: 'activities',
      select: 'name description',
    })
    .populate({
      path: 'restaurants',
      select: 'name description',
    })
    .populate({
      path: 'attractions',
      //options: { sort: { date: -1 } },
      //populate: { path: 'understood', select: 'name' },
    })
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(message.success('Get Experience by id ok', doc));
      } else {
        res.status(404).json(message.fail('No experience for provided id'));
      }
    })
    .catch((error) => {
      res.status(400).json(message.fail('Experience get error', error));
    });
};

export default experienceGetById;
