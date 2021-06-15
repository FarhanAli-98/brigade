import jwt from 'jsonwebtoken';
import { Request, Response, RequestHandler, NextFunction } from 'express';

import { ACCESS_SECRET } from '../../config';

const verifyAccessToken: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const token: string = req.headers['authorization']?.split(' ')[1]!;
  if (!token || typeof token != 'string') {
    return res.status(400).json({
      success: false,
      message: 'Missing Access Token'
    });
  }
  try {
    const decodedClaims = jwt.verify(token, ACCESS_SECRET);
    req.user = decodedClaims;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or Expired Access Token',
    });
  };
};

export default verifyAccessToken;