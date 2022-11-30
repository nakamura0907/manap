type SuggestionCommentItem = {
  id: number;
  user: {
    id: number;
    name: string;
  };
  content: string;
  createdAt: Date;
};

/**
 * 機能提案コメント追加用オブジェクト
 */
export class SuggestionCommentDTO {
  private readonly _value: SuggestionCommentItem;

  constructor(value: SuggestionCommentItem) {
    this._value = value;
    Object.freeze(this);
  }

  get toObject() {
    return {
      id: this._value.id,
      user: {
        id: this._value.user.id,
        name: this._value.user.name,
      },
      content: this._value.content,
      createdAt: this._value.createdAt,
    };
  }
}
