import { Router } from 'express';
import serviceHeader from '../utils/serviceHeader';
import userCheckPerm from '../permission/userCheckPerm';

import orderCreate from './controllers/create';
import userCheckAuth from '../user/middlewares/userCheckAuth';
import orderGetById from './controllers/getById';
import orderSearch from './controllers/search';
import orderUpdateById from './controllers/updateById';
import orderDeleteById from './controllers/deleteById';
import orderStats from './controllers/stats';
import pauseController from '../core/pauseController';

const router = Router();

// CRUD

router.get(
  '/stats', // GET /localhost:5000/order/stats
  serviceHeader('orderStats'), // mark request
  userCheckAuth, // midlware  needed to check if user has rights to do the request
  userCheckPerm('order.search.own'), // midlware has rights to do this operation such as order.search.own
  pauseController,
  orderStats,
);

router.post(
  '/', // POST /localhost:5000/order/stats
  serviceHeader('orderCreate'),
  userCheckAuth,
  userCheckPerm('order.create.own'),
  // pauseController,
  orderCreate,
);

router.get(
  '/:orderId',
  serviceHeader('orderGetById'),
  userCheckAuth,
  userCheckPerm('order.get.own'),
  pauseController,
  orderGetById,
);

router.post(
  '/search',
  serviceHeader('orderSearch'),
  userCheckAuth,
  userCheckPerm('order.search.own'),
  pauseController,
  orderSearch,
);

router.patch(
  '/:orderId',
  serviceHeader('orderUpdateById'),
  userCheckAuth,
  userCheckPerm('order.update.own'),
  pauseController,
  orderUpdateById,
);

router.delete(
  '/:orderId',
  serviceHeader('orderDeleteById'),
  userCheckAuth,
  userCheckPerm('order.delete.own'),
  pauseController,
  orderDeleteById,
);

export default router;
