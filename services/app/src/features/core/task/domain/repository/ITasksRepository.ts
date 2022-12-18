import Task from "@/features/core/task/domain/model/Task";
import { GeneratedId } from "@/features/shared/Id";

interface ITasksRepository {
  add(task: Task): Promise<Task<GeneratedId>>;
  find(projectId: GeneratedId, taskId: GeneratedId): Promise<Task<GeneratedId>>;
  update(task: Task<GeneratedId>): Promise<void>;
  remove(projectId: GeneratedId, taskId: GeneratedId): Promise<void>;
}

export default ITasksRepository;
