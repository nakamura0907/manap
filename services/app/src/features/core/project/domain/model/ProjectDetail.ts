import ProjectDescription from "../value/ProjectDescription";
import ProjectName from "../value/ProjectName";
import { GeneratedId, Id, NoneId } from "@/features/shared/Id";

type ModifyObjefct = {
  name?: string;
  description?: string;
};

class ProjectDetail<T extends Id = Id> {
  private readonly _id: T;
  private readonly _name: ProjectName;
  private readonly _description: ProjectDescription;

  constructor(id: T, name: ProjectName, description: ProjectDescription) {
    this._id = id;
    this._name = name;
    this._description = description;
  }

  static create(name: string, description: string) {
    return new ProjectDetail(
      NoneId.instance,
      ProjectName.create(name),
      ProjectDescription.create(description)
    );
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

  setId(id: GeneratedId) {
    return new ProjectDetail(id, this._name, this._description);
  }

  copyWith(modifyObjefct: ModifyObjefct) {
    const name = modifyObjefct.name
      ? ProjectName.create(modifyObjefct.name)
      : this._name;
    const description = modifyObjefct.description
      ? ProjectDescription.create(modifyObjefct.description)
      : this._description;

    return new ProjectDetail(this._id, name, description);
  }
}

export default ProjectDetail;
