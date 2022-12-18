import {
  projectMemberService,
  tasksQueryService,
  tasksRepository,
} from "@/container";
import Task from "@/features/core/task/domain/model/Task";
import { GeneratedId } from "@/features/shared/Id";
import Exception from "@/util/exception/Exception";
import { Request, Response, NextFunction } from "express";

type TaskController = {
  /**
   * 新規タスク作成
   */
  add: (req: Request, res: Response, next: NextFunction) => void;
  /**
   * プロジェクトIDからタスク一覧を取得
   */
  fetchList: (req: Request, res: Response, next: NextFunction) => void;
  /**
   * タスクIDからタスクを取得
   */
  fetchById: (req: Request, res: Response, next: NextFunction) => void;
  /**
   * タスクIDからタスクを更新
   */
  update: (req: Request, res: Response, next: NextFunction) => void;
  /**
   * タスクIDからタスクを削除
   */
  remove: (req: Request, res: Response, next: NextFunction) => void;
};

const taskController = (): TaskController => {
  const add = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const reqUserId = req.user?.id;
      const reqProjectId = req.params.projectId;

      const { title, description, status, due, priority } = req.body;

      // バリデーション
      if (!reqUserId) throw new Exception("認証に失敗しました", 401);

      const userId = new GeneratedId(reqUserId);
      const projectId = GeneratedId.validate(Number(reqProjectId) || -1);

      // 所属確認
      if (!(await projectMemberService.isExist(projectId, userId)))
        throw new Exception("プロジェクトに参加していません", 403);

      // 新規タスク作成
      const registerTask = Task.create(
        projectId,
        title,
        description,
        status,
        due,
        priority
      );
      const result = await tasksRepository.add(registerTask);

      res.status(200).send({
        id: result.id.value,
        title: result.title.value,
        description: result.description.value,
        status: result.status.value,
        due: result.due,
        priority: result.priority.value,
      });
    })().catch(next);
  };

  const fetchList = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const reqUserId = req.user?.id;
      const reqProjectId = req.params.projectId;

      // バリデーション
      if (!reqUserId) throw new Exception("認証に失敗しました", 401);

      const userId = new GeneratedId(reqUserId);
      const projectId = GeneratedId.validate(Number(reqProjectId) || -1);

      // 所属確認
      if (!(await projectMemberService.isExist(projectId, userId)))
        throw new Exception("プロジェクトに参加していません", 403);

      // タスク一覧取得
      const result = await tasksQueryService.fetchList(projectId);

      res.status(200).send({
        tasks: result.tasks,
      });
    })().catch(next);
  };

  const fetchById = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const reqUserId = req.user?.id;
      const reqProjectId = req.params.projectId;
      const reqTaskId = req.params.taskId;

      // バリデーション
      if (!reqUserId) throw new Exception("認証に失敗しました", 401);

      const userId = new GeneratedId(reqUserId);
      const projectId = GeneratedId.validate(Number(reqProjectId) || -1);
      const taskId = GeneratedId.validate(Number(reqTaskId) || -1);

      // 所属確認
      if (!(await projectMemberService.isExist(projectId, userId)))
        throw new Exception("プロジェクトに参加していません", 403);

      // タスク取得
      const result = await tasksQueryService.fetchById(projectId, taskId);

      res.status(200).send(result.toObject);
    })().catch(next);
  };

  const update = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const reqUserId = req.user?.id;
      const reqProjectId = req.params.projectId;
      const reqTaskId = req.params.taskId;

      const { title, description, status, due, priority } = req.body;

      // バリデーション
      if (!reqUserId) throw new Exception("認証に失敗しました", 401);

      const userId = new GeneratedId(reqUserId);
      const projectId = GeneratedId.validate(Number(reqProjectId) || -1);
      const taskId = GeneratedId.validate(Number(reqTaskId) || -1);

      console.log(projectId, taskId);
      console.log(title, description, status, due, priority);

      // 所属確認
      if (!(await projectMemberService.isExist(projectId, userId)))
        throw new Exception("プロジェクトに参加していません", 403);

      // タスク更新

      res.status(200).send({});
    })().catch(next);
  };

  const remove = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const reqUserId = req.user?.id;
      const reqProjectId = req.params.projectId;
      const reqTaskId = req.params.taskId;

      // バリデーション
      if (!reqUserId) throw new Exception("認証に失敗しました", 401);

      const userId = new GeneratedId(reqUserId);
      const projectId = GeneratedId.validate(Number(reqProjectId) || -1);
      const taskId = GeneratedId.validate(Number(reqTaskId) || -1);

      // 所属確認
      if (!(await projectMemberService.isExist(projectId, userId)))
        throw new Exception("プロジェクトに参加していません", 403);

      // タスク削除
      await tasksRepository.remove(projectId, taskId);

      res.status(200).end();
    })().catch(next);
  };

  return {
    add,
    fetchList,
    fetchById,
    update,
    remove,
  };
};

export default taskController;
