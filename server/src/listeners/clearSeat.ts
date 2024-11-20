import { Socket } from "socket.io";
import { rooms } from "../db";

export const clearSeat = (io: any, socket: Socket, obj: any) => {
  try {
    const { roomID, seatNo } = obj;
    if (!roomID || !seatNo) {
      return;
    }

    if (roomID in rooms) {
      const user = rooms[roomID].users.find((user) => user.seatNo === seatNo);
      if (user) {
        rooms[roomID].users = rooms[roomID].users.filter((user) => user.seatNo !== seatNo); // Remove user from the room

        const userSocket = io.sockets.sockets.get(user.socketID);
        userSocket.leave(roomID); // Remove user from the room
        console.log(`User ${user.socketID} removed from room: ${roomID}`);

        // Notify the removed user
        userSocket.emit("removedFromRoom", "You have been removed from the room");

        // udpate the admin list of users in the room
        io.to(rooms[roomID].admin.socketID).emit("users", rooms[roomID].users);
      }
    } else {
    }
  } catch (error) {
    console.error("Error clearing seat:", error);
  }
};
