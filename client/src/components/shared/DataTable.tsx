import { IResponse, ITask, IUser } from "@/types";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const DataTable = ({ users, tasks, usersResponse }: { users: IUser[]; tasks: ITask[]; usersResponse: IResponse[] }) => {
  const getResponseStatus = (userId: string, taskId: string) => {
    const response = usersResponse.find((res) => res.userID === userId && res.taskID === taskId);
    return response ? response.status : "PENDING";
  };

  return (
    <div className="data-table">
      <table>
        <thead className="text-nowrap">
          <tr>
            <th className="text-left">User</th>
            {tasks.map((task) => (
              <th key={task.id}>
                <HoverCard openDelay={100} closeDelay={10}>
                  <HoverCardTrigger>{task.task}</HoverCardTrigger>
                  <HoverCardContent className="p-2 px-3 text-left">{task.task}</HoverCardContent>
                </HoverCard>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="!text-left px-1 min-w-[80px] max-w-[130px] truncate">
                <HoverCard openDelay={100} closeDelay={10}>
                  <HoverCardTrigger>
                    <span className="font-semibold">{user.seatNo}</span>
                    {user.name && `| ${user.name}`}
                  </HoverCardTrigger>
                  <HoverCardContent className="p-2 px-3 text-left">
                    <span className="font-semibold">{user.seatNo}</span>
                    {user.name && `| ${user.name}`}
                  </HoverCardContent>
                </HoverCard>
              </td>
              {tasks.map((task) => {
                const status = getResponseStatus(user.id, task.id);
                return (
                  <td
                    className={`${status === "PENDING" ? "bg-gray-50" : status === "ISSUE" ? "bg-red-200" : "bg-green-200"}`}
                    key={task.id}
                  >
                    <span className="text-xs font-semibold text-black">{status}</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
