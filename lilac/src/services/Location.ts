import { Socket } from "socket.io";
import Namespace from './Namespace';

class Location extends Namespace {

  constructor() {
    super();
  }

  async init(socket: Socket): Promise<void> {
    super.addConnectedClient(socket);
    await this.joinPublicRoom(socket);
  }

  async joinPublicRoom(socket: Socket, roomID?: string): Promise<void> {
    const { category, city } = socket.handshake.query;

    if (category && city) {
      return await socket.join(`${city}/${category}`);
    }

    if (roomID) {
      return await socket.join(roomID);
    }
  }

  broadcastLocation(socket: Socket, data: any, roomID?: string) {
    const { category, city } = socket.handshake.query;

    if (!data) { return; }

    if (category && city) {
      this.leaveAllRooms(socket);
      return socket.broadcast.to(`${city}/${category}`).emit('broadcastLocation', data);
    }

    if (roomID) {
      return socket.broadcast.to(roomID).emit(JSON.stringify('broadcastLocation', data));
    }
  }

  emitLocation(socket: Socket, roomID: string, data: any) {
    if (roomID && data) {
      return socket.broadcast.to(roomID).emit(JSON.stringify('location', data));
    }
  }

  leaveRoom(socket: Socket, roomID: string) {
    if (roomID) {
      socket.leave(roomID);
    }
  }

  leaveAllRooms(socket: Socket) {
    socket.rooms.clear();
  }

};

export default Location;