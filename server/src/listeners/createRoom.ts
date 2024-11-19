import { Socket } from "socket.io";
import { rooms } from "../db/index";
import { generateRoomNumber } from "../lib/utils";

export const createRoom = (socket: Socket) => {
  try {
    const roomNumber = generateRoomNumber();
    rooms[roomNumber] = { admin: socket.id, tasks: [], responses: [], users: [] };
    console.log(`Room created: ${roomNumber} by ${socket.id}`);
    socket.join(roomNumber.toString()); // Admin joins the room
    socket.emit("roomResponse", { ok: true, roomNumber });
  } catch (error) {
    console.error("Error creating room:", error);
    socket.emit("roomResponse", { ok: false, error: "Failed to create room" });
  }
};
