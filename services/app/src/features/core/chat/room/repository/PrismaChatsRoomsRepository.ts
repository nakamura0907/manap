import ChatRoom from "@/features/core/chat/room/domain/model/ChatRoom";
import IChatsRoomsRepository from "@/features/core/chat/room/domain/repository/IChatsRoomsRepository";
import { GeneratedId, NoneId } from "@/features/shared/Id";
import { prisma } from "@/frameworks/database/prisma";
import Exception from "@/util/exception/Exception";

class PrismaChatsRoomsRepository implements IChatsRoomsRepository {
  async create(room: ChatRoom<NoneId>) {
    try {
      const result = await prisma.chat_rooms.create({
        data: {
          project_id: room.projectId.value,
          name: room.name.value,
          created_at: room.createdAt,
        },
      });

      const id = new GeneratedId(result.id);
      return room.setId(id);
    } catch (e) {
      console.log(e);
      throw new Exception("チャットルームの追加に失敗しました");
    }
  }
}

export default PrismaChatsRoomsRepository;
