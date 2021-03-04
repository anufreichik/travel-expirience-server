import Order from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const orderGetById = (req, res) => {
  const orderId = get(req, 'params.orderId');
  const userId = get(req, 'userData.userId');

  Order.findById(orderId)
    // подтягивает данные из соседних коллекций, аналог SQL JOIN
    .populate({
      path: 'client',
      select: 'name',
    })
    // .populate({
    //   path: 'lectures',
    //   options: { sort: { date: -1 } },
    //   populate: { path: 'understood', select: 'name' },
    // })
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(message.success('Get Order by id ok', doc));
      } else {
        res.status(404).json(message.fail('No order for provided id'));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('ORDER_GET_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Order',
        user: userId,
        controller: 'orderGetById',
      });

      res.status(400).json(message.fail('Order get error', analyticsId));
    });
};

export default orderGetById;
