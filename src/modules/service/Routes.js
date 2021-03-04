import { Router } from 'express';
import serviceHeader from '../utils/serviceHeader';
import userCheckPerm from '../permission/userCheckPerm';

import serviceCreate from './controllers/create';
import userCheckAuth from '../user/middlewares/userCheckAuth';
import serviceGetById from './controllers/getById';
import serviceSearch from './controllers/search';
import serviceUpdateById from './controllers/updateById';
import serviceDeleteById from './controllers/deleteById';
import serviceStats from './controllers/stats';
import pauseController from '../core/pauseController';

const router = Router();

// CRUD

router.get(
  '/stats', // GET /localhost:5000/service/stats
  serviceHeader('serviceStats'), // mark request
  userCheckAuth, // midlware  needed to check if user has rights to do the request
  userCheckPerm('service.search.own'), // midlware has rights to do this operation such as service.search.own
  pauseController,
  serviceStats,
);

router.post(
  '/', // POST /localhost:5000/service/stats
  serviceHeader('serviceCreate'),
  userCheckAuth,
  userCheckPerm('service.create.own'),
  // pauseController,
  serviceCreate,
);

router.get(
  '/:serviceId',
  serviceHeader('serviceGetById'),
  userCheckAuth,
  userCheckPerm('service.get.own'),
  pauseController,
  serviceGetById,
);

router.post(
  '/search',
  serviceHeader('serviceSearch'),
  userCheckAuth,
  userCheckPerm('service.search.own'),
  pauseController,
  serviceSearch,
);

router.patch(
  '/:serviceId',
  serviceHeader('serviceUpdateById'),
  userCheckAuth,
  userCheckPerm('service.update.own'),
  pauseController,
  serviceUpdateById,
);

router.delete(
  '/:serviceId',
  serviceHeader('serviceDeleteById'),
  userCheckAuth,
  userCheckPerm('service.delete.own'),
  pauseController,
  serviceDeleteById,
);

export default router;
