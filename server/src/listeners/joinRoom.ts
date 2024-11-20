import { Server, Socket } from "socket.io";
import { rooms } from "../db/index";

export const joinRoom = (io: Server, socket: Socket, obj: any) => {
  try {
    const { roomID, name, seatNo } = obj;
    if (!roomID || !seatNo) {
      socket.emit("joinRoom", { ok: false, error: "Please provide Room number and seat number" });
      return;
    }

    if (roomID in rooms) {
      // find if seatno is already taken
      const isSeatTaken = rooms[roomID].users.some((user) => user.seatNo === seatNo);
      if (isSeatTaken) {
        socket.emit("joinRoom", { ok: false, error: "Seat number is already taken" });
        return;
      }

      const newUserID = crypto.randomUUID();
      rooms[roomID].users = [...rooms[roomID].users, { id: newUserID, socketID: socket.id, name, seatNo, responses: [] }]; // Add user to the room
      socket.join(roomID.toString()); // User joins the room

      socket.emit("joinRoom", { ok: true, roomID, user: { id: newUserID, seatNo } });
      socket.emit("tasks", rooms[roomID].tasks);
      io.to(rooms[roomID.toString()].admin.socketID).emit("userJoined", { id: newUserID, seatNo, name });
    } else {
      socket.emit("joinRoom", { ok: false, error: "Room not found" });
    }
  } catch (error) {
    console.error("Error joining room:", error);
    socket.emit("joinRoom", { ok: false, error: "Failed to join room" });
  }
};
