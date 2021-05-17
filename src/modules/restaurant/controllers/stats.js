import Restaurant from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const restaurantStats = async (req, res) => {
  const userId = get(req, 'userData.userId');
  try {
    const totalCount = await Restaurant.countDocuments();

    const result = {
      totalCount,
      totalCountDouble: totalCount * 2,
      totalCountTriple: totalCount * 3,
      totalCountTen: totalCount * 10,
    };

    res.status(200).json(message.success('Restaurant Stats ok', result));
  } catch (error) {
    const analyticsId = analytics('RESTAURANT_STATS_ERROR', {
      error,
      body: req.body,
      entity: 'Restaurant',
      user: userId,
      controller: 'restaurantStats',
    });

    res.status(400).json(message.fail('Restaurant Stats error', analyticsId));
  }
};

export default restaurantStats;
