import fetch from "@lib/fetch";
import { Project } from "@features/project/types";

type CreateProjectRequest = Pick<Project, "name"> &
  Partial<Pick<Project, "description">>;

type CreateProjectResponse = Project;

export const createProject = async (project: CreateProjectRequest) => {
  return await fetch.post<CreateProjectResponse>(`/projects`, project);
};
