import { Socket } from "socket.io";
import Namespace from "./Namespace";

class Location extends Namespace {
  constructor() {
    super();
  }

  async init(socket: Socket): Promise<void> {
    super.addConnectedClient(socket);
    await this.joinPublicRoom(socket);
  }

  async joinPublicRoom(socket: Socket, roomID?: string): Promise<void> {
    const { name } = socket.handshake.query;

    if (name) {
      return await socket.join(`${name}`);
    }

    if (roomID) {
      return await socket.join(roomID);
    }
  }

  broadcastLocation(socket: Socket, data: any, roomID?: string) {
    const { name } = socket.handshake.query;
    if (!data) {
      return;
    }
    if (name) {
      return socket.broadcast.to(`${name}`).emit("broadcastLocation", data);
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
}

export default Location;
