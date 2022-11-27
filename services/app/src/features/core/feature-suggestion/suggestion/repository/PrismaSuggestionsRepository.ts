import Suggestion from "@/features/core/feature-suggestion/suggestion/domain/model/Suggestion";
import ISuggestionsRepository from "@/features/core/feature-suggestion/suggestion/domain/repository/ISuggestionsRepository";
import { GeneratedId } from "@/features/shared/Id";
import { prisma } from "@/frameworks/database/prisma";
import Exception from "@/util/exception/Exception";

class PrismaSuggestionsRepository implements ISuggestionsRepository {
  async add(suggestion: Suggestion) {
    try {
      const result = await prisma.feature_suggestions.create({
        data: {
          project_id: suggestion.projectId.value,
          proposer_id: suggestion.proposerId.value,
          title: suggestion.title.value,
          description: suggestion.description.value,
        },
      });
      const id = new GeneratedId(result.id);
      return suggestion.setId(id);
    } catch (e) {
      const exception = new Exception("機能提案の追加に失敗しました");
      if (e instanceof Error) exception.setOriginalError(e);
      throw exception;
    }
  }
}

export default PrismaSuggestionsRepository;
