import { Socket } from "socket.io";
import { rooms } from "../db/index";
import { generateRoomNumber } from "../lib/utils";

export const createRoom = (socket: Socket) => {
  try {
    const roomNumber = generateRoomNumber();
    const newUserID = crypto.randomUUID();
    rooms[roomNumber] = { admin: { id: newUserID, socketID: socket.id }, tasks: [], users: [] };
    console.log(`Room created: ${roomNumber} by ${socket.id}`);
    socket.join(roomNumber.toString()); // Admin joins the room
    socket.emit("joinRoom", { ok: true, roomID: roomNumber, user: { id: newUserID } });
  } catch (error) {
    console.error("Error creating room:", error);
    socket.emit("joinRoom", { ok: false, error: "Failed to create room" });
  }
};
