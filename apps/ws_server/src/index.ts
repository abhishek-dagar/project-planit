import http from "http";
import SocketService from "./service/socket";

async function init() {
    const socketService = new SocketService();
  const server = http.createServer();
  const port = process.env.PORT || 3000;

  socketService.io.attach(server);

  server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
  socketService.initListeners();
}
init();

