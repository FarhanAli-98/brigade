import { Router } from 'express';
import { verifyAccessToken } from '../../middlewares';
import { 
  getMyMessages,
  getMyChat ,
  clearMyChat
} from './controllers';

const router: Router = Router();

router.get('/:userID', verifyAccessToken, getMyChat);

router.get('/', verifyAccessToken, getMyMessages);

router.delete('/',verifyAccessToken,clearMyChat);


export default router;