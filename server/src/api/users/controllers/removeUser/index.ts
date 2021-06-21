import { Request, Response, RequestHandler, NextFunction } from 'express';
import { User, IUser } from '../../../../models';

const removeAUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

  try {
        const confirmation = await User.findByIdAndDelete({ _id: req.query.id });
        if (confirmation) {
          return res.status(200).json({
            status: true
          }
          )
        }   
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: error
    });
  };
};

export default removeAUser;