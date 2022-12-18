type Member = {
  userId: number;
  name: string;
  role: {
    id: number;
    name: string;
  };
};

/**
 * メンバー一覧参照用オブジェクト
 */
export class MemberListDTO {
  private readonly _members: Member[];

  constructor(members: Member[]) {
    this._members = members;

    Object.freeze(this);
  }

  get members() {
    return this._members;
  }
}
