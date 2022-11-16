import Exception from "@/util/exception/Exception";
import Project from "./domain/model/Project";
import ProjectDetail from "./domain/model/ProjectDetail";
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

  const update = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const reqProjectId = req.params.id;
      const userId = req.user?.id;
      const { name, description } = req.body;

      if (!userId) throw new Exception("認証に失敗しました", 401);

      // 権限確認
      const projectId = GeneratedId.validate(Number(reqProjectId) || -1);
      const roleId = await rolesRepository.fetchRoleId(projectId, userId);

      if (!checkPermission(roleId, "projects:update"))
        throw new Exception("プロジェクトを更新する権限がありません", 403);

      // プロジェクト更新
      const validatedProject = ProjectDetail.create(name, description);
      const project = validatedProject.setId(projectId);

      await projectsRepository.update(project);

      res.status(200).send({
        id: project.id.value,
        name: project.name.value,
        description: project.description.value,
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

      if (!checkPermission(roleId, "projects:remove"))
        throw new Exception("プロジェクトを削除する権限がありません", 403);

      // プロジェクト削除
      await projectsRepository.remove(projectId);

      res.status(200).end();
    })().catch(next);
  };

  return { create, fetchById, fetchList, update, remove };
};

export default projectController;
