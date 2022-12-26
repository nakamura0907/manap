import ChatRoom from "@/features/core/chat/room/domain/model/ChatRoom";
import { GeneratedId, NoneId } from "@/features/shared/Id";

interface IChatsRoomsRepository {
  create(room: ChatRoom<NoneId>): Promise<ChatRoom<GeneratedId>>;
  find(
    projectId: GeneratedId,
    roomId: GeneratedId
  ): Promise<ChatRoom<GeneratedId>>;
  update(room: ChatRoom<GeneratedId>): Promise<void>;
  remove(roomId: GeneratedId): Promise<void>;
}

export default IChatsRoomsRepository;
