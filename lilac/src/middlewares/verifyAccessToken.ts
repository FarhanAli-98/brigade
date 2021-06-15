import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { ACCESS_SECRET } from "../config";
import jwt from 'jsonwebtoken';

const verifyAccessToken = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>, next: any) => {
  try {
    const token: string = socket.handshake.headers.authorization!.split(' ')[1];
    if (token) { 
      jwt.verify(token, ACCESS_SECRET);
      next();
    }
  } catch (error) {
    next(new Error('Invalid Access Token'));
  }
};

export default verifyAccessToken;