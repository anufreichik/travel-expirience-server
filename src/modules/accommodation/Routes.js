import { Router } from 'express';
import serviceHeader from '../utils/serviceHeader';
import userCheckPerm from '../permission/userCheckPerm';

import accommodationCreate from './controllers/create';
import userCheckAuth from '../user/middlewares/userCheckAuth';
import accommodationGetById from './controllers/getById';
import accommodationSearch from './controllers/search';
import accommodationUpdateById from './controllers/updateById';
import accommodationDeleteById from './controllers/deleteById';
import accommodationStats from './controllers/stats';
import pauseController from '../core/pauseController';

const router = Router();

// CRUD

router.get(
  '/stats', // GET /localhost:5000/accommodation/stats
  serviceHeader('accommodationStats'), // mark request
  userCheckAuth, // midlware  needed to check if user has rights to do the request
  userCheckPerm('accommodation.search.own'), // midlware has rights to do this operation such as accommodation.search.own
  pauseController,
  accommodationStats,
);

router.post(
  '/', // POST /localhost:5000/accommodation/stats
  serviceHeader('accommodationCreate'),
  userCheckAuth,
  userCheckPerm('accommodation.create.own'),
  // pauseController,
  accommodationCreate,
);

router.get(
  '/:accommodationId',
  serviceHeader('accommodationGetById'),
  userCheckAuth,
  userCheckPerm('accommodation.get.own'),
  pauseController,
  accommodationGetById,
);

router.post(
  '/search',
  serviceHeader('accommodationSearch'),
  userCheckAuth,
  userCheckPerm('accommodation.search.own'),
  pauseController,
  accommodationSearch,
);

router.patch(
  '/:accommodationId',
  serviceHeader('accommodationUpdateById'),
  userCheckAuth,
  userCheckPerm('accommodation.update.own'),
  pauseController,
  accommodationUpdateById,
);

router.delete(
  '/:accommodationId',
  serviceHeader('accommodationDeleteById'),
  userCheckAuth,
  userCheckPerm('accommodation.delete.own'),
  pauseController,
  accommodationDeleteById,
);

export default router;
