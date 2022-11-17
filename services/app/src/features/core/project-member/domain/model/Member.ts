import { GeneratedId } from "@/features/shared/Id";
import { Role } from "@common/role";

class Member {
  private readonly _projectId: GeneratedId;
  private readonly _userId: GeneratedId;
  private readonly _role: Role;

  constructor(projectId: GeneratedId, userId: GeneratedId, role: Role) {
    this._projectId = projectId;
    this._userId = userId;
    this._role = role;
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

  equals(member: Member) {
    return (
      this.projectId.equals(member.projectId) &&
      this.userId.equals(member.userId)
    );
  }
}

export default Member;
