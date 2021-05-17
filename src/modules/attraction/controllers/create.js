import mongoose from 'mongoose';
//import Attraction from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';
import createAttractionQuery from '../queries/create';

export default async function attractionCreate(req, res) {
  // Создаем id материала который будет создан
  const _id = new mongoose.Types.ObjectId();

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  // Читаем данные из запроса
  const name = get(req, 'body.name');
  const description = get(req, 'body.description');

  const createAttractionQueryResult = await createAttractionQuery({
    _id,
    name,
    description,
    owner: userId,
  });

  if (createAttractionQueryResult.success) {
    res.status(200).json(createAttractionQueryResult);
  } else {
    const analyticsId = analytics('ATTRACTION_CREATE_ERROR', {
      error: createAttractionQueryResult.payload,
      body: req.body,
      entity: 'Attraction',
      entityId: _id,
      user: userId,
      controller: 'attractionCreate',
    });

    res.status(400).json(message.fail('Attraction create error', analyticsId));
  }
}
