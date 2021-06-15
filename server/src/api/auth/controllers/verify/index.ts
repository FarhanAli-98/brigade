import { Request, Response, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { ACCESS_SECRET } from '../../../../config';
import { User } from '../../../../models';

const verifyAccountController: RequestHandler = async (req: Request, res: Response) => {
  const token: string = req.query.token?.toString()!;
  const decodedClaims: any = jwt.verify(token, ACCESS_SECRET)
  try {
    await User.findByIdAndUpdate(decodedClaims.id, {
      $set: {
        verified: true,
      }
    });
    return res.json({
      success: true,
      message: 'Account Verified Successfully'
    });
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Could not verify the account. Try again later'
    });
  }
}

export default verifyAccountController;