import ITasksRepository from "@/features/core/task/domain/repository/ITasksRepository";
import { GeneratedId } from "@/features/shared/Id";
import {
  prisma,
  PrismaClientKnownRequestError,
} from "@/frameworks/database/prisma";
import Exception from "@/util/exception/Exception";

class PrismaTasksRepository implements ITasksRepository {
  async remove(projectId: GeneratedId, taskId: GeneratedId) {
    try {
      const task = await prisma.tasks.findFirst({
        where: {
          id: taskId.value,
          project_id: projectId.value,
        },
      });
      if (!task) throw new Exception("タスクが見つかりません", 404);

      await prisma.tasks.delete({
        where: {
          id: task.id,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new Exception("タスクの削除に失敗しました");
      }
      throw e;
    }
  }
}

export default PrismaTasksRepository;
