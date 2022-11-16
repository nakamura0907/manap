import Member from "./Member";
import ProjectDetail from "./ProjectDetail";
import { GeneratedId, Id, NoneId } from "@/features/shared/Id";

class Project<T extends Id = Id> {
  private readonly _detail: ProjectDetail;
  private readonly _members: Member[];

  static MAX_MEMBERS = 30;

  constructor(detail: ProjectDetail<T>, members: Member<T>[]) {
    this._detail = detail;
    this._members = members;
  }

  static create(userId: GeneratedId, name: string, description: string) {
    const detail = ProjectDetail.create(name, description);
    const member = Member.ADMINISTRATOR(userId);

    return new Project<NoneId>(detail, [member]);
  }

  get detail() {
    return this._detail;
  }

  get members() {
    return this._members;
  }

  setId(id: GeneratedId) {
    const detail = this._detail.setId(id);
    const members = this._members.map((member) => member.setId(id));
    return new Project<GeneratedId>(detail, members);
  }

  isMemberExist(userId: GeneratedId) {
    return this._members.some((member) => member.userId.equals(userId));
  }

  isMemberFull() {
    return this._members.length >= Project.MAX_MEMBERS;
  }
}

export default Project;
