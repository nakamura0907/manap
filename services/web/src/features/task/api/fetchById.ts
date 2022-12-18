import fetch from "@lib/fetch";
import { Task } from "@features/task";

type FetchTaskByIdResponse = Task;

export const fetchTaskById = async (projectId: number, taskId: number) => {
  return await fetch.get<FetchTaskByIdResponse>(
    `/projects/${projectId}/tasks/${taskId}`
  );
};
