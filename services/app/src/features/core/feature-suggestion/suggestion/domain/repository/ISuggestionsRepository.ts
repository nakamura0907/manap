import Suggestion from "@/features/core/feature-suggestion/suggestion/domain/model/Suggestion";
import { GeneratedId, NoneId } from "@/features/shared/Id";

interface ISuggestionsRepository {
  add(suggestion: Suggestion<NoneId>): Promise<Suggestion<GeneratedId>>;
  remove(suggestionId: GeneratedId): Promise<void>;
}

export default ISuggestionsRepository;
