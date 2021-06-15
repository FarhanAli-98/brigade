import { Router } from 'express';
import {
  authRouter,

} from '../api';
import{
  createOrder
}from '../api'
 import {
  removeAnAd
 }from '../api'
const router: Router = Router();


router.use('/auth', authRouter);
router.use('/order', createOrder);
router.use('/order', removeAnAd);





export default router;