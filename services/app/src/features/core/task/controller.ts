import { projectMemberService, tasksRepository } from "@/container";
import { GeneratedId } from "@/features/shared/Id";
import Exception from "@/util/exception/Exception";
import { Request, Response, NextFunction } from "express";

type TaskController = {
  /**
   * 新規タスク作成
   */
  create: (req: Request, res: Response, next: NextFunction) => void;
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
  const create = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const reqUserId = req.user?.id;
      const reqProjectId = req.params.projectId;

      const { title, description, status, due, priority } = req.body;

      // バリデーション
      if (!reqUserId) throw new Exception("認証に失敗しました", 401);

      const userId = new GeneratedId(reqUserId);
      const projectId = GeneratedId.validate(Number(reqProjectId) || -1);

      console.log(projectId);
      console.log(title, description, status, due, priority);

      // 所属確認
      if (!(await projectMemberService.isExist(projectId, userId)))
        throw new Exception("プロジェクトに参加していません", 403);

      // 新規タスク作成

      res.status(200).send({});
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

      console.log(projectId);

      res.status(200).send({
        tasks: [],
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

      console.log(projectId, taskId);

      // 所属確認
      if (!(await projectMemberService.isExist(projectId, userId)))
        throw new Exception("プロジェクトに参加していません", 403);

      // タスク取得

      res.status(200).send({});
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
    create,
    fetchList,
    fetchById,
    update,
    remove,
  };
};

export default taskController;
