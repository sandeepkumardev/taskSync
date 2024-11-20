import { ITask } from "@/types";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { toast } from "sonner";

export const useSocket = (socket: Socket) => {
  const [isLoading, setIsLoading] = useState(true);
  const [socketID, setSocketID] = useState<string>("");
  const [roomID, setRoomID] = useState<string>("");
  const [user, setUser] = useState<{ id: string; seatNo?: string }>();
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    let attempts = 0;

    socket.on("connect", () => {
      const savedRoomID = localStorage.getItem("roomID");
      const savedUserID = localStorage.getItem("userID");
      if (savedRoomID && savedUserID) {
        socket.emit("adminRejoin", { roomID: savedRoomID, userID: savedUserID, socketID: socket.id });
        console.log(`Rejoined room: ${savedRoomID}`);
      }

      setSocketID(socket.id!!);
      setIsLoading(false);

      socket.on("joinRoom", (data) => {
        if (!data || !data.ok) {
          if (data.error) toast(data.error, { closeButton: true });
          localStorage.removeItem("roomID");
          localStorage.removeItem("userID");
          return;
        }

        setRoomID(data.roomID);
        setUser(data.user);
        localStorage.setItem("roomID", data.roomID);
        localStorage.setItem("userID", data.user.id);
      });

      socket.on("tasks", (tasks) => {
        setTasks(tasks);
      });

      socket.on("newTask", (task: ITask) => {
        setTasks((prev) => [task, ...prev]);
        toast("New task added!", { duration: 2000, closeButton: true });
      });

      socket.on("destroyRoom", () => {
        localStorage.removeItem("roomID");
        localStorage.removeItem("userID");
        socket.disconnect();
        toast("Room closed! Refreshing...", { duration: 2000, closeButton: true });
        setTimeout(() => window.location.reload(), 2000);
      });
    });

    socket.on("connect_error", () => {
      attempts++;

      if (attempts >= 3) {
        toast("Failed to connect!", {
          duration: 2000,
          description: "Please refresh the page or try again later.",
          action: {
            label: "Refresh",
            onClick: () => {
              window.location.reload();
            },
          },
          closeButton: true,
        });
        setIsLoading(false);
        socket.disconnect();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return {
    isLoading,
    socketID,
    roomID,
    user,
    tasks,
  };
};

export default useSocket;
