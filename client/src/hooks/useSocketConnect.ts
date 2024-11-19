import { toast } from "sonner";
import { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { ITask } from "@/types";

export const useSocketConnect = (socket: Socket) => {
  const [isLoading, setIsLoading] = useState(true);
  const [socketID, setSocketID] = useState<string>("");
  const [roomID, setRoomID] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    let attempts = 0;

    socket.on("connect", () => {
      setSocketID(socket.id!!);
      setIsLoading(false);

      socket.on("roomResponse", (data) => {
        if (!data || !data.ok) {
          toast("Failed to create room!", { closeButton: true });
          return;
        }

        setRoomID(data.roomNumber);
      });

      socket.on("newTask", (task) => {
        setTasks((prev) => [...prev, task]);
        toast("New task added!", { duration: 1000, closeButton: true });
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
    tasks,
  };
};
