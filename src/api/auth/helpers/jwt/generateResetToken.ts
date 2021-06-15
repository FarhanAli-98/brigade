import jwt from 'jsonwebtoken';
import { RESET_SECRET, RESET_EXPIRES } from '../../../../config';

const generateResetToken = (payload: any) => {
  return jwt.sign(payload, RESET_SECRET, {
    expiresIn: RESET_EXPIRES
  });
};

export default generateResetToken;