import Comment from "@/features/core/chat/comment/domain/model/Comment";
import {
  CommentListDTO,
  CommentListItem,
} from "@/features/core/chat/comment/query";
import { GeneratedId, NoneId } from "@/features/shared/Id";

interface IChatsCommentsRepository {
  add(comment: Comment<NoneId>): Promise<CommentListItem>;
  fetchList(roomId: GeneratedId): Promise<CommentListDTO>;
}

export default IChatsCommentsRepository;
