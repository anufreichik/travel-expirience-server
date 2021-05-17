import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { get, uniq, flattenDeep, hasIn } from 'lodash';
import User from '../userModel';
import message from '../../utils/messages';
import roles from '../../permission/roles';
import analytics from '../../analytics/controllers/analytics';
import userUpdateByIdQuery from '../queries/updateById';

const acl = (userRoles) => uniq(flattenDeep(userRoles.map((el) => roles[el])));

const userLogin = (req, res) => {
  const email = get(req, 'body.email', '').trim().toLowerCase();

  User.findOne({ email: email })
    // +emailConfirmation.hash JUST FOR TESTING remove in real project
    .select('+password +emailConfirmation.hash')
    .exec()
    .then((user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, async (err, result) => {
          if (err) {
            const analyticsId = analytics('USER_LOGIN_FAIL', {
              email,
              reason: err,
              isBodyPasswordExist: hasIn(req, 'body.password'),
              isUserPasswordExist: hasIn(user, 'password'),
            });

            return res.status(401).json(message.fail('Auth failed', analyticsId));
          } else if (result) {
            const token = jwt.sign(
              {
                email: user.email,
                userId: user._id,
              },
              process.env.JWT_KEY,
              {
                expiresIn: process.env.JWT_EXPIRES_IN,
              },
            );

            user.password = null;

            // Setting login date
            const loginDate = new Date();
            userUpdateByIdQuery({
              userId: user._id,
              values: { lastLogin: { date: loginDate } },
            });

            analytics('USER_LOGIN_SUCCESS', {
              user: user._id,
            });

            // Just for education
            const confirmationHash = get(user, 'emailConfirmation.hash');
            const confirmEmailLink = `/user/verify/email/${user._id}/${confirmationHash}`;
            delete user._doc.emailConfirmation.hash;

            return res.status(200).json({
              message: 'Auth success',
              confirmEmailLink,
              token,
              user: user,
              acl: acl(user.roles),
              userId: user._id,
            });
          } else {
            const analyticsId = analytics('USER_LOGIN_FAIL', {
              email,
              reason: 'Wrong password',
            });

            res.status(401).json(message.fail('Auth failed', analyticsId));
          }
        });
      } else {
        const analyticsId = analytics('USER_LOGIN_FAIL', {
          email,
          reason: 'User not found',
        });

        res.status(401).json(message.fail('Auth failed', analyticsId));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('USER_LOGIN_ERROR', {
        email,
        controller: 'userLogin',
        error,
      });

      res.status(400).json(message.fail('Auth failed. Error', analyticsId));
    });
};

export default userLogin;
