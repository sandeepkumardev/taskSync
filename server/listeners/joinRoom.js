import { rooms } from "../db/index.js";

export const joinRoom = (socket, obj) => {
  try {
    const { roomNo, name, seatNo } = obj;
    if (!roomNo || !seatNo) {
      socket.emit("roomResponse", { ok: false, error: "Please provide Room number and seat number" });
      return;
    }

    if (roomNo in rooms) {
      // find if seatno is already taken
      const isSeatTaken = rooms[roomNo].users.some((user) => user.seatNo === seatNo);
      if (isSeatTaken) {
        socket.emit("roomResponse", { ok: false, error: "Seat number is already taken" });
        return;
      }

      rooms[roomNo].users = [...rooms[roomNo].users, { id: socket.id, name, seatNo }]; // Add user to the room
      socket.join(roomNo); // User joins the room

      socket.emit("roomResponse", { ok: true, data: obj });
      socket.emit("tasks", rooms[roomNo].tasks);
    } else {
      socket.emit("roomResponse", { ok: false, error: "Room not found" });
    }
  } catch (error) {
    console.error("Error joining room:", error);
    socket.emit("roomResponse", { ok: false, error: "Failed to join room" });
  }
};
