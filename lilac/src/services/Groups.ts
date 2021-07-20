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
  async joinPublicRoom(socket: Socket, name: any): Promise<void> {
    // const { roomName } = socket.handshake.query;
    if (name) {
      return await socket.join(name);
    }
  }
  async createGroup(socket: Socket, data: any) {
    if (!data) {
      return;
    }
    console.log(data);
    await this.joinPublicRoom(socket, data.name);
    try {
      const groupAllReadyExist = await group.findOne({ name: data.name });
      if (groupAllReadyExist) {
        return;
      }
      socket.join(data.name as any);
      await group.create(data);
    } catch (error) {
      console.log(error);
    }
    return socket.broadcast
      .to(`${data.name}`)
      .emit("groupCreate", { msg: "Group Created" });
  }
  async joinRoom(socket: Socket, data: any) {
    if (!data) {
      return;
    }
    const groupdetail = await group.findOne({ name: data.name });
    if (
      (groupdetail?.members?.length! < 2 && groupdetail?.status == "basic") ||
      (groupdetail?.members?.length! < 5 && groupdetail?.status == "classic") ||
      groupdetail?.status == "battle"
    ) {
      await group.findOneAndUpdate({
        name: data.name,
        $push: {
          members: { userID: data.id, role: data.role ,lat:data.lat, lon:data.long },
        },
      });
      socket.join(data.name as any);
      return socket.broadcast
        .to(`${data.name}`)
        .emit("joinRoom", `${data.name} join group`);
    } else {
    }
  }
  async leaveRoom(socket: Socket, data?: any) {
    if (!data) {
      return;
    }
    await group.findOneAndUpdate({
      _id: data.name,
      $pull: {
        members: { userID: data.id, role: data.role },
      },
    });
    socket.leave(data.name as any);
    return socket.broadcast
      .to(`${data.name}`)
      .emit("groupLeave", "Member leave group");
  }
  deleteRoom(socket: Socket, roomID: string) {
    if (roomID) {
      socket.leave(roomID);
    }
  }
}

export default Groups;
