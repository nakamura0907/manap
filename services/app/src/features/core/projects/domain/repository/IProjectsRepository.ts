import { GeneratedId, NoneId } from "@/features/shared/Id";
import Project from "../model/Project";

interface IProjectsRepository {
  create(project: Project<NoneId>): Promise<Project<GeneratedId>>;
}

export default IProjectsRepository;
