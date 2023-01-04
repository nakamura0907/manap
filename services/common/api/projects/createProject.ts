import { Project } from "./types";

export type CreateProjectRequest = Omit<Project, "id">;

export type CreateProjectResponse = Project;
