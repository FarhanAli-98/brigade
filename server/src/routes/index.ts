import { Router } from 'express';
import {
  authRouter,
  userRouter
} from '../api';
const router: Router = Router();


router.use('/auth', authRouter);

router.use('/user', userRouter);



export default router;