import Exception from "@/util/exception/Exception";
import Project from "./domain/model/Project";
import { Request, Response, NextFunction } from "express";
import { GeneratedId } from "@/features/shared/Id";
import { projectsQueryService, projectsRepository } from "@/container";

type ProjectController = {
  /**
   * 新規プロジェクト作成
   */
  create: (req: Request, res: Response, next: NextFunction) => void;
  /**
   * ログインユーザーが参加しているプロジェクト一覧を取得
   */
  fetchList: (req: Request, res: Response, next: NextFunction) => void;
  /**
   * プロジェクトIDからプロジェクトを取得
   */
  fetchById: (req: Request, res: Response, next: NextFunction) => void;
};

const projectController = (): ProjectController => {
  const create = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const { name, description } = req.body;
      const userId = req.user?.id;

      if (!userId) throw new Exception("認証に失敗しました", 401);

      const validatedProject = Project.create(
        new GeneratedId(userId),
        name,
        description
      );
      const result = await projectsRepository.create(validatedProject);

      res.status(200).send({
        id: result.detail.id.value,
        name: result.detail.name.value,
        description: result.detail.description.value,
      });
    })().catch(next);
  };

  const fetchList = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const userId = req.user?.id;

      if (!userId) throw new Exception("認証に失敗しました", 401);

      const result = await projectsQueryService.fetchList(userId);

      res.status(200).send({
        projects: result,
      });
    })().catch(next);
  };

  const fetchById = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const reqProjectId = req.params.id;
      const userId = req.user?.id;

      if (!userId) throw new Exception("認証に失敗しました", 401);

      const projectId = GeneratedId.validate(Number(reqProjectId) || -1);
      const result = await projectsQueryService.fetchById(projectId.value);
      if (!result.members.find((member) => member.userId === userId))
        throw new Exception("プロジェクトに参加していません", 403);

      res.status(200).send({
        id: result.id,
        name: result.name,
        description: result.description,
        members: result.members,
      });
    })().catch(next);
  };

  return { create, fetchById, fetchList };
};

export default projectController;
