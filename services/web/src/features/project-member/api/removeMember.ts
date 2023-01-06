import fetch from "@lib/fetch";

export const removeMember = async (projectId: number, targetUserId: number) => {
  return await fetch.delete(`/projects/${projectId}/members/${targetUserId}`);
};
