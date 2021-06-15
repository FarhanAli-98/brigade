import { Document } from 'mongoose';

interface IOrder extends Document {
  name: string;
  orderId:string;
  quantity: string;
  description: string;
  ownername: string;
  dishtype: string;
  address: string;
 
};

export default IOrder;