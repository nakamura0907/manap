import { GeneratedId, Id, NoneId } from "@/features/shared/Id";

type ModifyObjefct = {
  title?: string;
  description?: string;
  deadline?: Date;
  status?: boolean;
  vendorApproval?: boolean;
  clientApproval?: boolean;
};

class Suggestion<T extends Id = Id> {
  private readonly _id: T;
  private readonly _projectId: GeneratedId;
  private readonly _proposerId: GeneratedId;
  private readonly _title: string;
  private readonly _description: string;
  private readonly _deadline: Date;
  private readonly _status: boolean;
  private readonly _vendorApproval: boolean;
  private readonly _clientApproval: boolean;

  constructor(
    id: T,
    projectId: GeneratedId,
    proposerId: GeneratedId,
    title: string,
    description: string,
    deadline: Date,
    status: boolean,
    vendorApproval: boolean,
    clientApproval: boolean
  ) {
    this._id = id;
    this._projectId = projectId;
    this._proposerId = proposerId;
    this._title = title;
    this._description = description;
    this._deadline = deadline;
    this._status = status;
    this._vendorApproval = vendorApproval;
    this._clientApproval = clientApproval;
  }

  static create(
    projectId: GeneratedId,
    proposerId: GeneratedId,
    title: string,
    description: string,
    deadline: Date
  ) {
    return new Suggestion(
      NoneId.instance,
      projectId,
      proposerId,
      title,
      description,
      deadline,
      false,
      false,
      false
    );
  }

  get id() {
    return this._id;
  }

  get projectId() {
    return this._projectId;
  }

  get proposerId() {
    return this._proposerId;
  }

  get description() {
    return this._description;
  }

  get deadline() {
    return this._deadline;
  }

  get status() {
    return this._status;
  }

  get vendorApproval() {
    return this._vendorApproval;
  }

  get clientApproval() {
    return this._clientApproval;
  }

  setId(id: GeneratedId) {
    return new Suggestion(
      id,
      this.projectId,
      this._proposerId,
      this._title,
      this._description,
      this._deadline,
      this._status,
      this._vendorApproval,
      this._clientApproval
    );
  }

  copyWith(modifyObj: ModifyObjefct) {
    return new Suggestion(
      this.id,
      this.projectId,
      this.proposerId,
      modifyObj.title || this._title,
      modifyObj.description || this.description,
      modifyObj.deadline || this.deadline,
      modifyObj.status || this.status,
      modifyObj.vendorApproval || this.vendorApproval,
      modifyObj.clientApproval || this.clientApproval
    );
  }
}

export default Suggestion;
