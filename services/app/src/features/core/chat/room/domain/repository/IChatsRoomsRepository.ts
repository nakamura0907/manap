import ChatRoom from "@/features/core/chat/room/domain/model/ChatRoom";
import { GeneratedId, NoneId } from "@/features/shared/Id";

interface IChatsRoomsRepository {
  create(room: ChatRoom<NoneId>): Promise<ChatRoom<GeneratedId>>;
}

export default IChatsRoomsRepository;
