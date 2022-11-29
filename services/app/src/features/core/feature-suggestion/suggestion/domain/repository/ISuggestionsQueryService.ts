import { SuggestionListDTO } from "@/features/core/feature-suggestion/suggestion/query";
import { GeneratedId } from "@/features/shared/Id";

interface ISuggestionsQueryService {
  fetchList(projectId: GeneratedId): Promise<SuggestionListDTO>;
}

export default ISuggestionsQueryService;
