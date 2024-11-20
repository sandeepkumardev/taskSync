export const rooms: {
  [key: string]: { admin: IAdmin; tasks: ITask[]; users: IUser[] };
} = {};

export interface IAdmin {
  id: string;
  socketID: string;
}

export interface ITask {
  id: number;
  task: string;
}

export interface IUser {
  id: string;
  socketID: string;
  name: string;
  seatNo: number;
  responses: IResponse[];
}

export interface IResponse {
  id: string;
  userID: string;
  taskID: string;
  status: "DONE" | "ISSUE";
}
