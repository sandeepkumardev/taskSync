import { Server, Socket } from "socket.io";
import { rooms } from "../db";

export const respondTask = (io: Server, socket: Socket, obj: any) => {
  try {
    const emitError = (message: string) => {
      socket.emit("taskResponse", { ok: false, error: message });
    };

    const { userID, roomID, taskID, status } = obj;
    if (!userID || !roomID || !taskID || !status) {
      emitError("Invalid request!");
      return;
    }

    const room = rooms[roomID];
    if (!room) {
      emitError("Room not found!");
      return;
    }

    const task = room.tasks.find((task) => task.id === taskID);
    if (!task) {
      emitError("Task not found!");
      return;
    }

    const user = room.users.find((user) => user.id === userID);
    if (!user) {
      emitError("User not found!");
      return;
    }

    let response = user.responses.find((response) => response.taskID === taskID);
    if (!response) {
      const newResponse = { id: crypto.randomUUID(), userID, taskID, status };
      user.responses.push(newResponse);
    } else {
      response.status = status;
    }

    socket.emit("taskResponse", { ok: true, data: user.responses });
    io.to(rooms[roomID.toString()].admin.socketID).emit(
      "usersResponse",
      rooms[roomID].users.map((user) => user.responses).flat()
    );
  } catch (error: any) {
    console.error("Error responding to task:", error.message, error.stack);
    socket.emit("taskResponse", { ok: false, error: "Failed to respond to task" });
  }
};
