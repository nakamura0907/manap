import Exception from "@/util/exception/Exception";

type ProjectMemberRole = {
  userId: number;
  roleId: number;
};
export class ProjectMemberRoleList {
  private _roles: ProjectMemberRole[];

  constructor(roles: ProjectMemberRole[]) {
    this._roles = roles;

    Object.freeze(this);
  }

  get roles(): ProjectMemberRole[] {
    return this._roles;
  }

  getRole(userId: number) {
    const role = this._roles.find((r) => r.userId === userId);
    if (!role) throw new Exception("プロジェクトに参加していません", 403);
    return role.roleId;
  }
}
