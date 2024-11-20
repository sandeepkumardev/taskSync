import Header from "@/components/shared/Header";
import JoinRoomForm from "@/components/shared/JoinRoomForm";
import { Button } from "@/components/ui/enhanced-button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import useSocket from "@/hooks/useSocket";
import { CheckIcon, LogOutIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { IResponse, ITask } from "@/types";
import { toast } from "sonner";

const User = () => {
  const params = useParams();

  const socket = useMemo(
    () =>
      io(import.meta.env.VITE_SERVER_URL, {
        withCredentials: true,
      }),
    []
  );
  const { isLoading, socketID, user, tasks } = useSocket(socket);
  const [tasksResponse, setTasksResponse] = useState<IResponse[]>([]);

  useEffect(() => {
    socket.on("taskResponse", (res) => {
      if (!res || !res.ok) return toast(res.error || "Something went wrong!", { closeButton: true });
      setTasksResponse((res.data as IResponse[]) || []);
    });

    socket.on("removedFromRoom", (msg) => {
      localStorage.removeItem("roomID");
      localStorage.removeItem("userID");
      toast(msg, { duration: 2000, closeButton: true });
      setTimeout(() => window.location.reload(), 2000);
    });
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <Header />

      {user ? (
        <div className="mx-auto max-w-5xl w-full">
          <div className="p-2 flex justify-between">
            <div className="flex gap-2 items-center">
              <p className="text-sm font-semibold">Seat No: {user.seatNo}</p>
            </div>
            <div>
              <Button
                variant="destructive"
                className="h-7 p-2 rounded-lg"
                onClick={() => {
                  socket.emit("exitRoom", params.roomID!!);
                  socket.disconnect();
                  localStorage.removeItem("roomID");
                  localStorage.removeItem("userID");
                  window.location.reload();
                }}
              >
                Exit <LogOutIcon className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col gap-2 w-full p-2">
            {tasks.map((task, i) => (
              <div key={task.id} className="flex justify-between items-center gap-4 p-2 rounded-lg bg-muted/10 border-b">
                <TaskItem
                  socket={socket}
                  tasksResponse={tasksResponse}
                  task={task}
                  userID={user.id}
                  roomID={params.roomID!!}
                  i={i}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <JoinRoomForm socket={socket} roomID={params.roomID!!} socketID={socketID} isLoading={isLoading} />
      )}
    </div>
  );
};

const TaskItem = ({
  socket,
  task,
  tasksResponse,
  userID,
  roomID,
  i,
}: {
  socket: Socket;
  task: ITask;
  tasksResponse: IResponse[];
  userID: string;
  roomID: string;
  i: number;
}) => {
  const handleRespondTask = (status: string) => {
    socket.emit("respondTask", { userID, taskID: task.id, roomID, status });
  };

  const status = useMemo(() => {
    const response = tasksResponse.find((res) => res.taskID === task.id && res.userID === userID);
    return response ? response.status : "PENDING";
  }, [tasksResponse]);

  const doneCheckboxId = `checkbox-done-${task.id}`;
  const issueCheckboxId = `checkbox-issue-${task.id}`;

  return (
    <>
      <p className="text-sm font-semibold line-clamp-3">
        <span className="">[{i + 1}]</span> {task.task}
      </p>

      {status === "DONE" ? (
        <CheckIcon className="w-4 h-4 text-green-600" />
      ) : (
        <div className="flex flex-col gap-2 xs:flex-row sm:gap-5">
          <div className="flex items-center gap-1 text-green-600">
            <Checkbox
              id={doneCheckboxId}
              className="rounded"
              onClick={() => {
                handleRespondTask("DONE");
              }}
            />
            <Label htmlFor={doneCheckboxId}>Done</Label>
          </div>
          <div
            className="flex items-center gap-1 text-red-500"
            style={{ "--primary": "1 83.5% 66.7%" } as React.CSSProperties}
          >
            <Checkbox
              id={issueCheckboxId}
              className="rounded"
              onClick={() => {
                handleRespondTask("ISSUE");
              }}
              checked={status === "ISSUE"}
            />
            <Label htmlFor={issueCheckboxId}>Raise issue</Label>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
