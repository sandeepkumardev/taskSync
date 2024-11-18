import { toast } from "@/lib/utils";
import { Socket } from "socket.io-client";
import { useEffect, useState } from "react";

export const useSocketConnect = (socket: Socket) => {
  const [isLoading, setIsLoading] = useState(true);
  const [socketID, setSocketID] = useState<string>("");
  const [roomID, setRoomID] = useState<string>("");

  useEffect(() => {
    let attempts = 0;

    socket.on("connect", () => {
      setSocketID(socket.id!!);
      setIsLoading(false);

      socket.on("roomResponse", (data) => {
        if (!data || !data.ok) {
          toast("Failed to create room!", "error", 2000);
          return;
        }

        setRoomID(data.roomNumber);
      });
    });

    socket.on("connect_error", () => {
      attempts++;

      if (attempts >= 3) {
        toast("Failed to connect!", "error", 2000);
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
  };
};
