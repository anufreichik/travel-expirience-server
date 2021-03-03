import mongoose from 'mongoose';
//import Client from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';
import createClientQuery from '../queries/create';

export default async function clientCreate(req, res) {
  // Создаем id материала который будет создан
  const _id = new mongoose.Types.ObjectId();

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  // Читаем данные из запроса
  const name = get(req, 'body.name');
  const phone = get(req, 'body.phone');
  const email = get(req, 'body.email');
  const notes = get(req, 'body.notes');

  const createClientQueryResult = await createClientQuery({
    _id,
    name,
    phone,
    email,
    notes,
    owner: userId,
  });

  if (createClientQueryResult.success) {
    res.status(200).json(createClientQueryResult);
  } else {
    const analyticsId = analytics('CLIENT_CREATE_ERROR', {
      error: createClientQueryResult.payload,
      body: req.body,
      entity: 'Client',
      entityId: _id,
      user: userId,
      controller: 'clientCreate',
    });

    res.status(400).json(message.fail('Client create error', analyticsId));
  }
}
