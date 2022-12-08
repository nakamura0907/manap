import fetch from "@lib/fetch";

type Project = {
  id: number;
  name: string;
  description: string;
};

export type FetchListResponse = {
  projects: Project[];
};

export const fetchList = async () => {
  return await fetch.get<FetchListResponse>("/projects");
};
