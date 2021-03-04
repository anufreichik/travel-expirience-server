import { Router } from 'express';
import { maintain } from './maintainControllers';
import userCheckAuth from '../user/middlewares/userCheckAuth';
import userCheckPerm from '../permission/userCheckPerm';
import maintainHeader from '../utils/serviceHeader';

const router = Router();

router.get(
  '/',
  maintainHeader('maintain'),
  userCheckAuth,
  userCheckPerm('user.update.any'),
  maintain,
);

export default router;
