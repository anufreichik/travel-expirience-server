import { Router } from 'express';
import serviceHeader from '../utils/serviceHeader';
import userCheckPerm from '../permission/userCheckPerm';

import attractionCreate from './controllers/create';
import userCheckAuth from '../user/middlewares/userCheckAuth';
import attractionGetById from './controllers/getById';
import attractionSearch from './controllers/search';
import attractionUpdateById from './controllers/updateById';
import attractionDeleteById from './controllers/deleteById';
import attractionStats from './controllers/stats';
import pauseController from '../core/pauseController';

const router = Router();

// CRUD

router.get(
  '/stats', // GET /localhost:5000/attraction/stats
  serviceHeader('attractionStats'), // mark request
  userCheckAuth, // midlware  needed to check if user has rights to do the request
  userCheckPerm('attraction.search.own'), // midlware has rights to do this operation such as attraction.search.own
  pauseController,
  attractionStats,
);

router.post(
  '/', // POST /localhost:5000/attraction/stats
  serviceHeader('attractionCreate'),
  userCheckAuth,
  userCheckPerm('attraction.create.own'),
  // pauseController,
  attractionCreate,
);

router.get(
  '/:attractionId',
  serviceHeader('attractionGetById'),
  userCheckAuth,
  userCheckPerm('attraction.get.own'),
  pauseController,
  attractionGetById,
);

router.post(
  '/search',
  serviceHeader('attractionSearch'),
  userCheckAuth,
  userCheckPerm('attraction.search.own'),
  pauseController,
  attractionSearch,
);

router.patch(
  '/:attractionId',
  serviceHeader('attractionUpdateById'),
  userCheckAuth,
  userCheckPerm('attraction.update.own'),
  pauseController,
  attractionUpdateById,
);

router.delete(
  '/:attractionId',
  serviceHeader('attractionDeleteById'),
  userCheckAuth,
  userCheckPerm('attraction.delete.own'),
  pauseController,
  attractionDeleteById,
);

export default router;
