import fetch from "@lib/fetch";

export const removeProject = async (id: number) => {
  return await fetch.delete(`/projects/${id}`);
};
