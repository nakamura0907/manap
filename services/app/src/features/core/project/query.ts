type Member = {
  userId: number;
  name: string;
  role: {
    id: number;
    name: string;
  };
};
/**
 * プロジェクト詳細参照用オブジェクト
 */
export class ProjectDTO {
  private readonly _id: number;
  private readonly _name: string;
  private readonly _description: string;
  private readonly _members: Member[];

  constructor(
    id: number,
    name: string,
    description: string,
    members: Member[]
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._members = members;

    Object.freeze(this);
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get members(): Member[] {
    return this._members;
  }
}

/**
 * プロジェクト一覧参照用オブジェクト
 */
export class ProjectListItemDTO {
  private readonly _id: number;
  private readonly _name: string;
  private readonly _description: string;

  constructor(id: number, name: string, description: string) {
    this._id = id;
    this._name = name;
    this._description = description;

    Object.freeze(this);
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }
}
