import SuggestionDescription from "@/features/core/feature-suggestion/suggestion/domain/value/SuggestionDescription";
import SuggestionTitle from "@/features/core/feature-suggestion/suggestion/domain/value/SuggestionTitle";
import { GeneratedId, Id, NoneId } from "@/features/shared/Id";

type ModifyObjefct = {
  title?: string;
  description?: string;
  status?: boolean;
  vendorApproval?: boolean;
  clientApproval?: boolean;
};

class Suggestion<T extends Id = Id> {
  private readonly _id: T;
  private readonly _projectId: GeneratedId;
  private readonly _proposerId: GeneratedId;
  private readonly _title: SuggestionTitle;
  private readonly _description: SuggestionDescription;
  private readonly _status: boolean;
  private readonly _vendorApproval: boolean;
  private readonly _clientApproval: boolean;

  constructor(
    id: T,
    projectId: GeneratedId,
    proposerId: GeneratedId,
    title: SuggestionTitle,
    description: SuggestionDescription,
    status: boolean,
    vendorApproval: boolean,
    clientApproval: boolean
  ) {
    this._id = id;
    this._projectId = projectId;
    this._proposerId = proposerId;
    this._title = title;
    this._description = description;
    this._status = status;
    this._vendorApproval = vendorApproval;
    this._clientApproval = clientApproval;
  }

  static create(
    projectId: GeneratedId,
    proposerId: GeneratedId,
    title: string,
    description: string
  ) {
    const validatedTitle = SuggestionTitle.validate(title);
    const validatedDescription = SuggestionDescription.validate(description);

    return new Suggestion(
      NoneId.instance,
      projectId,
      proposerId,
      validatedTitle,
      validatedDescription,
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

  get title() {
    return this._title;
  }

  get description() {
    return this._description;
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
      this._status,
      this._vendorApproval,
      this._clientApproval
    );
  }

  copyWith(modifyObj: ModifyObjefct) {
    const title = modifyObj.title
      ? SuggestionTitle.validate(modifyObj.title)
      : this._title;
    const description = modifyObj.description
      ? SuggestionDescription.validate(modifyObj.description)
      : this._description;
    return new Suggestion(
      this.id,
      this.projectId,
      this.proposerId,
      title,
      description,
      modifyObj.status || this.status,
      modifyObj.vendorApproval || this.vendorApproval,
      modifyObj.clientApproval || this.clientApproval
    );
  }
}

export default Suggestion;
