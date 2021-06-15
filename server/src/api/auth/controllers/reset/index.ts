import { Request, Response, RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import useragent from 'useragent';
import { User } from '../../../../models';


const resetController: RequestHandler = async (req: Request, res: Response) => {
  const { newPassword, confirmPassword } = req.body;
  if (!newPassword || !confirmPassword || newPassword != confirmPassword) {
    return res.status(400).json({
      success: false,
      message: 'Bad Request',
      data: req.body
    });
  }
  try {
    if(req.user.id=='')
    {
      return res.status(404).json({
        success: false,
        message: 'User Not Found'
      });
    }
    const user = await User.findById(req.user.id);
    if(!user) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found'
      });
    }
    const salt = await bcrypt.genSalt(8);
    const updatedPassword = await bcrypt.hash(newPassword, salt);
    await user.updateOne({
      $set: {
        password: updatedPassword,
        resetToken: null,
        resetExpires: null
      }
    });
    res.json({
      success: true,
      message: 'Password reset successfully'
    });
    // Send another email confirming the password has been updated
    const agent = useragent.parse(req.headers['user-agent']);
   // await sendEmail(user.email, 'Password Reset Successfully', passwordResetConfirmationHTML(req.ip, agent.family.toString()!, agent.os.family.toString(), new Date().toUTCString()));
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error. Please try again later.',
      data: error
    });
  }
};

export default resetController;