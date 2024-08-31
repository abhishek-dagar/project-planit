import io from "socket.io-client";

export const socket = io(process.env.SERVER_URL || "http://localhost:3000", {
  transports: ["websocket"],
});
