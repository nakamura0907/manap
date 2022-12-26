import CommentBody from "@/features/core/chat/comment/domain/value/CommentBody";
import { GeneratedId, Id, NoneId } from "@/features/shared/Id";
import { now } from "@/util/date";

class Comment<T extends Id = Id> {
  private readonly _id: T;
  private readonly _roomId: GeneratedId;
  private readonly _userId: GeneratedId;
  private readonly _body: CommentBody;
  private readonly _createdAt: Date;

  constructor(
    id: T,
    roomId: GeneratedId,
    userId: GeneratedId,
    body: CommentBody,
    createdAt: Date
  ) {
    this._id = id;
    this._roomId = roomId;
    this._userId = userId;
    this._body = body;
    this._createdAt = createdAt;
  }

  static create(roomId: GeneratedId, userId: GeneratedId, body: string) {
    const validatedBody = CommentBody.validate(body);
    return new Comment(NoneId.instance, roomId, userId, validatedBody, now());
  }

  get id() {
    return this._id;
  }

  get roomId() {
    return this._roomId;
  }

  get userId() {
    return this._userId;
  }

  get body() {
    return this._body;
  }

  get createdAt() {
    return this._createdAt;
  }

  setId(id: GeneratedId) {
    return new Comment(
      id,
      this._roomId,
      this._userId,
      this._body,
      this._createdAt
    );
  }
}

export default Comment;
