import fetch from "@lib/fetch";
import { FetchProjectByIdResponse } from "@common/api/projects";

export const fetchById = async (id: number) => {
  return await fetch.get<FetchProjectByIdResponse>(`/projects/${id}`);
};
