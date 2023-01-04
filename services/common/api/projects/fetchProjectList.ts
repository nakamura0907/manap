import { Project } from "./types";

export type FetchProjectListQuery = {};

export type FetchProjectListResponse = {
  projects: Project[];
};
