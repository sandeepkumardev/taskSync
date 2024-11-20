export interface ITask {
  id: string;
  task: string;
  status: "DONE" | "ISSUE" | "PENDING";
}

export interface IUser {
  id: string;
  name: string;
  seatNo: string;
  responses?: IResponse[];
}

export interface IResponse {
  id: string;
  userID: string;
  taskID: string;
  status: "DONE" | "ISSUE";
}
