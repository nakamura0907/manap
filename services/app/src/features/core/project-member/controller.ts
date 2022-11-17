import Exception from "@/util/exception/Exception";
import {
  projectsMembersQueryService,
  projectsMembersRepository,
  rolesRepository,
} from "@/container";
import { GeneratedId } from "@/features/shared/Id";
import { checkPermission } from "@common/role";
import { Request, Response, NextFunction } from "express";

type ProjectMemberController = {
  /**
   * プロジェクトにメンバーを追加
   */
  add: (req: Request, res: Response, next: NextFunction) => void;
  /**
   * プロジェクトメンバーの一覧を取得
   */
  fetchList: (req: Request, res: Response, next: NextFunction) => void;
  /**
   * プロジェクトメンバーの権限を更新
   */
  update: (req: Request, res: Response, next: NextFunction) => void;
  /**
   * プロジェクトメンバーを削除
   */
  remove: (req: Request, res: Response, next: NextFunction) => void;
};

const projectMemberController = (): ProjectMemberController => {
  const add = (req: Request, res: Response, next: NextFunction) => {};

  const fetchList = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const userId = req.user?.id;
      const reqProjectId = req.params.projectId;

      if (!userId) throw new Exception("認証に失敗しました", 401);

      // 権限確認
      const projectId = GeneratedId.validate(Number(reqProjectId) || -1);
      const roleId = await rolesRepository.fetchRoleId(projectId, userId);

      if (!checkPermission(roleId, "member:read"))
        throw new Exception("メンバー一覧を取得する権限がありません", 403);

      // プロジェクトメンバー一覧取得
      const result = await projectsMembersQueryService.fetchList(projectId);

      res.status(200).send({
        members: result.members,
      });
    })().catch(next);
  };

  const update = (req: Request, res: Response, next: NextFunction) => {};

  const remove = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const userId = req.user?.id;
      const reqProjectId = req.params.projectId;
      const reqTargetUserId = req.params.userId;

      // バリデーション

      if (!userId) throw new Exception("認証に失敗しました", 401);

      const targetUserId = GeneratedId.validate(Number(reqTargetUserId) || -1);
      const myUserId = new GeneratedId(userId);
      if (myUserId.equals(targetUserId))
        throw new Exception("自分を削除することはできません", 400);

      // 権限確認
      const projectId = GeneratedId.validate(Number(reqProjectId) || -1);

      const roles = await rolesRepository.fetchRoleList(projectId);
      const roleId = roles.getRole(userId);
      const targetRoleId = roles.getRole(targetUserId.value);

      if (!checkPermission(roleId, "member:remove", { targetRoleId }))
        throw new Exception("メンバーを削除する権限がありません", 403);

      // プロジェクトメンバー削除
      await projectsMembersRepository.remove(projectId, targetUserId);

      res.status(200).end();
    })().catch(next);
  };

  return { add, fetchList, update, remove };
};

export default projectMemberController;
