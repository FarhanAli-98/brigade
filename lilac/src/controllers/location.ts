import { Socket } from "socket.io";
import { locationService } from "../io";

const locationController = (socket: Socket) => {
  locationService.init(socket);

  socket.on("getSocket", (data: any) => {
    if (data && data.userID) {
      const userSocketID: string = locationService.getConnectedClient(
        data.userID
      )!;
      socket.emit("getSocket", userSocketID || "");
    }
  });

  socket.on("broadcastLocation", (data: any) => { 
      locationService.broadcastLocation(socket, data);
  });

  socket.on("disconnect", (data) => {
    console.log("A User disconnected from Location Namespace", socket.id);
  });
};

export default locationController;
