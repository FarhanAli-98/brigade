import { Request, Response, RequestHandler } from 'express';
import { User } from '../../../../models';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../../helpers';

const loginController: RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !await user.matchPassword(password)) {
      return res.status(403).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
    if (!user.verified) {
      return res.status(403).json({
        success: false,
        message: 'Account not verified',
      });
    }
    if (user.banned) {
      return res.status(403).json({
        success: false,
        message: 'Account banned temporarily',
        data: {
          bannedTill: user.bannedTill
        }
      });
    }
    const decodedClaims: any = jwt.decode(user.refreshToken!);
    var isExpiredToken = false;

    var dateNow = new Date();

    if (decodedClaims.exp < dateNow.getTime() / 1000) {
      isExpiredToken = true;
    }
     const refreshtoken:string=  generateRefreshToken({ id: user._id, role: user.role})
    if(isExpiredToken)
    {
      console.log("updated")
     const users= await user.update({
        $set: {
          refreshToken: refreshtoken
        }
      });
      if(users)
      {
        return res.status(200).json({
          success: true,
          message: 'User logged in successfully updated',
          data: {
            user: user.toJSON(),
            accessToken: generateAccessToken({ id: user._id, role: user.role }),
          }
        });
      }
    }
    return res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: {
        user: user.toJSON(),
        accessToken: generateAccessToken({ id: user._id, role: user.role }),
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: error
    });
  };
};

export default loginController;