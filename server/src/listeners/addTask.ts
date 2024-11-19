import { Server, Socket } from "socket.io";
import { rooms } from "../db";

export const addTask = (io: Server, socket: Socket, obj: any) => {
  try {
    const { roomNumber, task } = obj;
    if (!roomNumber || !task) {
      socket.emit("taskResponse", { ok: false, error: "Please provide Room number and task" });
      return;
    }

    const newTask = { id: crypto.randomUUID(), task };
    rooms[roomNumber].tasks = [...rooms[roomNumber].tasks, newTask];
    socket.emit("taskResponse", { ok: true, roomNumber });
    io.to(roomNumber).emit("newTask", newTask);
  } catch (error) {
    console.error("Error adding task:", error);
    socket.emit("taskResponse", { ok: false, error: "Failed to add task" });
  }
};
