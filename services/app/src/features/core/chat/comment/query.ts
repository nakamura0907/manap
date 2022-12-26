export type CommentListItem = {
  id: number;
  user: {
    id: number;
    nickname: string;
  };
  body: string;
  createdAt: Date;
};

/**
 * コメント一覧参照用オブジェクト
 */
export class CommentListDTO {
  private readonly _comments: CommentListItem[];

  constructor(comments: CommentListItem[]) {
    this._comments = comments;

    Object.freeze(this);
  }

  get comments() {
    return this._comments;
  }
}
