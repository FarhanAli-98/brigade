import { Request, Response, RequestHandler, NextFunction } from 'express';
import { User, IUser } from '../../../../models';

const getAllUsers: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const skip: number = parseInt(req.query.skip!?.toString()) || 0;
  const limit: number = parseInt(req.query.limit!?.toString()) || 50; 
  try {
    const users: IUser[] = await User.find().skip(skip).limit(limit)
    return res.status(200).json({
      success: true,
      data: {
        users,
        skip,
        limit
      }
    })
  } catch (error) {
    next(error);
  }
};

export default getAllUsers;