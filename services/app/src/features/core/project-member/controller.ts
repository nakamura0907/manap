import Exception from "@/util/exception/Exception";
import Member from "./domain/model/Member";
import {
  projectMemberService,
  projectsMembersQueryService,
  projectsMembersRepository,
  rolesRepository,
} from "@/container";
import { GeneratedId } from "@/features/shared/Id";
import { checkPermission, getRole, ROLE_LIST } from "@common/role";
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
  const add = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const userId = req.user?.id;
      const reqProjectId = req.params.projectId;

      const { roleId: reqTargetRoleId, userId: reqTargetUserId } = req.body;

      // バリデーション
      if (!userId) throw new Exception("認証に失敗しました", 401);

      const projectId = GeneratedId.validate(Number(reqProjectId) || -1);
      const targetUserId = GeneratedId.validate(Number(reqTargetUserId) || -1);

      const role = getRole(Number(reqTargetRoleId) || -1);
      if (!role)
        throw new Exception("追加するメンバーに付与する権限が不正です", 400);

      // 権限確認
      const myRoleId = await rolesRepository.fetchRoleId(projectId, userId);
      if (
        !checkPermission(myRoleId, "member:add", {
          targetRoleId: role.id,
        })
      )
        throw new Exception("メンバーを追加する権限がありません", 403);

      // 追加可能か確認
      // TODO: ユーザーが存在するか
      if (await projectMemberService.isExist(projectId, targetUserId))
        throw new Exception("すでにプロジェクトに参加しています", 400);
      if (await projectMemberService.isMaxMember(projectId))
        throw new Exception("メンバー数が上限に達しています", 400);

      // プロジェクトメンバーの追加
      const member = new Member(projectId, targetUserId, role);
      await projectsMembersRepository.add(member);

      res.status(200).send({
        userId: member.userId.value,
        role: {
          id: member.role.id,
          name: member.role.name,
        },
      });
    })().catch(next);
  };

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

  const update = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const userId = req.user?.id;
      const reqProjectId = req.params.projectId;
      const reqTargetUserId = req.params.userId;

      const { roleId: reqTargetRoleId } = req.body;

      // バリデーション
      if (!userId) throw new Exception("認証に失敗しました", 401);

      const projectId = GeneratedId.validate(Number(reqProjectId) || -1);
      const targetUserId = GeneratedId.validate(Number(reqTargetUserId) || -1);

      const role = getRole(Number(reqTargetRoleId) || -1);
      if (!role)
        throw new Exception("更新するメンバーに付与する権限が不正です", 400);

      // 権限確認
      const roleList = await rolesRepository.fetchRoleList(projectId);
      const myRoleId = roleList.getRole(userId);
      if (
        !checkPermission(myRoleId, "member:update", {
          targetRoleId: role.id,
        })
      )
        throw new Exception("メンバーを更新する権限がありません", 403);

      // 更新可能か確認
      if (!(await projectMemberService.isExist(projectId, targetUserId)))
        throw new Exception("プロジェクトに参加していません", 400);

      const currentRoleId = roleList.getRole(targetUserId.value);
      const currentRole = getRole(currentRoleId);
      if (!currentRole)
        throw new Exception(
          "更新するメンバーの権限が見つかりませんでした",
          404
        );
      if (currentRole === ROLE_LIST.ADMINISTRATOR) {
        throw new Exception("管理者を別の権限に変更することはできません", 400);
      }

      // プロジェクトメンバー権限更新
      const member = new Member(projectId, targetUserId, role);
      await projectsMembersRepository.update(member);

      res.status(200).send();
    })().catch(next);
  };

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
