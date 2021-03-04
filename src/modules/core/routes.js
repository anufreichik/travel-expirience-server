import fakeRouter from '../_fake/Routes';

import analyticsRouter from '../analytics/Routes';
import userRouter from '../user/userRoutes';
import infoRouter from '../info/infoRoutes';
import maintainRouter from '../maintain/maintainRoutes';
import baseRouter from '../_base/Routes';
import clientRouter from '../client/Routes';
import orderRouter from '../order/Routes';
import vendorRouter from '../vendor/Routes';
import serviceRouter from '../service/Routes';

import listRouter from '../lists/Routes';

export default function routes(app) {
  app.use('/base', baseRouter);

  app.use('/user', userRouter);
  app.use('/client', clientRouter);
  app.use('/order', orderRouter);
  app.use('/vendor', vendorRouter);
  app.use('/service', serviceRouter);

  app.use('/fake', fakeRouter);
  app.use('/analytics', analyticsRouter);
  app.use('/info', infoRouter);
  app.use('/maintain', maintainRouter);

  app.use('/list', listRouter);
}
