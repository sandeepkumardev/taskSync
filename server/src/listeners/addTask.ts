import { Server, Socket } from "socket.io";
import { rooms } from "../db";

export const addTask = (io: Server, socket: Socket, obj: any) => {
  try {
    const { roomID, task } = obj;
    if (!roomID || !task) {
      socket.emit("addTaskError", "Please provide Room number and task");
      return;
    }

    const newTask = { id: rooms[roomID].tasks.length + 1, task };
    rooms[roomID].tasks = [newTask, ...rooms[roomID].tasks];
    io.to(roomID.toString()).emit("newTask", newTask);
  } catch (error) {
    console.error("Error adding task:", error);
    socket.emit("addTaskError", "Failed to add task");
  }
};
