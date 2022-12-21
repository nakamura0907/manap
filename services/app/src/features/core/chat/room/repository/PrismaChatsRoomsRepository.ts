import ChatRoom from "@/features/core/chat/room/domain/model/ChatRoom";
import IChatsRoomsRepository from "@/features/core/chat/room/domain/repository/IChatsRoomsRepository";
import RoomName from "@/features/core/chat/room/domain/value/RoomName";
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

  async find(projectId: GeneratedId, roomId: GeneratedId) {
    try {
      const room = await prisma.chat_rooms.findFirst({
        where: {
          id: roomId.value,
        },
      });
      if (!room) throw new Exception("チャットルームが見つかりません", 404);

      const name = new RoomName(room.name);

      return new ChatRoom(roomId, projectId, name, room.created_at);
    } catch (e) {
      console.log(e);
      throw new Exception("チャットルームの取得に失敗しました");
    }
  }

  async update(room: ChatRoom<GeneratedId>) {
    try {
      await prisma.chat_rooms.update({
        where: {
          id: room.id.value,
        },
        data: {
          name: room.name.value,
        },
      });
    } catch (e) {
      console.log(e);
      throw new Exception("チャットルームの更新に失敗しました");
    }
  }
}

export default PrismaChatsRoomsRepository;
