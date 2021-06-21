import { Request, Response, RequestHandler, NextFunction } from 'express';
import { User, IUser } from '../../../../models';

const getAUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id.toString();
  try {
    const user = await User.findById(id);
    return res.status(200).json({
      success: true,
      data: user
    })
  } catch (error) {
    next(error);
  }
};

export default getAUser;