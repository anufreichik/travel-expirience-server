import Service from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const serviceStats = async (req, res) => {
  const userId = get(req, 'userData.userId');
  try {
    const totalCount = await Service.countDocuments();

    const result = {
      totalCount,
      totalCountDouble: totalCount * 2,
      totalCountTriple: totalCount * 3,
      totalCountTen: totalCount * 10,
    };

    res.status(200).json(message.success('Service Stats ok', result));
  } catch (error) {
    const analyticsId = analytics('SERVICE_STATS_ERROR', {
      error,
      body: req.body,
      entity: 'Service',
      user: userId,
      controller: 'serviceStats',
    });

    res.status(400).json(message.fail('Service Stats error', analyticsId));
  }
};

export default serviceStats;
