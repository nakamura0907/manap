import ISuggestionsQueryService from "@/features/core/feature-suggestion/suggestion/domain/repository/ISuggestionsQueryService";
import { SuggestionListDTO } from "@/features/core/feature-suggestion/suggestion/query";
import { GeneratedId } from "@/features/shared/Id";
import { prisma } from "@/frameworks/database/prisma";
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
      if (e instanceof Error) exception.setOriginalError(e);
      throw exception;
    }
  }
}

export default PrismaSuggestionsQueryService;
