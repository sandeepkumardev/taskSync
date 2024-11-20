import { Server } from "socket.io";
import { rooms } from "../db";

export const destroyRoom = (io: Server, roomID: string) => {
  console.log(`Destroying room: ${roomID}`);
  delete rooms[roomID];
  io.to(roomID.toString()).emit("destroyRoom", roomID);
};
