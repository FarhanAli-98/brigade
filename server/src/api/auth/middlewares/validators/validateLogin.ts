import { Request, Response, RequestHandler, NextFunction } from 'express';
import Joi from 'joi';

const validateLogin: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const loginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(8)
  });
  try {
    const result = await loginSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    if (result) { next(); }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Validation Error',
      data: error
    });
  };
};

export default validateLogin;