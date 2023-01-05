import Exception from "@/util/exception/Exception";
import Project from "./domain/model/Project";
import { Request, Response, NextFunction } from "express";
import { GeneratedId } from "@/features/shared/Id";
import {
  projectsQueryService,
  projectsRepository,
  rolesRepository,
} from "@/container";
import { checkPermission } from "@common/role";

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
  /**
   * プロジェクトIDからプロジェクトを更新
   */
  update: (req: Request, res: Response, next: NextFunction) => void;
  /**
   * プロジェクトIDからプロジェクトを削除
   */
  remove: (req: Request, res: Response, next: NextFunction) => void;
};

const projectController = (): ProjectController => {
  const create = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const userId = req.user?.id;
      const { name, description } = req.body;

      if (!userId) throw new Exception("認証に失敗しました", 401);

      // 新規プロジェクト作成
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

      // プロジェクト一覧取得
      const result = await projectsQueryService.fetchList(userId);

      res.status(200).send({
        projects: result.map((project) => ({
          id: project.id,
          name: project.name,
          description: project.description,
        })),
      });
    })().catch(next);
  };

  const fetchById = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const reqProjectId = req.params.id;
      const userId = req.user?.id;

      if (!userId) throw new Exception("認証に失敗しました", 401);

      // プロジェクト取得
      const projectId = GeneratedId.validate(Number(reqProjectId) || -1);
      const result = await projectsQueryService.fetchById(
        projectId.value,
        userId
      );

      res.status(200).send({
        id: result.id,
        name: result.name,
        description: result.description,
        roleId: result.roleId,
      });
    })().catch(next);
  };

  const update = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const reqProjectId = req.params.id;
      const userId = req.user?.id;
      const { name, description } = req.body;

      if (!userId) throw new Exception("認証に失敗しました", 401);

      // 権限確認
      const projectId = GeneratedId.validate(Number(reqProjectId) || -1);
      const roleId = await rolesRepository.fetchRoleId(projectId, userId);

      if (!checkPermission(roleId, "project:update"))
        throw new Exception("プロジェクトを更新する権限がありません", 403);

      // プロジェクト更新
      const currentProject = await projectsRepository.find(projectId);
      const updatedProject = currentProject.detail.copyWith({
        name,
        description,
      });

      await projectsRepository.update(updatedProject);

      res.status(200).send({
        id: updatedProject.id.value,
        name: updatedProject.name.value,
        description: updatedProject.description.value,
      });
    })().catch(next);
  };

  const remove = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const reqProjectId = req.params.id;
      const userId = req.user?.id;

      if (!userId) throw new Exception("認証に失敗しました", 401);

      // 権限確認
      const projectId = GeneratedId.validate(Number(reqProjectId) || -1);
      const roleId = await rolesRepository.fetchRoleId(projectId, userId);

      if (!checkPermission(roleId, "project:remove"))
        throw new Exception("プロジェクトを削除する権限がありません", 403);

      // プロジェクト削除
      await projectsRepository.remove(projectId);

      res.status(200).end();
    })().catch(next);
  };

  return { create, fetchById, fetchList, update, remove };
};

export default projectController;
