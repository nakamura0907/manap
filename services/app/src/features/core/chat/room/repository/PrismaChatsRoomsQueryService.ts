import IChatsRoomsQueryService from "@/features/core/chat/room/domain/repository/IChatsRoomsQueryService";
import {
  ChatRoomDetailDTO,
  ChatRoomListDTO,
} from "@/features/core/chat/room/query";
import { GeneratedId } from "@/features/shared/Id";
import { prisma } from "@/frameworks/database/prisma";
import Exception from "@/util/exception/Exception";

class PrismaChatsRoomsQueryService implements IChatsRoomsQueryService {
  async fetchList(projectId: GeneratedId) {
    try {
      const rooms = await prisma.chat_rooms.findMany({
        where: {
          project_id: projectId.value,
        },
      });

      const collection = rooms.map((item) => {
        return {
          id: item.id,
          name: item.name,
        };
      });
      return new ChatRoomListDTO(collection);
    } catch (e) {
      console.log(e);
      throw new Exception("チャットルームの取得に失敗しました");
    }
  }

  async fetchById(roomId: GeneratedId) {
    try {
      const room = await prisma.chat_rooms.findFirst({
        where: {
          id: roomId.value,
        },
      });
      if (!room) {
        throw new Exception("チャットルームが見つかりません", 404);
      }

      return new ChatRoomDetailDTO(room.id, room.name);
    } catch (e) {
      console.log(e);
      if (e instanceof Exception) {
        throw e;
      }
      throw new Exception("チャットルームの取得に失敗しました");
    }
  }
}

export default PrismaChatsRoomsQueryService;
