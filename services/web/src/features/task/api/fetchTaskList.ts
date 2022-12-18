import { Task } from "@features/task/types";
import fetch from "@lib/fetch";

export type FetchTaskListResponse = {
  tasks: Pick<Task, "id" | "title" | "status">[];
};

export const fetchTaskList = async (projectId: number) => {
  return await fetch.get<FetchTaskListResponse>(`/projects/${projectId}/tasks`);
};
