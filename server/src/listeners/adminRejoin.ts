import { Socket } from "socket.io";
import { IAdmin, IUser, rooms } from "../db";

export const adminRejoin = (socket: Socket, obj: any) => {
  try {
    const { roomID, userID, socketID } = obj;
    if (!roomID || !userID || !socketID) {
      socket.emit("joinRoom", { ok: false });
      return;
    }

    const room = rooms[roomID];
    if (!room) {
      socket.emit("joinRoom", { ok: false });
      return;
    }

    const user = room.admin.id === userID ? room.admin : room.users.find((user) => user.id === userID);
    if (!user) {
      socket.emit("joinRoom", { ok: false });
      return;
    }

    user.socketID = socketID;
    socket.join(roomID.toString());
    // @ts-ignore
    socket.emit("joinRoom", { ok: true, roomID, user: { id: user.id, seatNo: user.seatNo } });
    socket.emit("tasks", room.tasks);
    // @ts-ignore
    socket.emit("taskResponse", { ok: true, data: user.responses }); // Emit responses to the user
    socket.emit("users", room.users); // Emit users to the admin
  } catch (error) {
    console.error("Error rejoining room:", error);
    socket.emit("joinRoom", { ok: false });
  }
};
