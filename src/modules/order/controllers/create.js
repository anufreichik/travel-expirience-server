import mongoose from 'mongoose';
//import Order from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';
import createOrderQuery from '../queries/create';
import clientAddOrderIdQuery from '../../client/queries/addOrderId';

export default async function orderCreate(req, res) {
  // Создаем id материала который будет создан
  const _id = new mongoose.Types.ObjectId();

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  // Читаем данные из запроса
  const name = get(req, 'body.name');
  const clientPrice = get(req, 'body.clientPrice');
  const clientPaid = get(req, 'body.clientPaid');
  const vendorPrice = get(req, 'body.vendorPrice');
  const vendorPaid = get(req, 'body.vendorPaid');
  const notes = get(req, 'body.notes');

  const clientId = get(req, 'body.client');

  const createOrderQueryResult = await createOrderQuery({
    _id,
    name,
    clientPrice,
    clientPaid,
    clientDebt: clientPrice - clientPaid,
    vendorPrice,
    vendorPaid,
    vendorDebt: vendorPrice - vendorPaid,
    notes,
    client: clientId,
    owner: userId,
  });

  // Update Client
  const addOrderIdToClientResult = await clientAddOrderIdQuery({
    clientId,
    orderId: _id,
  });

  if (createOrderQueryResult.success && addOrderIdToClientResult.success) {
    res.status(200).json(createOrderQueryResult);
  } else {
    const analyticsId = analytics('ORDER_CREATE_ERROR', {
      error: createOrderQueryResult.payload,
      body: req.body,
      entity: 'Order',
      entityId: _id,
      user: userId,
      controller: 'orderCreate',
    });

    res.status(400).json(message.fail('Order create error', analyticsId));
  }
}
