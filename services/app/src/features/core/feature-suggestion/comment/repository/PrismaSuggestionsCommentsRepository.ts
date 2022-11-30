import SuggestionComment from "@/features/core/feature-suggestion/comment/domain/model/SuggestionComment";
import ISuggestionsCommentsRepository from "@/features/core/feature-suggestion/comment/domain/repository/ISuggestionsCommentsRepository";
import { SuggestionCommentDTO } from "@/features/core/feature-suggestion/comment/query";
import { GeneratedId, NoneId } from "@/features/shared/Id";
import { prisma } from "@/frameworks/database/prisma";
import Exception from "@/util/exception/Exception";

class PrismaSuggestionsCommentsRepository
  implements ISuggestionsCommentsRepository
{
  async add(comment: SuggestionComment<NoneId>) {
    try {
      const result = await prisma.feature_suggestions_comments.create({
        data: {
          suggestion_id: comment.suggestionId.value,
          user_id: comment.userId.value,
          content: comment.content.value,
          created_at: comment.createdAt,
        },
        include: {
          users: true,
        },
      });
      const id = new GeneratedId(result.id);
      const createdComment = comment.setId(id);

      return createdComment.toDto(result.users.nickname);
    } catch (e) {
      throw new Exception("コメントの追加に失敗しました");
    }
  }

  async fetchList(suggestionId: GeneratedId) {
    try {
      const result = await prisma.feature_suggestions_comments.findMany({
        where: {
          suggestion_id: suggestionId.value,
        },
        include: {
          users: true,
        },
        orderBy: {
          created_at: "desc",
        },
      });

      return result.map((comment) => {
        return new SuggestionCommentDTO({
          id: comment.id,
          user: {
            id: comment.user_id,
            name: comment.users.nickname,
          },
          content: comment.content,
          createdAt: comment.created_at,
        });
      });
    } catch (e) {
      throw new Exception("コメントの取得に失敗しました");
    }
  }
}

export default PrismaSuggestionsCommentsRepository;
