import Client from '../Model';
import message from '../../utils/messages';

const clientAddOrderIdQuery = ({ clientId, orderId }) => {
  return Client.updateOne(
    { _id: clientId },
    { $addToSet: { order: orderId } },
    { runValidators: true },
  )
    .exec()
    .then((doc) => {
      if (doc.n) {
        return message.success('Client updated');
      } else {
        return message.fail('Client not found');
      }
    })
    .catch((error) => {
      return message.fail('Client update error', error);
    });
};

export default clientAddOrderIdQuery;
