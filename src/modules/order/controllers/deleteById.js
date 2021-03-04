import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';
import clientRemoveOrderIdQuery from '../../client/queries/removeOrderId';
import orderDeleteByIdQuery from '../queries/deleteById';

const orderDeleteById = async (req, res) => {
  // читаем id из параметров URL запроса
  const _id = get(req, 'params.orderId');

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  const deleteOrderByIdResult = await orderDeleteByIdQuery(_id);

  const clientId = get(deleteOrderByIdResult, 'payload.client');

  // Update Client
  const removeOrderIdFromClientResult = await clientRemoveOrderIdQuery({
    clientId,
    orderId: _id,
  });

  if (removeOrderIdFromClientResult.success && deleteOrderByIdResult.success) {
    res.status(200).json(deleteOrderByIdResult);
  } else {
    const analyticsId = analytics('ORDER_DELETE_ERROR', {
      error: removeOrderIdFromClientResult.payload,
      error2: deleteOrderByIdResult.payload,
      body: req.body,
      entity: 'Order',
      entityId: _id,
      user: userId,
      controller: 'orderDelete',
    });

    res.status(400).json(message.fail('Order delete error', analyticsId));
  }
};

export default orderDeleteById;
