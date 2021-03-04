import Order from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const orderStats = async (req, res) => {
  const userId = get(req, 'userData.userId');
  try {
    const totalCount = await Order.countDocuments();

    const result = {
      totalCount,
      totalCountDouble: totalCount * 2,
      totalCountTriple: totalCount * 3,
      totalCountTen: totalCount * 10,
    };

    res.status(200).json(message.success('Order Stats ok', result));
  } catch (error) {
    const analyticsId = analytics('ORDER_STATS_ERROR', {
      error,
      body: req.body,
      entity: 'Order',
      user: userId,
      controller: 'orderStats',
    });

    res.status(400).json(message.fail('Order Stats error', analyticsId));
  }
};

export default orderStats;
