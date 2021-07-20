import { Router } from 'express';
import { verifyAccessToken } from '../../middlewares';
import GetMyGroups from './contrllers/getMyGroups';


const router: Router = Router();

router.get('/', verifyAccessToken, GetMyGroups);




export default router;