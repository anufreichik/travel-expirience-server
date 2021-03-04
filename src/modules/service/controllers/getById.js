import Service from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const serviceGetById = (req, res) => {
  const serviceId = get(req, 'params.serviceId');
  const userId = get(req, 'userData.userId');

  Service.findById(serviceId)
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
        res.status(200).json(message.success('Get Service by id ok', doc));
      } else {
        res.status(404).json(message.fail('No service for provided id'));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('SERVICE_GET_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Service',
        user: userId,
        controller: 'serviceGetById',
      });

      res.status(400).json(message.fail('Service get error', analyticsId));
    });
};

export default serviceGetById;
