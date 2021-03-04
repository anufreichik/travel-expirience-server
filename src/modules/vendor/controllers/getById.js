import Vendor from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const vendorGetById = (req, res) => {
  const vendorId = get(req, 'params.vendorId');
  const userId = get(req, 'userData.userId');

  Vendor.findById(vendorId)
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
        res.status(200).json(message.success('Get Vendor by id ok', doc));
      } else {
        res.status(404).json(message.fail('No vendor for provided id'));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('VENDOR_GET_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Vendor',
        user: userId,
        controller: 'vendorGetById',
      });

      res.status(400).json(message.fail('Vendor get error', analyticsId));
    });
};

export default vendorGetById;
