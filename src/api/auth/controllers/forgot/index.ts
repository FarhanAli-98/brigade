import { Request, Response, RequestHandler } from 'express';
import { User } from '../../../../models';
import { generateResetToken } from '../../helpers';

const forgotController: RequestHandler = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email || typeof email != 'string') {
    return res.status(400).json({
      success: false,
      message: 'Invalid or Missing Email',
      data: { email }
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found',
      });
    }
    if (user?.resetToken && (user?.resetExpires > Date.now())) {
      return res.json({
        success: false,
        message: 'A password reset link has already been emailed to the provided address',
        data: { email }
      });
    }
    const resetToken = generateResetToken({ id: user?._id, role: user?.role });
    await user?.updateOne({
      $set: {
        resetToken,
        resetExpires: Date.now() + (20 * 60 * 1000)
      }
    });
    res.json({
      success: false,
      message: 'A password reset link has been successfully emailed to the provided address',
      data: { email }
    });
    //await sendEmail(user?.email!, 'Password Reset Link', passwordResetHTML(resetToken))
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error. Please try again later.',
      data: { error }
    })
  };
};

export default forgotController;