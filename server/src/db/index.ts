export const rooms: {
  [key: string]: { admin: string; tasks: ITask[]; responses: IResponse[]; users: IUser[] };
} = {};

interface ITask {
  id: string;
  task: string;
}

interface IResponse {
  id: string;
  taskId: string;
  response: "DONE" | "ISSUE";
}

interface IUser {
  id: string;
  name: string;
  seatNo: number;
}
