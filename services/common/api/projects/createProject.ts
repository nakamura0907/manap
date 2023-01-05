import { Project } from "./types";

export type CreateProjectRequest = Pick<Project, "name"> &
  Partial<Pick<Project, "description">>;

export type CreateProjectResponse = Project;
