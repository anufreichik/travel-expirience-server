import mongoose from 'mongoose';
//import Restaurant from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';
import createRestaurantQuery from '../queries/create';

export default async function restaurantCreate(req, res) {
  // Создаем id материала который будет создан
  const _id = new mongoose.Types.ObjectId();

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  // Читаем данные из запроса
  const name = get(req, 'body.name');
  const description = get(req, 'body.description');

  const createRestaurantQueryResult = await createRestaurantQuery({
    _id,
    name,
    description,
    owner: userId,
  });

  if (createRestaurantQueryResult.success) {
    res.status(200).json(createRestaurantQueryResult);
  } else {
    const analyticsId = analytics('RESTAURANT_CREATE_ERROR', {
      error: createRestaurantQueryResult.payload,
      body: req.body,
      entity: 'Restaurant',
      entityId: _id,
      user: userId,
      controller: 'restaurantCreate',
    });

    res.status(400).json(message.fail('Restaurant create error', analyticsId));
  }
}
