import {
  ChatRoomListDTO,
  ChatRoomDetailDTO,
} from "@/features/core/chat/room/query";
import { GeneratedId } from "@/features/shared/Id";

interface IChatsRoomsQueryService {
  fetchList(projectId: GeneratedId): Promise<ChatRoomListDTO>;
  fetchById(roomId: GeneratedId): Promise<ChatRoomDetailDTO>;
}

export default IChatsRoomsQueryService;
