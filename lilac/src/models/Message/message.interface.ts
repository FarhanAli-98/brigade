import { Document } from 'mongoose';

interface IMessage extends Document {
  text: string,
  senderID: string,
  receiverID: string
  timestamp: Date,
  senderName: string,
  receiverName: string,
  senderDisplayPictureURL?: string,
  receiverDisplayPictureURL?: string,
};

export default IMessage;
