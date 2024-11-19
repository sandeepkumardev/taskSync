import { Socket } from "socket.io";
import { rooms } from "../db";

export const clearSeat = (io: any, socket: Socket, obj: any) => {
  try {
    const { roomNo, seatNo } = obj;
    if (!roomNo || !seatNo) {
      socket.emit("roomResponse", { ok: false, error: "Please provide Room number and seat number" });
      return;
    }

    if (roomNo in rooms) {
      const user = rooms[roomNo].users.find((user) => user.seatNo === seatNo);
      if (user) {
        rooms[roomNo].users = rooms[roomNo].users.filter((user) => user.seatNo !== seatNo); // Remove user from the room

        const userSocket = io.sockets.sockets.get(user.id);
        userSocket.leave(roomNo); // Remove user from the room
        console.log(`User ${user.id} removed from room: ${roomNo}`);

        // Notify the removed user
        userSocket.emit("removedFromRoom", { ok: true, message: "You have been removed from the room" });
      }

      socket.emit("roomResponse", { ok: true, message: "Seat cleared successfully" });
    } else {
      socket.emit("roomResponse", { ok: false, error: "Room not found" });
    }
  } catch (error) {
    console.error("Error clearing seat:", error);
    socket.emit("roomResponse", { ok: false, error: "Failed to clear seat" });
  }
};
