import fetch from "@lib/fetch";
import { SuggestionDetail } from "@features/feature-suggestion/types";

type FetchSuggestionById = SuggestionDetail;

export const fetchSuggestionById = async (
  projectId: number,
  suggestionId: number
) => {
  return await fetch.get<FetchSuggestionById>(
    `/projects/${projectId}/feature-suggestions/${suggestionId}`
  );
};
