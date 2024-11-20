import AddTask from "@/components/dialogs/AddTask";
import DataTable from "@/components/shared/DataTable";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/enhanced-button";
import { Separator } from "@/components/ui/separator";
import useSocket from "@/hooks/useSocket";
import { IResponse, IUser } from "@/types";
import { Link, LogOutIcon } from "lucide-react";

import { useEffect, useMemo, useState } from "react";
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
  const { isLoading, socketID, roomID, tasks } = useSocket(socket);
  const [users, setUsers] = useState<IUser[]>([]);
  const [usersResponse, setUsersResponse] = useState<IResponse[]>([]);

  const handleCreateRoom = () => {
    socket.emit("createRoom");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href + "room/" + roomID);
    toast("Link copied to clipboard!", { duration: 2000, closeButton: true });
  };

  const handleDestroyRoom = () => {
    socket.emit("destroyRoom", roomID);
  };

  useEffect(() => {
    socket.on("users", (data) => {
      setUsers(data);
      setUsersResponse(data.map((user: IUser) => user.responses).flat());
    });

    socket.on("userJoined", (user) => {
      setUsers((prev) => [...prev, user]);
    });

    socket.on("usersResponse", (responses) => {
      setUsersResponse(responses);
    });

    socket.on("addTaskError", (msg) => {
      toast(msg, { duration: 2000, closeButton: true });
    });

    socket.on("userDisconnected", (msg) => {
      toast(msg, { duration: 2000, closeButton: true });
    });
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <Header />

      {roomID ? (
        <div>
          <div className="p-2 flex justify-between">
            <div className="flex gap-2 items-center">
              <p className="text-sm font-semibold">
                {users.length} User{users.length > 1 && "s"}
              </p>

              <Button variant="gooeyLeft" className="h-7 p-2 rounded-lg" onClick={handleCopyLink}>
                Share
                <Link className="-me-1 ms-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
              </Button>
            </div>
            <div className="flex gap-2 items-center">
              <AddTask socket={socket} roomID={roomID} />
              <Button variant="destructive" className="h-7 p-2 rounded-lg" onClick={handleDestroyRoom}>
                Exit <LogOutIcon className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
          <Separator />
          <div>
            <div className="flex flex-col gap-2 w-full p-2">
              {(!!tasks.length || !!users.length) && (
                <DataTable socket={socket} users={users} tasks={tasks} usersResponse={usersResponse} />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-end h-full w-full min-w-[300px] mx-auto">
          <img src="/tasksync-bg.png" alt="TaskSync Logo" />
          <div className="absolute bottom-5">
            <Button className="rounded-lg  text-lg" variant={"ringHover"} onClick={handleCreateRoom} disabled={!socketID}>
              Create Room
            </Button>
            {isLoading && !socketID && <div>connecting...</div>}
            {!isLoading && !socketID && <div>Failed to connect!</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
