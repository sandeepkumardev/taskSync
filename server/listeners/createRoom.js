import { rooms } from "../db/index.js";
import { generateRoomNumber } from "../lib/utils.js";

export const createRoom = (socket) => {
  try {
    const roomNumber = generateRoomNumber();
    rooms[roomNumber] = { admin: socket.id, tasks: {}, responses: {}, users: [] };
    socket.join(roomNumber); // Admin joins the room
    console.log(`Room created: ${roomNumber} by ${socket.id}`);
    socket.emit("roomResponse", { ok: true, roomNumber });
  } catch (error) {
    console.error("Error creating room:", error);
    socket.emit("roomResponse", { ok: false, error: "Failed to create room" });
  }
};
