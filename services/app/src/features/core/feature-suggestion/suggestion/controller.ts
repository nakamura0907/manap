import {
  projectMemberService,
  rolesRepository,
  suggestionsRepository,
} from "@/container";
import Suggestion from "@/features/core/feature-suggestion/suggestion/domain/model/Suggestion";
import { GeneratedId } from "@/features/shared/Id";
import Exception from "@/util/exception/Exception";
import { Request, Response, NextFunction } from "express";

type SuggestionController = {
  /** 新規機能を提案する */
  add: (req: Request, res: Response, next: NextFunction) => void;
  /** 提案の一覧を取得する */
  fetchList: (req: Request, res: Response, next: NextFunction) => void;
  /** 提案の詳細を取得する */
  fetchById: (req: Request, res: Response, next: NextFunction) => void;
  /** 提案を更新する */
  update: (req: Request, res: Response, next: NextFunction) => void;
  /** 提案を削除する */
  remove: (req: Request, res: Response, next: NextFunction) => void;
};

const suggestionController = (): SuggestionController => {
  const add = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const reqUserId = req.user?.id;
      const reqProjectId = req.params.projectId;

      const { title, description } = req.body;

      // バリデーション
      if (!reqUserId) throw new Exception("認証に失敗しました", 401);

      const userId = new GeneratedId(reqUserId);
      const projectId = GeneratedId.validate(Number(reqProjectId) || -1);

      // 所属確認
      if (!(await projectMemberService.isExist(projectId, userId)))
        throw new Exception("プロジェクトに参加していません", 403);

      // 提案追加
      const suggestion = Suggestion.create(
        userId,
        projectId,
        title,
        description
      );
      const result = await suggestionsRepository.add(suggestion);

      // レスポンス
      res.status(200).send({
        id: result.id.value,
        projectId: result.projectId.value,
        proposerId: result.proposerId.value,
        title: result.title.value,
        description: result.description.value,
        status: result.status,
        vendorApproval: result.vendorApproval,
        clientApproval: result.clientApproval,
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

      // 提案一覧取得
      console.log(projectId);

      res.status(200).send({});
    })().catch(next);
  };

  const fetchById = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const reqUserId = req.user?.id;
      const reqProjectId = req.params.projectId;
      const reqSuggestionId = req.params.suggestionId;

      // バリデーション
      if (!reqUserId) throw new Exception("認証に失敗しました", 401);

      const userId = new GeneratedId(reqUserId);
      const projectId = GeneratedId.validate(Number(reqProjectId) || -1);
      const suggestionId = GeneratedId.validate(Number(reqSuggestionId) || -1);

      // 所属確認
      if (!(await projectMemberService.isExist(projectId, userId)))
        throw new Exception("プロジェクトに参加していません", 403);

      // 提案取得
      console.log("projectId", projectId);
      console.log("suggestionId", suggestionId);

      res.status(200).send({});
    })().catch(next);
  };

  const update = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const reqUserId = req.user?.id;
      const reqProjectId = req.params.projectId;
      const reqSuggestionId = req.params.suggestionId;

      const { title, description, status, vendorApproval, clientApproval } =
        req.body;

      // バリデーション
      if (!reqUserId) throw new Exception("認証に失敗しました", 401);

      const userId = new GeneratedId(reqUserId);
      const projectId = GeneratedId.validate(Number(reqProjectId) || -1);
      const suggestionId = GeneratedId.validate(Number(reqSuggestionId) || -1);

      // 所属確認
      if (!(await projectMemberService.isExist(projectId, userId)))
        throw new Exception("プロジェクトに参加していません", 403);

      // 権限確認
      const roleId = await rolesRepository.fetchRoleId(projectId, userId.value);
      console.log("roleId", roleId);

      // 提案取得

      // 提案バリデーション

      // 提案更新
      console.log("projectId", projectId);
      console.log("suggestionId", suggestionId);

      console.log(title, description, status, vendorApproval, clientApproval);

      res.status(200).send({});
    })().catch(next);
  };

  const remove = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const reqUserId = req.user?.id;
      const reqProjectId = req.params.projectId;
      const reqSuggestionId = req.params.suggestionId;

      // バリデーション
      if (!reqUserId) throw new Exception("認証に失敗しました", 401);

      const userId = new GeneratedId(reqUserId);
      const projectId = GeneratedId.validate(Number(reqProjectId) || -1);
      const suggestionId = GeneratedId.validate(Number(reqSuggestionId) || -1);

      // 所属確認
      if (!(await projectMemberService.isExist(projectId, userId)))
        throw new Exception("プロジェクトに参加していません", 403);

      // 提案削除
      await suggestionsRepository.remove(suggestionId);

      res.status(200).end();
    })().catch(next);
  };

  return { add, fetchList, fetchById, update, remove };
};

export default suggestionController;
