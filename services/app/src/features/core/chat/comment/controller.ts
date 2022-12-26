import { chatsCommentsRepository } from "@/container";
import Comment from "@/features/core/chat/comment/domain/model/Comment";
import {
  CommentListDTO,
  CommentListItem,
} from "@/features/core/chat/comment/query";
import { GeneratedId } from "@/features/shared/Id";

type ChatCommentController = {
  /** コメントを追加する */
  add: (
    roomId: string,
    userId: number,
    data: {
      body: string;
    }
  ) => Promise<CommentListItem>;
  /** コメントの一覧を取得する */
  fetchList: (roomId: string, userId: number) => Promise<CommentListDTO>;
};

const chatCommentController = (): ChatCommentController => {
  const add = async (
    roomId: string,
    userId: number,
    data: { body: string }
  ) => {
    // バリデーション
    const generatedRoomId = GeneratedId.validate(Number(roomId));
    const generatedUserId = GeneratedId.validate(userId);

    const comment = Comment.create(generatedRoomId, generatedUserId, data.body);

    // ルーム所属確認

    // コメント追加
    const result = await chatsCommentsRepository.add(comment);

    return result;
  };

  const fetchList = async (roomId: string, _: number) => {
    // バリデーション
    const generatedRoomId = GeneratedId.validate(Number(roomId));

    // ルーム所属確認

    // コメント一覧取得
    const result = await chatsCommentsRepository.fetchList(generatedRoomId);

    return result;
  };

  return {
    add,
    fetchList,
  };
};

export default chatCommentController;
