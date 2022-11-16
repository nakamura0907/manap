import { GeneratedId } from "@/features/shared/Id";
import Member from "../value/Member";

class MemberList {
  private readonly _projectId: GeneratedId;
  private readonly _members: Member[];

  static MAX_MEMBERS = 30;

  constructor(projectId: GeneratedId, members: Member[]) {
    this._projectId = projectId;
    this._members = members;
  }

  get projectId(): GeneratedId {
    return this._projectId;
  }

  get members(): Member[] {
    return this._members;
  }

  isMemberExist(userId: GeneratedId) {
    return this._members.some((member) => member.equals(userId));
  }

  isMemberFull() {
    return this._members.length >= MemberList.MAX_MEMBERS;
  }
}

export default MemberList;
