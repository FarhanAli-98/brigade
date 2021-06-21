import { Request, Response, RequestHandler } from 'express';
import { IUser, User } from '../../../../models';

const editUser: RequestHandler = async (req: Request, res: Response) => {
  const data: IUser = { ...req.body };
  const userid = req.user.id;
  try {
      const updateuser = await User.findByIdAndUpdate(userid, data, { new: true });
      if (updateuser) {
        return res.status(200).json({
          success: true,
          message: 'User Updated Successfully',
          data: updateuser
        });
      }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: error
    });
  };
};

export default editUser;