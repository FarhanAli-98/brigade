
import { Request, Response, RequestHandler } from 'express';
import { storage } from '../..';
import { IUser, User } from '../../../../models';
const fs = require('fs')
import {  generateAccessToken, generateRefreshToken } from '../../helpers';
//import { storage } from '../../index';

const ProfileController: RequestHandler = async (req: Request, res: Response) => {

  try {

    const user=await User.findById(req.user.id);
    const file = await fs.createReadStream(user?.displayPicture);
    // res.setHeader('Content-Type',req.file.contentType)
    // file.pipe(res)
    res.setHeader('Content-Disposition', 'attachment: filename="' + "Screenshot_2021-05-24_10-48-07.png" + '"');
      var readstream =file
      file.on('error', function (err:any) {
        //res.end();
      });
      file.pipe(res);
  
  } catch (error) {

  
    return res.status(500).json({
      success: false,
      data: error
    });
  };
};

export default ProfileController;