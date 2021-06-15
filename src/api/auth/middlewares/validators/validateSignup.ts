import { Request, Response, RequestHandler, NextFunction } from 'express';
import Joi from 'joi';

const validateSignup: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const signupSchema = Joi.object().keys({
    //email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(8),
    firstName: Joi.string().required().min(3),
    lastName: Joi.string().required(),
    role: Joi.string().optional().min(5).max(13),
  });
  try {
    const result = await signupSchema.validateAsync(req.body, {
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

export default validateSignup;