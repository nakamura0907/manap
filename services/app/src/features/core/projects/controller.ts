import Exception from "@/util/exception/Exception";
import Project from "./domain/model/Project";
import { Request, Response, NextFunction } from "express";
import { GeneratedId } from "@/features/shared/Id";
import { projectsRepository } from "@/container";

type ProjectController = {
  /**
   * 新規プロジェクト作成
   */
  create: (req: Request, res: Response, next: NextFunction) => void;
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

  return { create };
};

export default projectController;
