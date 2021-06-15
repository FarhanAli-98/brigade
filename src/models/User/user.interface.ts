import { Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  role?: string;
  status?:String;
  firstName: string;
  lastName: string;
  banned?: boolean;
  bannedTill?: any;
  verified?: boolean;
  refreshToken?: string | null;
  resetToken?: string | null;
  resetExpires?: any;
  matchPassword: Function;
};

export default IUser;