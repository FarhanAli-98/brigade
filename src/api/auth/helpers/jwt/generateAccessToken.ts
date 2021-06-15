import jwt from 'jsonwebtoken';
import { ACCESS_SECRET, ACCESS_EXPIRES } from '../../../../config';

const generateAccessToken = (payload: any) => {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: ACCESS_EXPIRES
  });
};

export default generateAccessToken;