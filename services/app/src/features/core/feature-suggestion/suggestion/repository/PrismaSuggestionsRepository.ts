import Suggestion from "@/features/core/feature-suggestion/suggestion/domain/model/Suggestion";
import ISuggestionsRepository from "@/features/core/feature-suggestion/suggestion/domain/repository/ISuggestionsRepository";
import SuggestionDescription from "@/features/core/feature-suggestion/suggestion/domain/value/SuggestionDescription";
import SuggestionTitle from "@/features/core/feature-suggestion/suggestion/domain/value/SuggestionTitle";
import { GeneratedId } from "@/features/shared/Id";
import {
  prisma,
  PrismaClientKnownRequestError,
} from "@/frameworks/database/prisma";
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
      throw exception;
    }
  }

  async find(suggestionId: GeneratedId, projectId: GeneratedId) {
    try {
      const result = await prisma.feature_suggestions.findFirst({
        where: {
          id: suggestionId.value,
          project_id: projectId.value,
        },
      });
      if (!result) {
        throw new Exception("機能提案が見つかりません", 404);
      }

      const proposerId = new GeneratedId(result.proposer_id);
      const title = new SuggestionTitle(result.title);
      const description = new SuggestionDescription(result.description);

      return new Suggestion(
        suggestionId,
        projectId,
        proposerId,
        title,
        description,
        result.status,
        result.vendor_approval,
        result.client_approval
      );
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        const exception = new Exception("機能提案の取得に失敗しました");
        throw exception;
      }
      throw e;
    }
  }

  async update(suggestion: Suggestion<GeneratedId>) {
    try {
      await prisma.feature_suggestions.update({
        where: {
          id: suggestion.id.value,
        },
        data: {
          title: suggestion.title.value,
          description: suggestion.description.value,
          status: suggestion.status,
          vendor_approval: suggestion.vendorApproval,
          client_approval: suggestion.clientApproval,
        },
      });
    } catch (e) {
      throw new Exception("機能提案の更新に失敗しました");
    }
  }

  async remove(suggestionId: GeneratedId, projectId: GeneratedId) {
    try {
      const result = await prisma.feature_suggestions.findFirst({
        where: {
          id: suggestionId.value,
          project_id: projectId.value,
        },
      });
      if (!result) throw new Exception("機能提案が見つかりません", 404);

      await prisma.feature_suggestions.delete({
        where: {
          id: result.id,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        const exception = new Exception("機能提案の削除に失敗しました");
        throw exception;
      }
      throw e;
    }
  }
}

export default PrismaSuggestionsRepository;
