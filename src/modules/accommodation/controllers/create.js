import mongoose from 'mongoose';
//import Accommodation from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';
import createAccommodationQuery from '../queries/create';

export default async function accommodationCreate(req, res) {
  // Создаем id материала который будет создан
  const _id = new mongoose.Types.ObjectId();

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  // Читаем данные из запроса
  const name = get(req, 'body.name');
  const description = get(req, 'body.description');

  const createAccommodationQueryResult = await createAccommodationQuery({
    _id,
    name,
    description,
    owner: userId,
  });

  if (createAccommodationQueryResult.success) {
    res.status(200).json(createAccommodationQueryResult);
  } else {
    const analyticsId = analytics('ACCOMMODATION_CREATE_ERROR', {
      error: createAccommodationQueryResult.payload,
      body: req.body,
      entity: 'Accommodation',
      entityId: _id,
      user: userId,
      controller: 'accommodationCreate',
    });

    res.status(400).json(message.fail('Accommodation create error', analyticsId));
  }
}
