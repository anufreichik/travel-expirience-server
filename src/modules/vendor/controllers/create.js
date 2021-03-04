import mongoose from 'mongoose';
//import Vendor from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';
import createVendorQuery from '../queries/create';

export default async function vendorCreate(req, res) {
  // Создаем id материала который будет создан
  const _id = new mongoose.Types.ObjectId();

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  // Читаем данные из запроса
  const name = get(req, 'body.name');
  const description = get(req, 'body.description');

  const createVendorQueryResult = await createVendorQuery({
    _id,
    name,
    description,
    owner: userId,
  });

  if (createVendorQueryResult.success) {
    res.status(200).json(createVendorQueryResult);
  } else {
    const analyticsId = analytics('VENDOR_CREATE_ERROR', {
      error: createVendorQueryResult.payload,
      body: req.body,
      entity: 'Vendor',
      entityId: _id,
      user: userId,
      controller: 'vendorCreate',
    });

    res.status(400).json(message.fail('Vendor create error', analyticsId));
  }
}
