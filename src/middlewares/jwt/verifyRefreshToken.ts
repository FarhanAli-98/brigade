import jwt from 'jsonwebtoken';
import { Request, Response, RequestHandler, NextFunction } from 'express';

import { REFRESH_SECRET } from '../../config';

const verifyRefreshToken: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const token: string = req.headers['authorization']?.split(' ')[1]!;
  if (!token || typeof token != 'string') {
    return res.status(400).json({
      success: false,
      message: 'Missing Refresh Token'
    });
  }
  try {
    console.log(REFRESH_SECRET);
    const verifyrefre:any=jwt.decode(token);
    console.log(verifyrefre)

    var dateNow = new Date();

    if (verifyrefre.exp < dateNow.getTime() / 1000) {
      console.log('exp')
    }
    const decodedClaims = jwt.verify(token, REFRESH_SECRET);
    req.user = decodedClaims;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or Expired Refresh Token',
    });
  };
};

export default verifyRefreshToken;