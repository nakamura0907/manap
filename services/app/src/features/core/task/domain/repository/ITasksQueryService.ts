import { TaskDetailDTO, TaskListDTO } from "@/features/core/task/query";
import { GeneratedId } from "@/features/shared/Id";

interface ITasksQueryService {
  fetchList(projectId: GeneratedId): Promise<TaskListDTO>;
  fetchById(
    projectId: GeneratedId,
    taskId: GeneratedId
  ): Promise<TaskDetailDTO>;
}

export default ITasksQueryService;
