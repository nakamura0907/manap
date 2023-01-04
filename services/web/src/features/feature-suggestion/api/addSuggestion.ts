import fetch from "@lib/fetch";
import {
  SuggestionListItem,
  SuggestionDetail,
} from "@features/feature-suggestion/types";

type AddSuggestionRequest = Pick<SuggestionDetail, "title" | "description">;

type AddSuggestionResponse = SuggestionListItem;

export const addSuggestion = async (
  projectId: number,
  suggestion: AddSuggestionRequest
) => {
  return await fetch.post<AddSuggestionResponse>(
    `/projects/${projectId}/feature-suggestions`,
    suggestion
  );
};
