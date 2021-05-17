import mongoose from 'mongoose';
//import Experience from '../Model';
import message from '../../utils/messages';
import { get } from 'lodash';
import createExperienceQuery from '../queries/create';
import createActivityQuery from '../../activity/queries/create';
import createAccommodationQuery from '../../accommodation/queries/create';
import createRestaurantQuery from '../../restaurant/queries/create';
import createAttractionQuery from '../../attraction/queries/create';

export default async function experienceCreate(req, res) {
  // Создаем id материала который будет создан
  const _id = new mongoose.Types.ObjectId();

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  // Читаем данные из запроса
  const name = get(req, 'body.name');
  const description = get(req, 'body.description');
  const country = get(req, 'body.country');
  const state = get(req, 'body.state');
  const city = get(req, 'body.city');
  const activities = get(req, 'body.activities', []);
  const attractions = get(req, 'body.attractions', []);
  const accommodations = get(req, 'body.accommodations', []);
  const restaurants = get(req, 'body.restaurants', []);

  const activitiesIds = [];
  const accommodationsIds = [];
  const attractionsIds = [];
  const restaurantsIds = [];

  const activitiesRes = await Promise.all(
    activities.map(async (el) => {
      const id = new mongoose.Types.ObjectId();
      activitiesIds.push(id);
      let ret = await createActivityQuery({
        _id: id,
        name: el.name,
        description: el.description,
        owner: userId,
      });
      console.log(ret);
    }),
  );

  console.log('activities done');
  const accommodationsRes = await Promise.all(
    accommodations.map(async (el) => {
      const id = new mongoose.Types.ObjectId();
      accommodationsIds.push(id);
      let ret = await createAccommodationQuery({
        _id: id,
        name: el.name,
        description: el.description,
        owner: userId,
      });
      console.log(ret);
    }),
  );

  console.log('accommodations done');


  const restaurantsRes = await Promise.all(
    restaurants.map(async (el) => {
      const id = new mongoose.Types.ObjectId();
      restaurantsIds.push(id);
      let ret = await createRestaurantQuery({
        _id: id,
        name: el.name,
        description: el.description,
        owner: userId,
      });
      console.log(ret);
    }),
  );

  const attractionsRes = await Promise.all(
    attractions.map(async (el) => {
      const id = new mongoose.Types.ObjectId();
      attractionsIds.push(id);
      let ret = await createAttractionQuery({
        _id: id,
        name: el.name,
        description: el.description,
        owner: userId,
      });
      console.log(ret);
    }),
  );


  const createExperienceQueryResult = await createExperienceQuery({
    _id,
    name,
    description,
    activities: activitiesIds,
    accommodations: accommodationsIds,
    attractions: attractionsIds,
    restaurants: restaurantsIds,
    country,
    state,
    city,
    owner: userId,
  });

  if (createExperienceQueryResult.success) {
    res.status(200).json(createExperienceQueryResult);
  } else {
    res.status(400).json(message.fail('Experience create error', analyticsId));
  }
}
