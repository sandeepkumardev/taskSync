require("dotenv").config({ path: ".env.local" });

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createRoom } from "./listeners/createRoom";
import { joinRoom } from "./listeners/joinRoom";
import { addTask } from "./listeners/addTask";
import { clearSeat } from "./listeners/clearSeat";
import { respondTask } from "./listeners/respondTask";
import { adminRejoin } from "./listeners/adminRejoin";
import { destroyRoom } from "./listeners/destroyRoom";
import { rooms } from "./db";
import { exitRoom } from "./listeners/exitRoom";

const app = express();
const server = createServer(app);

const PORT = process.env.PORT || 5500;

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Admin creates a room
  socket.on("createRoom", () => createRoom(socket));

  // Admin adds a task
  socket.on("addTask", (obj) => addTask(io, socket, obj));

  // Admin rejoin a room
  socket.on("adminRejoin", (obj) => adminRejoin(socket, obj));

  // User joins a room
  socket.on("joinRoom", (obj) => joinRoom(io, socket, obj));

  // User responds to a task
  socket.on("respondTask", (obj) => respondTask(io, socket, obj));

  // Admin clears a seat
  socket.on("clearSeat", (obj) => clearSeat(io, socket, obj));

  // Admin destroys a room
  socket.on("destroyRoom", (roomID) => destroyRoom(io, roomID));

  socket.on("exitRoom", (roomID) => exitRoom(io, socket, roomID));

  socket.on("disconnect", (roomID) => {
    console.log("A user disconnected:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.json(io.sockets.sockets.size);
});

server.listen(PORT, () => {
  console.log("Client url", process.env.CLIENT_URL);
  console.log(`Server is running on http://localhost:${PORT}`);
});
