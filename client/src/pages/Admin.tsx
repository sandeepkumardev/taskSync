import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/enhanced-button";
import { useSocketConnect } from "@/hooks/useSocketConnect";

import { useMemo } from "react";
import { io } from "socket.io-client";

const Admin = () => {
  const socket = useMemo(
    () =>
      io("http://localhost:5500", {
        withCredentials: true,
      }),
    []
  );
  const { isLoading, socketID, roomID } = useSocketConnect(socket);

  const handleCreateRoom = () => {
    socket.emit("createRoom");
  };

  console.log(isLoading, socketID, roomID);

  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <Header />

      {roomID ? (
        <div>Room ID: {roomID}</div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full w-full min-w-[300px] mx-auto">
          <Button className="rounded-lg" variant={"ringHover"} onClick={handleCreateRoom} disabled={!socketID}>
            Create Room
          </Button>
          {isLoading && !socketID && <div>connecting...</div>}
          {!isLoading && !socketID && <div>Failed to connect!</div>}
        </div>
      )}
    </div>
  );
};

export default Admin;
