import Experience from '../Model';
import message from '../../utils/messages';

const experienceGetAll = (req, res) => {

  // Найти все
  Experience.find()
    .sort({ createdAt: -1 })
    // .select('name') // если нужно получить отдельные поля
    .exec()
    .then((docs) => {
      res.status(200).json(message.success('Get all experiences ok', docs));
    })
    .catch((error) => {
      res.status(400).json(message.fail('Experience get all error', analyticsId));
    });
};

export default experienceGetAll;
