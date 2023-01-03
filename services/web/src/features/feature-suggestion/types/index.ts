export type SuggestionListItem = {
  id: number;
  title: string;
  status: boolean;
  vendorApproval: boolean;
  clientApproval: boolean;
};

export type SuggestionDetail = {
  id: number;
  proposerId: number;
  title: string;
  description?: string;
  status: boolean;
  vendorApproval: boolean;
  clientApproval: boolean;
};
