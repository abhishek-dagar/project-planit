import { Server } from "socket.io";

class SocketService {
  private _io: Server;
  private static onlineUsers: Map<any, any> = new Map();
  constructor() {
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
  }

  public initListeners() {
    const io = this._io;
    io.on("connection", (socket) => {
      console.log("new client connected", socket.id);
      socket.on("message", (data) => {
        io.emit("message", data);
      });
      socket.on("user-status", (data) => {
        io.emit("user-status", data);
      });
    });
  }
  get io() {
    return this._io;
  }
}

export default SocketService;
