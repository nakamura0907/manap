import ISuggestionsQueryService from "@/features/core/feature-suggestion/suggestion/domain/repository/ISuggestionsQueryService";
import {
  SuggestionListDTO,
  SuggestionDetailDTO,
} from "@/features/core/feature-suggestion/suggestion/query";
import { GeneratedId } from "@/features/shared/Id";
import {
  prisma,
  PrismaClientKnownRequestError,
} from "@/frameworks/database/prisma";
import Exception from "@/util/exception/Exception";

class PrismaSuggestionsQueryService implements ISuggestionsQueryService {
  async fetchList(projectId: GeneratedId) {
    try {
      const result = await prisma.feature_suggestions.findMany({
        where: {
          project_id: projectId.value,
        },
        orderBy: {
          id: "desc",
        },
      });

      const collection = result.map((item) => {
        return {
          id: item.id,
          title: item.title,
          status: item.status,
          vendorApproval: item.vendor_approval,
          clientApproval: item.client_approval,
        };
      });

      return new SuggestionListDTO(collection);
    } catch (e) {
      const exception = new Exception("提案一覧の取得に失敗しました");
      throw exception;
    }
  }

  async fetchById(suggestionId: GeneratedId, projectId: GeneratedId) {
    try {
      const result = await prisma.feature_suggestions.findFirst({
        where: {
          id: suggestionId.value,
          project_id: projectId.value,
        },
      });
      if (!result) {
        throw new Exception("提案が見つかりません", 404);
      }

      return new SuggestionDetailDTO(
        result.id,
        result.proposer_id,
        result.title,
        result.description,
        result.status,
        result.vendor_approval,
        result.client_approval
      );
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new Exception("提案の取得に失敗しました");
      }
      throw e;
    }
  }
}

export default PrismaSuggestionsQueryService;
