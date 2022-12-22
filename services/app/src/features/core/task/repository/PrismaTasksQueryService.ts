import ITasksQueryService from "@/features/core/task/domain/repository/ITasksQueryService";
import TaskPriority from "@/features/core/task/domain/value/TaskPriority";
import TaskStatus from "@/features/core/task/domain/value/TaskStatus";
import { TaskListDTO, TaskDetailDTO } from "@/features/core/task/query";
import { GeneratedId } from "@/features/shared/Id";
import { prisma } from "@/frameworks/database/prisma";
import Exception from "@/util/exception/Exception";

class PrismaTasksQueryService implements ITasksQueryService {
  async fetchList(projectId: GeneratedId) {
    try {
      const tasks = await prisma.tasks.findMany({
        where: {
          project_id: projectId.value,
        },
      });

      const collection = tasks.map((item) => {
        return {
          id: item.id,
          title: item.title,
          status: TaskStatus.getStatus(item.status),
        };
      });
      return new TaskListDTO(collection);
    } catch (e) {
      throw new Exception("タスク一覧の取得に失敗しました");
    }
  }

  async fetchById(projectId: GeneratedId, taskId: GeneratedId) {
    try {
      const task = await prisma.tasks.findFirst({
        where: {
          project_id: projectId.value,
          id: taskId.value,
        },
      });
      if (!task) {
        throw new Exception("タスクが見つかりません", 404);
      }

      return new TaskDetailDTO(
        task.id,
        task.title,
        task.description,
        TaskStatus.getStatus(task.status),
        task.due,
        TaskPriority.getPriority(task.priority)
      );
    } catch (e) {
      console.log(e);
      if (e instanceof Exception) {
        throw e;
      }
      throw new Exception("タスクの取得に失敗しました");
    }
  }
}

export default PrismaTasksQueryService;
