import { Router } from 'express';
import serviceHeader from '../utils/serviceHeader';
import userCheckPerm from '../permission/userCheckPerm';

import restaurantCreate from './controllers/create';
import userCheckAuth from '../user/middlewares/userCheckAuth';
import restaurantGetById from './controllers/getById';
import restaurantSearch from './controllers/search';
import restaurantUpdateById from './controllers/updateById';
import restaurantDeleteById from './controllers/deleteById';
import restaurantStats from './controllers/stats';
import pauseController from '../core/pauseController';

const router = Router();

// CRUD

router.get(
  '/stats', // GET /localhost:5000/restaurant/stats
  serviceHeader('restaurantStats'), // mark request
  userCheckAuth, // midlware  needed to check if user has rights to do the request
  userCheckPerm('restaurant.search.own'), // midlware has rights to do this operation such as restaurant.search.own
  pauseController,
  restaurantStats,
);

router.post(
  '/', // POST /localhost:5000/restaurant/stats
  serviceHeader('restaurantCreate'),
  userCheckAuth,
  userCheckPerm('restaurant.create.own'),
  // pauseController,
  restaurantCreate,
);

router.get(
  '/:restaurantId',
  serviceHeader('restaurantGetById'),
  userCheckAuth,
  userCheckPerm('restaurant.get.own'),
  pauseController,
  restaurantGetById,
);

router.post(
  '/search',
  serviceHeader('restaurantSearch'),
  userCheckAuth,
  userCheckPerm('restaurant.search.own'),
  pauseController,
  restaurantSearch,
);

router.patch(
  '/:restaurantId',
  serviceHeader('restaurantUpdateById'),
  userCheckAuth,
  userCheckPerm('restaurant.update.own'),
  pauseController,
  restaurantUpdateById,
);

router.delete(
  '/:restaurantId',
  serviceHeader('restaurantDeleteById'),
  userCheckAuth,
  userCheckPerm('restaurant.delete.own'),
  pauseController,
  restaurantDeleteById,
);

export default router;
