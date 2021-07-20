import { Schema, model } from 'mongoose';
import IGroup from './group.interface';

const groupSchema: Schema<IGroup> = new Schema({
  name: {
    type: String,
    required: [true, '{text} is required.'],
    maxlength: 4096,
    trim: true, 
  },
  ownerID: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    index: true
  },
  status:{
    type: String,
    default:"basic"
  },
  members: {
    type: Array,
    default: []
  },
  // timestamp: {
  //   type: Date,
  // }
} ,
{
  timestamps: true,
  versionKey: false
});

const Group = model<IGroup>('Groups', groupSchema);

export default Group;

