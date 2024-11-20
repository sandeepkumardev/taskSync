import { Server, Socket } from "socket.io";
import { rooms } from "../db";

export const exitRoom = (io: Server, socket: Socket, roomID: string) => {
  if (!rooms[roomID]) return;
  const user = rooms[roomID].users.find((user) => user.socketID === socket.id);
  io.to(rooms[roomID].admin.socketID).emit("userDisconnected", `${user && user?.seatNo} has disconnected!`);
};
