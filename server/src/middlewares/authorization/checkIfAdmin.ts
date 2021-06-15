import { Request, Response, RequestHandler, NextFunction } from 'express';

const checkIfAdmin: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role == 'seller') { return next(); }
  return res.status(401).json({
    success: false,
    message: 'You are not authorized to access this end-point.'
  })
};

export default checkIfAdmin;