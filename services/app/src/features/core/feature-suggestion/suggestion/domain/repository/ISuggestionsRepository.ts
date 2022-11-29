import Suggestion from "@/features/core/feature-suggestion/suggestion/domain/model/Suggestion";
import { GeneratedId, NoneId } from "@/features/shared/Id";

interface ISuggestionsRepository {
  add(suggestion: Suggestion<NoneId>): Promise<Suggestion<GeneratedId>>;
  find(
    suggestionId: GeneratedId,
    projectId: GeneratedId
  ): Promise<Suggestion<GeneratedId>>;
  update(suggestion: Suggestion<GeneratedId>): Promise<void>;
  remove(suggestionId: GeneratedId, projectId: GeneratedId): Promise<void>;
}

export default ISuggestionsRepository;
