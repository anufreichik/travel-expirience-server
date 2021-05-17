import Experience from '../Model';
import message from '../../utils/messages';
import { get } from 'lodash';

export default async function experienceUpdateById(req, res) {
  const experienceId = get(req, 'params.experienceId');

  Experience.updateOne({ _id: experienceId }, { $set: req.body }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Experience updated'));
      } else {
        res.status(400).json(message.fail('Experience not found'));
      }
    })
    .catch((error) => {
      res.status(400).json(message.fail('Experience update error', analyticsId));
    });
}
