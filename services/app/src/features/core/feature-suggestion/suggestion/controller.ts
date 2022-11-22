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
      const userId = req.user?.id;
      const reqProjectId = req.params.projectId;

      const { title, description, deadline } = req.body;

      // バリデーション
      if (!userId) throw new Exception("認証に失敗しました", 401);

      const projectId = GeneratedId.validate(Number(reqProjectId) || -1);

      // 提案の追加
      const suggestion = Suggestion.create(
        new GeneratedId(userId),
        projectId,
        title,
        description,
        deadline
      );
      console.log(suggestion);

      // レスポンス
      res.status(200).send({});
    })().catch(next);
  };

  const fetchList = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      res.status(200).send({});
    })().catch(next);
  };

  const fetchById = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      res.status(200).send({});
    })().catch(next);
  };

  const update = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      // 権限確認

      // 提案の取得

      // 提案のバリデーション

      // 提案の更新

      res.status(200).send({});
    })().catch(next);
  };

  const remove = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      res.status(200).end();
    })().catch(next);
  };

  return { add, fetchList, fetchById, update, remove };
};

export default suggestionController;
