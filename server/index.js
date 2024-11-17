import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createRoom } from "./listeners/createRoom.js";
import { joinRoom } from "./listeners/joinRoom.js";

const app = express();
const server = createServer(app);

const PORT = process.env.PORT || 5500;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Admin creates a room
  socket.on("createRoom", () => createRoom(socket));

  // User joins a room
  socket.on("joinRoom", (obj) => joinRoom(socket, obj));

  // Admin clears a seat
  socket.on("clearSeat", (obj) => clearSeat(socket, obj));

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.json(io.sockets.sockets.size);
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
