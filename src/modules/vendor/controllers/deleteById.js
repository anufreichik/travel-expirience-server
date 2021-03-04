import Vendor from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const vendorDeleteById = (req, res) => {
  // читаем id из параметров URL запроса
  const _id = get(req, 'params.vendorId');

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  Vendor.deleteOne({ _id })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Vendor deleted'));
      } else {
        res.status(400).json(message.fail('Vendor not found'));
      }
    })
    .catch((error) => {
      // Формируем, записываем данные события для аналитики
      const analyticsId = analytics('VENDOR_DELETE_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Vendor',
        entityId: _id,
        user: userId,
        controller: 'vendorCreate',
      });

      res.status(400).json(message.fail('Vendor delete error', analyticsId));
    });
};

export default vendorDeleteById;
