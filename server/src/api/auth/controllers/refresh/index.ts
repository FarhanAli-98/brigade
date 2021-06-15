import { Request, Response, RequestHandler, NextFunction } from 'express';
import { User } from '../../../../models';
import { generateAccessToken } from '../../helpers';
import jwt from 'jsonwebtoken';

const refreshController: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string = req.headers["authorization"]?.split(" ")[1]!;
    const decodedClaims: any = jwt.decode(token);
    var isExpiredToken = false;

    var dateNow = new Date();

    if (decodedClaims.exp < dateNow.getTime() / 1000) {
      isExpiredToken = true;
    }

    const user = await User.findById(decodedClaims?.id);
    console.log(dateNow.getTime() / 1000);
    if (isExpiredToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid Refresh Token",
      });
    }

    if (token != user?.refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid Refresh Token",
      });
    }
    return res.json({
      success: true,
      message: "Access Token refreshed successfully",
      data: {
        accessToken: generateAccessToken({
          id: user._id,
          role: user.role,
          bannedTill: user.bannedTill,
          banned: user.banned,
        }),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: error,
    });
  }
}

export default refreshController;