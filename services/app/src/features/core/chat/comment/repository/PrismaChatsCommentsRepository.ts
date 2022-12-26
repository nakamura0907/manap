import Comment from "@/features/core/chat/comment/domain/model/Comment";
import IChatsCommentsRepository from "@/features/core/chat/comment/domain/repository/IChatsCommentsRepository";
import { CommentListDTO } from "@/features/core/chat/comment/query";
import { NoneId, GeneratedId } from "@/features/shared/Id";
import { prisma } from "@/frameworks/database/prisma";
import Exception from "@/util/exception/Exception";

class PrismaChatsCommentsRepository implements IChatsCommentsRepository {
  async add(comment: Comment<NoneId>) {
    try {
      const result = await prisma.chat_comments.create({
        data: {
          room_id: comment.roomId.value,
          user_id: comment.userId.value,
          body: comment.body.value,
          created_at: comment.createdAt,
        },
        include: {
          users: true,
        },
      });

      return {
        id: result.id,
        user: {
          id: result.users.id,
          nickname: result.users.nickname,
        },
        body: result.body,
        createdAt: result.created_at,
      };
    } catch (e) {
      console.log(e);
      throw new Exception("コメントの追加に失敗しました");
    }
  }

  async fetchList(roomId: GeneratedId) {
    try {
      const comments = await prisma.chat_comments.findMany({
        where: {
          room_id: roomId.value,
        },
        include: {
          users: true,
        },
      });

      const collection = comments.map((item) => {
        return {
          id: item.id,
          user: {
            id: item.users.id,
            nickname: item.users.nickname,
          },
          body: item.body,
          createdAt: item.created_at,
        };
      });
      return new CommentListDTO(collection);
    } catch (e) {
      console.log(e);
      throw new Exception("コメントの取得に失敗しました");
    }
  }
}

export default PrismaChatsCommentsRepository;
