import { GeneratedId } from "@/features/shared/Id";

interface ITasksRepository {
  remove(projectId: GeneratedId, taskId: GeneratedId): Promise<void>;
}

export default ITasksRepository;
