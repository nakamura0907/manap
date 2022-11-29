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
export class SuggestionDetailDTO {}
