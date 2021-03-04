import Vendor from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const vendorStats = async (req, res) => {
  const userId = get(req, 'userData.userId');
  try {
    const totalCount = await Vendor.countDocuments();

    const result = {
      totalCount,
      totalCountDouble: totalCount * 2,
      totalCountTriple: totalCount * 3,
      totalCountTen: totalCount * 10,
    };

    res.status(200).json(message.success('Vendor Stats ok', result));
  } catch (error) {
    const analyticsId = analytics('VENDOR_STATS_ERROR', {
      error,
      body: req.body,
      entity: 'Vendor',
      user: userId,
      controller: 'vendorStats',
    });

    res.status(400).json(message.fail('Vendor Stats error', analyticsId));
  }
};

export default vendorStats;
