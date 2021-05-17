import Experience from '../Model';
import message from '../../utils/messages';
import { get } from 'lodash';

const experienceDeleteById = (req, res) => {
  // читаем id из параметров URL запроса
  const _id = get(req, 'params.experienceId');



  Experience.deleteOne({ _id })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Experience deleted'));
      } else {
        res.status(400).json(message.fail('Experience not found'));
      }
    })
    .catch((error) => {
      res.status(400).json(message.fail('Experience delete error', analyticsId));
    });
};

export default experienceDeleteById;
