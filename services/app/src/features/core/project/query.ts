/**
 * プロジェクト詳細参照用オブジェクト
 */
export class ProjectDTO {
  private readonly _id: number;
  private readonly _name: string;
  private readonly _description: string;
  private readonly _roleId: number;

  constructor(id: number, name: string, description: string, roleId: number) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._roleId = roleId;

    Object.freeze(this);
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get roleId() {
    return this._roleId;
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

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }
}
