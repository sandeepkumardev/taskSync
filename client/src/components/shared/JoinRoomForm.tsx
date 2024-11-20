import React, { useState } from "react";
import { Socket } from "socket.io-client";
import { Button } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const JoinRoomForm = ({
  socket,
  roomID,
  socketID,
  isLoading,
}: {
  socket: Socket;
  roomID: string;
  socketID: string;
  isLoading: boolean;
}) => {
  const [name, setName] = useState<string>("");
  const [roomId, setRoomId] = useState<string>(roomID);
  const [seatNo, setSeatNo] = useState<string>("");

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit("joinRoom", { roomID, name, seatNo });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-[400px] w-full p-3 min-w-[300px] mx-auto">
      <h1 className="text-2xl font-bold sr-only">Join Room</h1>

      <form className="flex flex-col w-full gap-2" onSubmit={handleJoinRoom}>
        <div className="mb-5">
          <img src="/logo.png" alt="logo" className="w-[100px] h-[100px] mx-auto" />
          <h1 className="text-2xl font-bold text-center">TaskSync</h1>
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between gap-1 w-full">
            <Label htmlFor="name" className="leading-6">
              Name
            </Label>
            <span className="text-sm text-muted-foreground">Optional</span>
          </div>
          <Input
            id="name"
            placeholder="Name (Optional)"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between gap-1 w-full">
            <Label htmlFor="roomNo" className="leading-6">
              Room ID
            </Label>
          </div>
          <Input
            id="roomNo"
            placeholder="Room ID"
            type="number"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between gap-1 w-full">
            <Label htmlFor="seatNo" className="leading-6">
              Seat No
            </Label>
          </div>
          <Input id="seatNo" placeholder="Seat No" type="text" value={seatNo} onChange={(e) => setSeatNo(e.target.value)} />
        </div>

        <Button type="submit" variant="gooeyRight" className="mt-4" disabled={!socketID}>
          Join
        </Button>
      </form>
      {isLoading && !socketID && <div>connecting...</div>}
      {!isLoading && !socketID && <div>Failed to connect to server!</div>}
    </div>
  );
};

export default JoinRoomForm;
