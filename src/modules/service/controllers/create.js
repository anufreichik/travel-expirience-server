import mongoose from 'mongoose';
//import Service from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';
import createServiceQuery from '../queries/create';

export default async function serviceCreate(req, res) {
  // Создаем id материала который будет создан
  const _id = new mongoose.Types.ObjectId();

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  // Читаем данные из запроса
  const name = get(req, 'body.name');
  const description = get(req, 'body.description');
  const clientPrice = get(req, 'body.clientPrice');
  const vendorPrice = get(req, 'body.vendorPrice');
  const vendorId = get(req, 'body.vendor');

  const createServiceQueryResult = await createServiceQuery({
    _id,
    name,
    description,
    clientPrice,
    vendorPrice,
    vendor: vendorId,
    owner: userId,
  });

  if (createServiceQueryResult.success) {
    res.status(200).json(createServiceQueryResult);
  } else {
    const analyticsId = analytics('SERVICE_CREATE_ERROR', {
      error: createServiceQueryResult.payload,
      body: req.body,
      entity: 'Service',
      entityId: _id,
      user: userId,
      controller: 'serviceCreate',
    });

    res.status(400).json(message.fail('Service create error', analyticsId));
  }
}
