import fetch from "@lib/fetch";
import { Task } from "@features/task";

type UpdateTaskRequest = Partial<Omit<Task, "id">>;

type UpdateTaskResponse = Task;

export const updateTask = async (
  projectId: number,
  taskId: number,
  task: UpdateTaskRequest
) => {
  return await fetch.put<UpdateTaskResponse>(
    `/projects/${projectId}/tasks/${taskId}`,
    task
  );
};
