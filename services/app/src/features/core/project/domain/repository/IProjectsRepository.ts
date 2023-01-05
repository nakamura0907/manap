import Project from "../model/Project";
import ProjectDetail from "../model/ProjectDetail";
import { GeneratedId, NoneId } from "@/features/shared/Id";

interface IProjectsRepository {
  create(project: Project<NoneId>): Promise<Project<GeneratedId>>;
  find(projectId: GeneratedId): Promise<Project<GeneratedId>>;
  update(project: ProjectDetail<GeneratedId>): Promise<void>;
  remove(projectId: GeneratedId): Promise<void>;
}

export default IProjectsRepository;
