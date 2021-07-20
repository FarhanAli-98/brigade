import { Document } from 'mongoose';

interface IMessage extends Document {
  text: string,
  senderID: string,
  receiverID: string
  timestamp: Date,
  senderName: string,
  senderDisplayPictureURL?: string
};

export default IMessage;
