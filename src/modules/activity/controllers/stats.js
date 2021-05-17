import Activity from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const activityStats = async (req, res) => {
  const userId = get(req, 'userData.userId');
  try {
    const totalCount = await Activity.countDocuments();

    const result = {
      totalCount,
      totalCountDouble: totalCount * 2,
      totalCountTriple: totalCount * 3,
      totalCountTen: totalCount * 10,
    };

    res.status(200).json(message.success('Activity Stats ok', result));
  } catch (error) {
    const analyticsId = analytics('ACTIVITY_STATS_ERROR', {
      error,
      body: req.body,
      entity: 'Activity',
      user: userId,
      controller: 'activityStats',
    });

    res.status(400).json(message.fail('Activity Stats error', analyticsId));
  }
};

export default activityStats;
