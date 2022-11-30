import CommentContent from "@/features/core/feature-suggestion/comment/domain/value/CommentContent";
import { SuggestionCommentDTO } from "@/features/core/feature-suggestion/comment/query";
import { GeneratedId, Id, NoneId } from "@/features/shared/Id";
import { now } from "@/util/date";
import Exception from "@/util/exception/Exception";

class SuggestionComment<T extends Id = Id> {
  private readonly _id: T;
  private readonly _suggestionId: GeneratedId;
  private readonly _userId: GeneratedId;
  private readonly _content: CommentContent;
  private readonly _createdAt: Date;

  constructor(
    id: T,
    suggestionId: GeneratedId,
    userId: GeneratedId,
    content: CommentContent,
    createdAt: Date
  ) {
    this._id = id;
    this._suggestionId = suggestionId;
    this._userId = userId;
    this._content = content;
    this._createdAt = createdAt;
  }

  static create(
    suggestionId: GeneratedId,
    userId: GeneratedId,
    content: string
  ) {
    return new SuggestionComment(
      NoneId.instance,
      suggestionId,
      userId,
      CommentContent.validate(content),
      now()
    );
  }

  get id() {
    return this._id;
  }

  get suggestionId() {
    return this._suggestionId;
  }

  get userId() {
    return this._userId;
  }

  get content() {
    return this._content;
  }

  get createdAt() {
    return this._createdAt;
  }

  setId(id: GeneratedId) {
    return new SuggestionComment(
      id,
      this._suggestionId,
      this._userId,
      this._content,
      this._createdAt
    );
  }

  toDto(userName: string) {
    if (!this._id.isGenerated)
      throw new Exception("コメントのIDが設定されていません", 500);

    return new SuggestionCommentDTO({
      id: this._id.value,
      user: {
        id: this._userId.value,
        name: userName,
      },
      content: this._content.value,
      createdAt: this._createdAt,
    });
  }
}

export default SuggestionComment;
