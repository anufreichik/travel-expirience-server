import mongoose from 'mongoose';
//import Activity from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';
import createActivityQuery from '../queries/create';

export default async function activityCreate(req, res) {
  // Создаем id материала который будет создан
  const _id = new mongoose.Types.ObjectId();

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  // Читаем данные из запроса
  const name = get(req, 'body.name');
  const description = get(req, 'body.description');

  const createActivityQueryResult = await createActivityQuery({
    _id,
    name,
    description,
    owner: userId,
  });

  if (createActivityQueryResult.success) {
    res.status(200).json(createActivityQueryResult);
  } else {
    const analyticsId = analytics('ACTIVITY_CREATE_ERROR', {
      error: createActivityQueryResult.payload,
      body: req.body,
      entity: 'Activity',
      entityId: _id,
      user: userId,
      controller: 'activityCreate',
    });

    res.status(400).json(message.fail('Activity create error', analyticsId));
  }
}
