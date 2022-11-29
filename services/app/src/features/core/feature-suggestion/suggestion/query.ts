type SuggestionListItem = {
  id: number;
  title: string;
  status: boolean;
  vendorApproval: boolean;
  clientApproval: boolean;
};

/**
 * 機能提案一覧参照用オブジェクト
 */
export class SuggestionListDTO {
  private readonly _suggestions: SuggestionListItem[];

  constructor(suggestions: SuggestionListItem[]) {
    this._suggestions = suggestions;

    Object.freeze(this);
  }

  get suggestions(): SuggestionListItem[] {
    return this._suggestions;
  }
}

/**
 * 機能提案詳細参照用オブジェクト
 */
export class SuggestionDetailDTO {
  private readonly _id: number;
  private readonly _proposerId: number;
  private readonly _title: string;
  private readonly _description: string;
  private readonly _status: boolean;
  private readonly _vendorApproval: boolean;
  private readonly _clientApproval: boolean;

  constructor(
    id: number,
    proposerId: number,
    title: string,
    description: string,
    status: boolean,
    vendorApproval: boolean,
    clientApproval: boolean
  ) {
    this._id = id;
    this._proposerId = proposerId;
    this._title = title;
    this._description = description;
    this._status = status;
    this._vendorApproval = vendorApproval;
    this._clientApproval = clientApproval;

    Object.freeze(this);
  }

  get toObject() {
    return {
      id: this._id,
      proposerId: this._proposerId,
      title: this._title,
      description: this._description,
      status: this._status,
      vendorApproval: this._vendorApproval,
      clientApproval: this._clientApproval,
    };
  }
}
