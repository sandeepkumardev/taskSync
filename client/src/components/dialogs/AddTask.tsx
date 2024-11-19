import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/enhanced-button";
import { Plus } from "lucide-react";
import { Socket } from "socket.io-client";
import { useState } from "react";

const AddTask = ({ socket, roomID }: { socket: Socket; roomID: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState("");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit("addTask", { roomNumber: roomID, task });
    setTask("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="gooeyLeft" className="h-7 p-2 rounded-lg" onClick={() => setIsOpen(true)}>
          Add task
          <Plus className="-me-1 ms-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div>
          <form onSubmit={handleAddTask} className="flex items-end flex-col gap-2">
            <input
              type="text"
              placeholder="Task Name"
              className="w-full p-1 px-2 border-2 rounded-md"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <input type="submit" value={"Add"} className="bg-primary text-primary-foreground p-1 px-2 rounded-md" />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTask;
