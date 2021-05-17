import Experience from '../Model';
import message from '../../utils/messages';
const experienceStats = async (req, res) => {

  try {
    const totalCount = await Experience.countDocuments();

    const result = {
      totalCount
    };

    res.status(200).json(message.success('Experience Stats ok', result));
  } catch (error) {
    res.status(400).json(message.fail('Experience Stats error', analyticsId));
  }
};

export default experienceStats;
