import ProjectDetail from "./ProjectDetail";
import { GeneratedId, Id, NoneId } from "@/features/shared/Id";

class Project<T extends Id = Id> {
  private readonly _ownerId: GeneratedId;
  private readonly _detail: ProjectDetail<T>;

  constructor(ownerId: GeneratedId, detail: ProjectDetail<T>) {
    this._ownerId = ownerId;
    this._detail = detail;
  }

  static create(ownerId: GeneratedId, name: string, description: string) {
    const detail = ProjectDetail.create(name, description);

    return new Project<NoneId>(ownerId, detail);
  }

  get detail() {
    return this._detail;
  }

  get ownerId() {
    return this._ownerId;
  }

  setId(id: GeneratedId) {
    const detail = this._detail.setId(id);
    return new Project<GeneratedId>(this._ownerId, detail);
  }
}

export default Project;
