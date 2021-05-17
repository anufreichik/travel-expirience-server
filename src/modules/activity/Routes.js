import { Router } from 'express';
import serviceHeader from '../utils/serviceHeader';
import userCheckPerm from '../permission/userCheckPerm';

import activityCreate from './controllers/create';
import userCheckAuth from '../user/middlewares/userCheckAuth';
import activityGetById from './controllers/getById';
import activitySearch from './controllers/search';
import activityUpdateById from './controllers/updateById';
import activityDeleteById from './controllers/deleteById';
import activityStats from './controllers/stats';
import pauseController from '../core/pauseController';

const router = Router();

// CRUD

router.get(
  '/stats', // GET /localhost:5000/activity/stats
  serviceHeader('activityStats'), // mark request
  userCheckAuth, // midlware  needed to check if user has rights to do the request
  userCheckPerm('activity.search.own'), // midlware has rights to do this operation such as activity.search.own
  pauseController,
  activityStats,
);

router.post(
  '/', // POST /localhost:5000/activity/stats
  serviceHeader('activityCreate'),
  userCheckAuth,
  userCheckPerm('activity.create.own'),
  // pauseController,
  activityCreate,
);

router.get(
  '/:activityId',
  serviceHeader('activityGetById'),
  userCheckAuth,
  userCheckPerm('activity.get.own'),
  pauseController,
  activityGetById,
);

router.post(
  '/search',
  serviceHeader('activitySearch'),
  userCheckAuth,
  userCheckPerm('activity.search.own'),
  pauseController,
  activitySearch,
);

router.patch(
  '/:activityId',
  serviceHeader('activityUpdateById'),
  userCheckAuth,
  userCheckPerm('activity.update.own'),
  pauseController,
  activityUpdateById,
);

router.delete(
  '/:activityId',
  serviceHeader('activityDeleteById'),
  userCheckAuth,
  userCheckPerm('activity.delete.own'),
  pauseController,
  activityDeleteById,
);

export default router;
