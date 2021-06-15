import { Socket } from "socket.io";
import { ACCESS_SECRET } from "../config";
import jwt from 'jsonwebtoken';

class Namespace { 
  protected connectedClients;
  
  constructor() {
    this.connectedClients = new Map<string, string>();
  }

  protected setConnectedClients(newMap: Map<string, string>) {
    this.connectedClients = newMap;
  }

  protected disconnectAllConnectedClients() {
    this.setConnectedClients(new Map());
  }

  public getConnectedClients(): Map<string, string> {
    return this.connectedClients;
  }

  public getConnectedClient(userID: string) {
    return this.getConnectedClients().get(userID);
  }

  protected addConnectedClient(socket: Socket) {
    try {
      const token: string = socket.handshake.headers.authorization!.split(' ')[1];
      if (token) {
        const claims: any = jwt.verify(token, ACCESS_SECRET);
        const userAlreadyConnected = this.connectedClients.get(claims.id) ? true : false;
        if (userAlreadyConnected) {
          this.connectedClients.delete(claims.id);
        }
        this.connectedClients.set(claims.id, socket.id);
        console.log(this.connectedClients)
      }
    } catch (error) {
      console.log(error)
    }
  }
};

export default Namespace;