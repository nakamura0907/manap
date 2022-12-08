import fetch from "@lib/fetch";

export const removeTask = async (projectId: number, taskId: number) => {
  return await fetch.delete(`/projects/${projectId}/tasks/${taskId}`);
};
