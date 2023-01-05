import { Project } from "./types";

type RequestBody = Partial<Omit<Project, "id">>;
export type UpdateProjectRequest = {
  query: {
    projectId: number;
  };
  body: RequestBody;
};

export type UpdateProjectResponse = Project;
