import jwt from 'jsonwebtoken';
import { REFRESH_SECRET, REFRESH_EXPIRES } from '../../../../config';

const generateRefreshToken = (payload: any) => {
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRES
  });
};

export default generateRefreshToken;