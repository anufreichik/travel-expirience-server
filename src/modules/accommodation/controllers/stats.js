import Accommodation from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const accommodationStats = async (req, res) => {
  const userId = get(req, 'userData.userId');
  try {
    const totalCount = await Accommodation.countDocuments();

    const result = {
      totalCount,
      totalCountDouble: totalCount * 2,
      totalCountTriple: totalCount * 3,
      totalCountTen: totalCount * 10,
    };

    res.status(200).json(message.success('Accommodation Stats ok', result));
  } catch (error) {
    const analyticsId = analytics('ACCOMMODATION_STATS_ERROR', {
      error,
      body: req.body,
      entity: 'Accommodation',
      user: userId,
      controller: 'accommodationStats',
    });

    res.status(400).json(message.fail('Accommodation Stats error', analyticsId));
  }
};

export default accommodationStats;
