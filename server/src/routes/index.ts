import { Router } from 'express';
import {
  authRouter,
} from '../api';
const router: Router = Router();


router.use('/auth', authRouter);



export default router;