import fakeRouter from '../_fake/Routes';

import analyticsRouter from '../analytics/Routes';
import userRouter from '../user/userRoutes';
import infoRouter from '../info/infoRoutes';
import baseRouter from '../_base/Routes';
import serviceRouter from '../service/Routes';
import experienceRoutes from '../experience/Routes';
import activityRoute from '../activity/Routes';
import accommodationRoute from '../accommodation/Routes';
import attractionRoute from '../attraction/Routes';
import restaurantRoute from '../restaurant/Routes';
import listRouter from '../lists/Routes';

export default function routes(app) {
  app.use('/base', baseRouter);

  app.use('/user', userRouter);
  app.use('/experience', experienceRoutes);
  app.use('/activity', activityRoute);
  app.use('/accommodation', accommodationRoute);
  app.use('/attraction', attractionRoute);
  app.use('/restaurant', restaurantRoute);
  app.use('/service', serviceRouter);

  app.use('/fake', fakeRouter);
  app.use('/analytics', analyticsRouter);
  app.use('/info', infoRouter);
  app.use('/list', listRouter);
}
