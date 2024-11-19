import AddTask from "@/components/dialogs/AddTask";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/enhanced-button";
import { Separator } from "@/components/ui/separator";
import { useSocketConnect } from "@/hooks/useSocketConnect";
import { Link } from "lucide-react";

import { useMemo } from "react";
import { io } from "socket.io-client";
import { toast } from "sonner";

const Admin = () => {
  const socket = useMemo(
    () =>
      io("http://localhost:5500", {
        withCredentials: true,
      }),
    []
  );
  const { isLoading, socketID, roomID, tasks } = useSocketConnect(socket);

  const handleCreateRoom = () => {
    socket.emit("createRoom");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href + "room/" + roomID);
    toast("Link copied to clipboard!", { duration: 1000, closeButton: true });
  };

  console.log(tasks);

  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <Header />

      {roomID ? (
        <div>
          <div className="p-2 flex justify-between">
            <div className="flex gap-2 items-center">
              <p className="text-sm font-semibold">0 Users</p>

              <Button variant="gooeyLeft" className="h-7 p-2 rounded-lg" onClick={handleCopyLink}>
                Share
                <Link className="-me-1 ms-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
              </Button>
            </div>
            <div>
              <AddTask socket={socket} roomID={roomID} />
            </div>
          </div>
          <Separator />
          <div>
            <div className="flex flex-col gap-2 w-full p-2">
              {tasks.map((task, i) => (
                <div key={task.id} className="flex justify-between items-center p-2 rounded-lg bg-muted/10 border-b-2">
                  <p>
                    <span className="font-semibold">[{i + 1}]</span> {task.task}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
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
