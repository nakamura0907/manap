import SuggestionComment from "@/features/core/feature-suggestion/comment/domain/model/SuggestionComment";
import { SuggestionCommentDTO } from "@/features/core/feature-suggestion/comment/query";
import { GeneratedId, NoneId } from "@/features/shared/Id";

interface ISuggestionsCommentsRepository {
  add(comment: SuggestionComment<NoneId>): Promise<SuggestionCommentDTO>;
  fetchList(suggestionId: GeneratedId): Promise<SuggestionCommentDTO[]>;
}

export default ISuggestionsCommentsRepository;
