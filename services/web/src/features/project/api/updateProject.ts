import {
  UpdateProjectRequest,
  UpdateProjectResponse,
} from "@common/api/projects";
import fetch from "@lib/fetch";

export const updateProject = async (request: UpdateProjectRequest) => {
  const { query, body } = request;
  return fetch.put<UpdateProjectResponse>(`/projects/${query.projectId}`, body);
};
