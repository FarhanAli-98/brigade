import { Router } from 'express';
import path from 'path';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import { MONGO_URI } from '../../config';

import { 
  verifyAccessToken,
  checkIfAdmin 
} from '../../middlewares';

import {
  getAllUsers,
  getAUser,
  removeAUser,
  editUser
} from './controllers';


const router: Router = Router();

router.get('/:id', verifyAccessToken, getAUser);

router.get('/', verifyAccessToken, getAllUsers);

router.patch('/', verifyAccessToken, editUser);

router.delete('/', verifyAccessToken, checkIfAdmin, removeAUser);

export default router;