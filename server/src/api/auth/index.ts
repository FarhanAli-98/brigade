import { Router } from 'express';

import {
  loginController,
  resetController,
  signupController,
  refreshController,
  forgotController,
  verifyAccountController,
  
} from './controllers';

import {
  validateLogin,
  validateSignup
} from './middlewares';

import {
  verifyAccessToken,
  verifyRefreshToken,
  verifyResetToken
} from '../../middlewares';


import path from 'path';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import { MONGO_URI } from '../../config';






export const storage = new GridFsStorage({
  url: MONGO_URI,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: 'profile-pictures'
      };
      resolve(fileInfo);
    });
  }
});

const fileFilter = (req: any, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
  var ext = path.extname(file.originalname);
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
    req.fileValidationError = 'Supported Formats: .png, .jpg, .jpeg'
    return callback(new Error(req.fileValidationError));
  }
  callback(null, true);
}

export const upload = multer({
  storage: storage,
  limits: {
    files: 1,
    fileSize: 3072 * 1024
  },
  fileFilter: fileFilter
}).single('file');


const router: Router = Router();

router.post('/login', validateLogin, loginController);

router.post('/signup',upload, signupController);

router.post('/forgot', forgotController);

router.post('/reset', verifyRefreshToken, resetController);

router.post('/refresh', verifyRefreshToken, refreshController);

router.get('/verify', verifyAccountController)

export default router;