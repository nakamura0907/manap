import { ProjectDTO } from "../../query";

interface IProjectsQueryService {
  fetchById(projectId: number): Promise<ProjectDTO>;
}

export default IProjectsQueryService;
