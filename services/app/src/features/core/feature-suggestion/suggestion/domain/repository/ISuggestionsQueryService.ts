import {
  SuggestionDetailDTO,
  SuggestionListDTO,
} from "@/features/core/feature-suggestion/suggestion/query";
import { GeneratedId } from "@/features/shared/Id";

interface ISuggestionsQueryService {
  fetchList(projectId: GeneratedId): Promise<SuggestionListDTO>;
  fetchById(
    suggestionId: GeneratedId,
    projectId: GeneratedId
  ): Promise<SuggestionDetailDTO>;
}

export default ISuggestionsQueryService;
