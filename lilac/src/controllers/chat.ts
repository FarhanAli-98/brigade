import { Socket } from "socket.io";
import { chatService } from '../io';

const chatController =  (socket: Socket) => {
  chatService.init(socket);

  socket.on('getSocket', (data: any) => {
    if (data && data.userID) {
      const userSocketID: string = chatService.getConnectedClient(data.userID)!;
      socket.emit('getSocket', userSocketID || "");
    }
  });

  socket.on('message', (data: any) => {
    chatService.sendMessage(socket, data);
  })

  socket.on('disconnect', (data) => {
    console.log('A User disconnected from Chat Namespace', socket.id )
  })
};

export default chatController;