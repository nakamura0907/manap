import {
  projectMemberService,
  suggestionsCommentsRepository,
} from "@/container";
import SuggestionComment from "@/features/core/feature-suggestion/comment/domain/model/SuggestionComment";
import { GeneratedId } from "@/features/shared/Id";
import Exception from "@/util/exception/Exception";
import { Request, Response, NextFunction } from "express";

type SuggestionCommentController = {
  /** 新規コメントを追加する */
  add: (req: Request, res: Response, next: NextFunction) => void;
  /** コメントの一覧を取得する */
  fetchList: (req: Request, res: Response, next: NextFunction) => void;
};

const suggestionCommentController = (): SuggestionCommentController => {
  const add = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const reqUserId = req.user?.id;
      const reqProjectId = req.params.projectId;
      const reqSuggestionId = req.params.suggestionId;

      const { content } = req.body;

      // バリデーション
      if (!reqUserId) throw new Exception("認証に失敗しました", 401);

      const userId = new GeneratedId(reqUserId);
      const projectId = GeneratedId.validate(Number(reqProjectId) || -1);
      const suggestionId = GeneratedId.validate(Number(reqSuggestionId) || -1);

      // 所属確認
      if (!(await projectMemberService.isExist(projectId, userId)))
        throw new Exception("プロジェクトに参加していません", 403);

      // コメントバリデーション
      const comment = SuggestionComment.create(suggestionId, userId, content);

      // 新規コメント追加
      const result = await suggestionsCommentsRepository.add(comment);

      res.status(200).send(result.toObject);
    })().catch(next);
  };

  const fetchList = (req: Request, res: Response, next: NextFunction) => {
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

      // コメント一覧取得
      const result = await suggestionsCommentsRepository.fetchList(
        suggestionId
      );

      res.status(200).send({
        comments: result.map((comment) => comment.toObject),
      });
    })().catch(next);
  };

  return {
    add,
    fetchList,
  };
};

export default suggestionCommentController;
