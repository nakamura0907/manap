import { Task } from "@features/task/types";
import fetch from "@lib/fetch";

type FetchTaskListResponse = {
  tasks: Pick<Task, "id" | "title" | "dueDate" | "priority" | "status">[];
};

export const fetchTaskList = async (projectId: number) => {
  return await fetch.get<FetchTaskListResponse>(`/projects/${projectId}/tasks`);
};
