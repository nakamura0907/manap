import Task from "@/features/core/task/domain/model/Task";
import { GeneratedId } from "@/features/shared/Id";

interface ITasksRepository {
  add(task: Task): Promise<Task<GeneratedId>>;
  remove(projectId: GeneratedId, taskId: GeneratedId): Promise<void>;
}

export default ITasksRepository;
