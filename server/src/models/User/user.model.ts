import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import IUser from './user.interface';

const userSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    index: true,
    required: true,
    minlength: 12,
    maxlength: 72
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255,
    select: false
  },
  role: {
    type: String,
    enum: ['theaf', 'police'],
    default: 'police',
    lowercase: true
  },
  status: {
    type: String,
    // enum: ['Unavailable', 'OnJob', 'Available'],
    default: 'available',
    lowercase: true
  },
  firstName: {
    type: String,
    trim: true,
    index: true,
    lowercase: true,
    minlength: 3,
    maxlength: 72,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    index: true,
    lowercase: true,
    maxlength: 72,
    required: true
  },
  displayPictureID: {
    type: Schema.Types.ObjectId,
    ref: 'images.files',
  },

  banned: {
    type: Boolean,
    default: false
  },
  bannedTill: {
    type: Date,
    default: null
  },
  verified: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String,
    trim: true,
  },
  resetToken: {
    type: String,
    trim: true,
  },
  resetExpires: {
    type: Date,
    default: null
  },
 

}, {
  timestamps: true,
  versionKey: false
});

userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash((this as any).password, salt);
  return (this as any).password = hashedPassword;
});



userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};


const User = model<IUser>('Users', userSchema);

export default User;
