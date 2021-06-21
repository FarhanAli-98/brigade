import { Document } from 'mongoose';

interface IMember extends Document {
  userID:string,
  role:string
};

interface IGroup extends Document {
  name?: string,
  status:string,
  ownerID?: string,
  members?: IMember[]
  timestamp?: Date,
};

export default IGroup;
