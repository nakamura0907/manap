import fetch from "@lib/fetch";
import { Task } from "@features/task/types";

type AddTaskRequest = Omit<Task, "id">;

type AddTaskResponse = Task;

export const addTask = async (projectId: number, task: AddTaskRequest) => {
  return await fetch.post<AddTaskResponse>(
    `/projects/${projectId}/tasks`,
    task
  );
};
