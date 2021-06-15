import { Schema, model } from 'mongoose';
import IOrder from './order.interface'

const companySchema: Schema<IOrder> = new Schema({
  name: {
    type: String,
    index: true,
    lowercase: true,
    trim: true,
    required: true,
    unique: true
  },
  quantity: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  dishtype: {
    type: String,
    trim: true,
    required: true
  },
  address: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  orderId:{
    type: Schema.Types.ObjectId,
    ref: 'Users',
    index: true
  },
  ownername: {
    type: Schema.Types.ObjectId,
    index: true,
    required: true,
    trim: true,
    lowercase: true,
  },
 
}, {
  timestamps: true,
  versionKey: false
});

const Order = model<IOrder>('Companies', companySchema);

export default Order;
