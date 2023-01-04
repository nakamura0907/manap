import fetch from "@lib/fetch";
import { SuggestionListItem } from "@features/feature-suggestion/types";

export type FetchSuggestionListResponse = {
  suggestions: SuggestionListItem[];
};

export const fetchSuggestionList = async (projectId: number) => {
  return await fetch.get<FetchSuggestionListResponse>(
    `/projects/${projectId}/feature-suggestions`
  );
};
