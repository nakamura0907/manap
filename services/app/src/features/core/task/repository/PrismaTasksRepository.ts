import Task from "@/features/core/task/domain/model/Task";
import ITasksRepository from "@/features/core/task/domain/repository/ITasksRepository";
import TaskDescription from "@/features/core/task/domain/value/TaskDescription";
import TaskPriority from "@/features/core/task/domain/value/TaskPriority";
import TaskStatus from "@/features/core/task/domain/value/TaskStatus";
import TaskTitle from "@/features/core/task/domain/value/TaskTitle";
import { GeneratedId } from "@/features/shared/Id";
import {
  prisma,
  PrismaClientKnownRequestError,
} from "@/frameworks/database/prisma";
import Exception from "@/util/exception/Exception";

class PrismaTasksRepository implements ITasksRepository {
  async add(task: Task) {
    try {
      const result = await prisma.tasks.create({
        data: {
          project_id: task.projectId.value,
          title: task.title.value,
          description: task.description.value,
          status: task.status.value,
          due: task.due,
          priority: task.priority.value,
        },
      });

      const id = new GeneratedId(result.id);
      return task.setId(id);
    } catch (e) {
      throw new Exception("タスクの追加に失敗しました");
    }
  }

  async find(taskId: GeneratedId, projectId: GeneratedId) {
    try {
      const task = await prisma.tasks.findFirst({
        where: {
          id: taskId.value,
          project_id: projectId.value,
        },
      });
      if (!task) throw new Exception("タスクが見つかりません", 404);

      const title = new TaskTitle(task.title);
      const description = new TaskDescription(task.description);
      const status = new TaskStatus(task.status);
      const priority = new TaskPriority(task.priority);

      return new Task(
        taskId,
        projectId,
        title,
        description,
        status,
        task.due,
        priority
      );
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new Exception("タスクの取得に失敗しました");
      }
      throw e;
    }
  }

  async update(task: Task<GeneratedId>) {
    try {
      await prisma.tasks.update({
        where: {
          id: task.id.value,
        },
        data: {
          title: task.title.value,
          description: task.description.value,
          status: task.status.value,
          due: task.due,
          priority: task.priority.value,
        },
      });
    } catch (e) {
      throw new Exception("タスクの更新に失敗しました");
    }
  }

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
