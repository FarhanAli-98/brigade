import { Socket } from "socket.io";
import { groupService } from "../io";

const GroupController = (socket: Socket) => {
  groupService.init(socket);

  socket.on("getSocket", (data: any) => {
    if (data && data.userID) {
      const userSocketID: string = groupService.getConnectedClient(
        data.userID
      )!;
      socket.emit("getSocket", userSocketID || "");
    }
  });

  socket.on("createGroup", (data: any) => { 
    groupService.createGroup(socket, data);
  });

  socket.on("joinRoom", (data:any) => {
    groupService.joinRoom(socket,data);
  });

  socket.on("disconnect", (data) => {
    console.log("A User disconnected from Group Namespace", socket.id);
  });
};

export default GroupController;
