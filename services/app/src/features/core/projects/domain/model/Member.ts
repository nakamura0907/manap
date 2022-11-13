import { GeneratedId, Id, NoneId } from "@/features/shared/Id";
import { Role, ROLE_LIST } from "@common/role";

class Member<T extends Id = Id> {
  private readonly _projectId: T;
  private readonly _userId: GeneratedId;
  private readonly _role: Role;

  constructor(projectId: T, userId: GeneratedId, role: Role) {
    this._projectId = projectId;
    this._userId = userId;
    this._role = role;
  }

  static ADMINISTRATOR(userId: GeneratedId) {
    return new Member(NoneId.instance, userId, ROLE_LIST.ADMINISTRATOR);
  }

  get projectId() {
    return this._projectId;
  }

  get userId() {
    return this._userId;
  }

  get role() {
    return this._role;
  }
}

export default Member;
