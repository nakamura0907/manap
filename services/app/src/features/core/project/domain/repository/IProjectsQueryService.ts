import { ProjectDTO, ProjectListItemDTO } from "../../query";

interface IProjectsQueryService {
  fetchList(userId: number): Promise<ProjectListItemDTO[]>;
  fetchById(projectId: number, userId: number): Promise<ProjectDTO>;
}

export default IProjectsQueryService;
