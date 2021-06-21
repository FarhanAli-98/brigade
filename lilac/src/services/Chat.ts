import { Socket } from "socket.io";
import { IMessage } from "../models";
import Message from "./Message";
import Namespace from './Namespace';

class Chat extends Namespace {
 
  constructor (private messageService: Message) {
    super();
  }

  async init(socket: Socket): Promise<void> {
    super.addConnectedClient(socket);
  }

  async sendMessage(socket: Socket, data: IMessage) {
    const userRoomID: string | undefined = this.getConnectedClient(data.receiverID);
    if (userRoomID) {
      socket.to(userRoomID).emit('message', data);
      console.log(userRoomID);
      await this.messageService.cacheMessage(data)
    }
  }
};


export default Chat;