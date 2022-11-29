import {
  projectMemberService,
  rolesRepository,
  suggestionsQueryService,
  suggestionsRepository,
} from "@/container";
import Suggestion from "@/features/core/feature-suggestion/suggestion/domain/model/Suggestion";
import SuggestionSerializer from "@/features/core/feature-suggestion/suggestion/Serializer";
import { GeneratedId } from "@/features/shared/Id";
import Exception from "@/util/exception/Exception";
import { checkPermission } from "@common/role";
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
  const serializer = new SuggestionSerializer();

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
        projectId,
        userId,
        title,
        description
      );
      const result = await suggestionsRepository.add(suggestion);

      // レスポンス
      res.status(200).send(serializer.add(result));
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
      const result = await suggestionsQueryService.fetchList(projectId);

      res.status(200).send({
        suggestions: result.suggestions,
      });
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
      const result = await suggestionsQueryService.fetchById(
        suggestionId,
        projectId
      );

      res.status(200).send(result.toObject);
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

      // 提案取得
      const currentSuggestion = await suggestionsRepository.find(
        suggestionId,
        projectId
      );

      // 権限確認
      const roleId = await rolesRepository.fetchRoleId(projectId, userId.value);
      if (
        !checkPermission(roleId, "feature-suggestion:update", {
          vendorApproval,
          clientApproval,
        })
      )
        throw new Exception("機能提案を更新する権限がありません", 403);

      // 提案バリデーション
      const suggestion = currentSuggestion.copyWith({
        title,
        description,
        status,
        vendorApproval,
        clientApproval,
      });

      // 提案更新
      await suggestionsRepository.update(suggestion);

      res.status(200).send(serializer.update(suggestion));
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
      await suggestionsRepository.remove(suggestionId, projectId);

      res.status(200).end();
    })().catch(next);
  };

  return { add, fetchList, fetchById, update, remove };
};

export default suggestionController;
