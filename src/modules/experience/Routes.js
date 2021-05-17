import { Router } from 'express';
import serviceHeader from '../utils/serviceHeader';
import userCheckPerm from '../permission/userCheckPerm';

import experienceCreate from './controllers/create';
import userCheckAuth from '../user/middlewares/userCheckAuth';
import experienceGetById from './controllers/getById';
import experienceSearch from './controllers/search';
import experienceUpdateById from './controllers/updateById';
import experienceDeleteById from './controllers/deleteById';
import experienceStats from './controllers/stats';
import pauseController from '../core/pauseController';

const router = Router();


router.get(
  '/stats', // GET /localhost:5000/experience/stats
  serviceHeader('experienceStats'), // mark request
  //userCheckAuth, // midlware  needed to check if user has rights to do the request
  //userCheckPerm('experience.search.own'), // midlware has rights to do this operation such as experience.search.own
  pauseController,
  experienceStats,
);

router.post(
  '/', // POST /localhost:5000/experience/stats
  serviceHeader('experienceCreate'),
  userCheckAuth,
  userCheckPerm('experience.create.own'),
  // pauseController,
  experienceCreate,
);

router.get(
  '/:experienceId',
  serviceHeader('experienceGetById'),
  //userCheckAuth,
  //userCheckPerm('experience.get.own'),
  pauseController,
  experienceGetById,
);

router.post(
  '/search',
  serviceHeader('experienceSearch'),
 // userCheckAuth,
  //userCheckPerm('experience.search.own'),
  pauseController,
  experienceSearch,
);

router.patch(
  '/:experienceId',
  serviceHeader('experienceUpdateById'),
  userCheckAuth,
  userCheckPerm('experience.update.own'),
  pauseController,
  experienceUpdateById,
);

router.delete(
  '/:experienceId',
  serviceHeader('experienceDeleteById'),
  userCheckAuth,
  userCheckPerm('experience.delete.own'),
  pauseController,
  experienceDeleteById,
);

export default router;
