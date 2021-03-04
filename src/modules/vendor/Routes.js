import { Router } from 'express';
import serviceHeader from '../utils/serviceHeader';
import userCheckPerm from '../permission/userCheckPerm';

import vendorCreate from './controllers/create';
import userCheckAuth from '../user/middlewares/userCheckAuth';
import vendorGetById from './controllers/getById';
import vendorSearch from './controllers/search';
import vendorUpdateById from './controllers/updateById';
import vendorDeleteById from './controllers/deleteById';
import vendorStats from './controllers/stats';
import pauseController from '../core/pauseController';

const router = Router();

// CRUD

router.get(
  '/stats', // GET /localhost:5000/vendor/stats
  serviceHeader('vendorStats'), // mark request
  userCheckAuth, // midlware  needed to check if user has rights to do the request
  userCheckPerm('vendor.search.own'), // midlware has rights to do this operation such as vendor.search.own
  pauseController,
  vendorStats,
);

router.post(
  '/', // POST /localhost:5000/vendor/stats
  serviceHeader('vendorCreate'),
  userCheckAuth,
  userCheckPerm('vendor.create.own'),
  // pauseController,
  vendorCreate,
);

router.get(
  '/:vendorId',
  serviceHeader('vendorGetById'),
  userCheckAuth,
  userCheckPerm('vendor.get.own'),
  pauseController,
  vendorGetById,
);

router.post(
  '/search',
  serviceHeader('vendorSearch'),
  userCheckAuth,
  userCheckPerm('vendor.search.own'),
  pauseController,
  vendorSearch,
);

router.patch(
  '/:vendorId',
  serviceHeader('vendorUpdateById'),
  userCheckAuth,
  userCheckPerm('vendor.update.own'),
  pauseController,
  vendorUpdateById,
);

router.delete(
  '/:vendorId',
  serviceHeader('vendorDeleteById'),
  userCheckAuth,
  userCheckPerm('vendor.delete.own'),
  pauseController,
  vendorDeleteById,
);

export default router;
