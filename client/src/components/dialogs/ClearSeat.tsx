import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/enhanced-button";
import { OctagonMinus } from "lucide-react";
import { Socket } from "socket.io-client";
import { useState } from "react";
import { IUser } from "@/types";

const ClearSeat = ({ socket, user }: { socket: Socket; user: IUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClearSeat = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit("clearSeat", { roomID: localStorage.getItem("roomID"), seatNo: user.seatNo });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <OctagonMinus className="text-red-500" size={16} strokeWidth={2} aria-hidden="true" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove user</DialogTitle>
          <DialogDescription className="text-black text-sm">
            Are you sure you want to remove seatno <b>{user.seatNo}</b> from the room?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-5">
          <Button variant={"destructive"} className="h-9 text-sm p-2 rounded-lg" onClick={handleClearSeat}>
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClearSeat;
