
import { Request, Response, RequestHandler } from 'express';
import { storage } from '../..';
import { IUser, User } from '../../../../models';
const fs = require('fs')
import {  generateAccessToken, generateRefreshToken } from '../../helpers';
//import { storage } from '../../index';

const signupController: RequestHandler = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, role } = req.body;
 const data :IUser = { ...req.body };
 
  try {
    console.log(email)
    if (await User.findOne({ email})) {
      return res.status(403).json({
        success: false,
        message: 'User already exists',
      });
    }
    
     let user = await User.create({email, password, firstName, lastName, role});
    if(req.file) {
      await user.updateOne({
        $set: {
          refreshToken: generateRefreshToken({ id: user._id, role: user.role }),
          displayPicture:  req.file.id ,
         // displayPictureURL: `http://localhost/api/images/profile/${req.file.id}`
        }
      });
    }
    else {
      await user.updateOne({
        $set: {
          refreshToken: generateRefreshToken({ id: user._id, role: user.role })
        }
      });
   }
    const token = generateAccessToken({ id: user._id });
    return res.status(201).json({
      success: true,
      message: 'User Created Successfully',
      details: 'An email has been sent. Kindly verify your account.',
      data: {
        id: user._id,
        email: user.email,
        path:user.displayPicture
      }
    });
  } catch (error) {
    console.log('inside error')
    if(req.file) {
      storage._removeFile(req, req.file, (err) => {
        console.log(err)
      })
    }
   
    let statusCode = 500;
    let statusMessage = 'Something went wrong';
    if (error.errors?.role) {  // Special case when enum role not proper
      statusCode = 400;
      statusMessage = (data as any)//'Validation Error'
      
    }
    return res.status(statusCode).json({
      success: false,
      message: statusMessage,
      data: error
    });
  };
};

export default signupController;