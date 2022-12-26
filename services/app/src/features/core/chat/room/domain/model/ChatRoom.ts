import RoomName from "@/features/core/chat/room/domain/value/RoomName";
import { GeneratedId, Id, NoneId } from "@/features/shared/Id";
import { now } from "@/util/date";

type ModifyObjefct = {
  name?: string;
};

class ChatRoom<T extends Id = Id> {
  private readonly _id: T;
  private readonly _projectId: GeneratedId;
  private readonly _name: RoomName;
  private readonly _createdAt: Date;

  constructor(id: T, projectId: GeneratedId, name: RoomName, createdAt: Date) {
    this._id = id;
    this._projectId = projectId;
    this._name = name;
    this._createdAt = createdAt;
  }

  static create(projectId: GeneratedId, name: string) {
    const validatedName = RoomName.validate(name);
    return new ChatRoom(NoneId.instance, projectId, validatedName, now());
  }

  get id() {
    return this._id;
  }

  get projectId() {
    return this._projectId;
  }

  get name() {
    return this._name;
  }

  get createdAt() {
    return this._createdAt;
  }

  setId(id: GeneratedId) {
    return new ChatRoom(id, this._projectId, this._name, this._createdAt);
  }

  copyWith(modifyObject: ModifyObjefct) {
    const name = modifyObject.name
      ? RoomName.validate(modifyObject.name)
      : this._name;

    return new ChatRoom(this._id, this._projectId, name, this._createdAt);
  }
}

export default ChatRoom;
