import { Schema, model } from 'mongoose';
import IMessage from './message.interface';

const messageSchema: Schema<IMessage> = new Schema({
  text: {
    type: String,
    required: [true, '{text} is required.'],
    maxlength: 4096,
    trim: true, 
  },
  senderID: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: [true, '{senderID} is required.'],
    index: true
  },
  receiverID: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: [true, '{receiverID} is required.'],
    index: true
  },
  senderName: {
    type: String,
    required: true
  },
  senderDisplayPictureURL: {
    type: String,
  },
  timestamp: {
    type: Date,
    index:true
  }
}, {
  versionKey: false
});

const Messages = model<IMessage>('Messages', messageSchema);

export default Messages;

