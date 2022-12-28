import { Project } from "@features/project/types";
import fetch from "@lib/fetch";

export type FetchListResponse = {
  projects: Project[];
};

export const fetchList = async () => {
  return await fetch.get<FetchListResponse>("/projects");
};
