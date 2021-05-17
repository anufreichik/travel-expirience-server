import Attraction from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const attractionStats = async (req, res) => {
  const userId = get(req, 'userData.userId');
  try {
    const totalCount = await Attraction.countDocuments();

    const result = {
      totalCount,
      totalCountDouble: totalCount * 2,
      totalCountTriple: totalCount * 3,
      totalCountTen: totalCount * 10,
    };

    res.status(200).json(message.success('Attraction Stats ok', result));
  } catch (error) {
    const analyticsId = analytics('ATTRACTION_STATS_ERROR', {
      error,
      body: req.body,
      entity: 'Attraction',
      user: userId,
      controller: 'attractionStats',
    });

    res.status(400).json(message.fail('Attraction Stats error', analyticsId));
  }
};

export default attractionStats;
