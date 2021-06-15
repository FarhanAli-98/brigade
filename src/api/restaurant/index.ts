
import { Router } from 'express';
import {
  createOrder,
 removeAnAd

 
  } from './controller';
  const router: Router = Router();
router.delete('/del',removeAnAd);
router.post('/create', createOrder);
export default router;
