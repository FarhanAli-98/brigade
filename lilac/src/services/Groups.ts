import { Socket } from "socket.io";
import { group } from "../models/Groups";
import Namespace from "./Namespace";

class Groups extends Namespace {
  constructor() {
    super();
  }
  async init(socket: Socket): Promise<void> {
    super.addConnectedClient(socket);
  }
  async joinPublicRoom(socket: Socket): Promise<void> {
    const { roomName } = socket.handshake.query;
    if (roomName) {
      return await socket.join(roomName);
    }
  }
  async createGroup(socket: Socket, data: any) {
    const { id, groupName } = socket.handshake.query;
    if (!data) {
      return;
    }
    if (!id || !groupName) {
      return;
    }
    if (id && groupName) {
      const groupAllReadyExist = await group.findOne({ name: data.name });
      if (groupAllReadyExist) {
        return;
      }
      await this.joinPublicRoom(socket);
      await group.create(data);
      return socket.broadcast
        .to(`${data.name}`)
        .emit("groupCreate", "Group Created");
    }
  }
  async joinRoom(socket: Socket, data: any) {
    const { id } = socket.handshake.query;
    await group.findByIdAndUpdate(id, {
      _id: data.name,
      $push: {
        members: { userID: data.id, role: data.role },
      },
    });
    return socket.broadcast
      .to(`${data.name}`)
      .emit("joinRoom", `${data.name} join group`);
  }
  async leaveRoom(socket: Socket, data?: any) {
    const { id, groupName } = socket.handshake.query;
    if (!id || !groupName) {
      return;
    }
    if (id && groupName) {
      await group.findByIdAndUpdate(id, {
        _id: groupName,
        $pull: {
          members: id,
        },
      });
      return socket.broadcast
        .to(`${groupName}`)
        .emit("groupLeave", "Member leave group");
    }
  }
  deleteRoom(socket: Socket, roomID: string) {
    if (roomID) {
      socket.leave(roomID);
    }
  }
}

export default Groups;
