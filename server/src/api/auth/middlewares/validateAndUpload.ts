import { Request, Response, RequestHandler, NextFunction } from 'express';
import { User } from '../../../models';
import { upload } from '../index';

const validateAndUpload: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    upload(req, res, function (err: any) {
      if (err) { return next(err); }
        if ((req as any).fileValidationError) {
          return res.status(400).json({
            success: false,
            message: 'Format Not Supported',
            details: (req as any).fileValidationError
          });
        }
      return next();
    });
  } catch (error) {
    next(error);
  };
};

export default validateAndUpload;