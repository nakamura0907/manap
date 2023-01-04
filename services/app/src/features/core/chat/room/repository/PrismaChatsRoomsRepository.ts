import ChatRoom from "@/features/core/chat/room/domain/model/ChatRoom";
import IChatsRoomsRepository from "@/features/core/chat/room/domain/repository/IChatsRoomsRepository";
import RoomName from "@/features/core/chat/room/domain/value/RoomName";
import { GeneratedId, NoneId } from "@/features/shared/Id";
import { prisma } from "@/frameworks/database/prisma";
import { now } from "@/util/date";
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
      await prisma.projects.update({
        where: {
          id: room.projectId.value,
        },
        data: {
          updated_at: now(),
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
          projects: {
            update: {
              updated_at: now(),
            },
          },
        },
      });
    } catch (e) {
      console.log(e);
      throw new Exception("チャットルームの更新に失敗しました");
    }
  }

  async remove(roomId: GeneratedId) {
    try {
      const room = await prisma.chat_rooms.findFirst({
        where: {
          id: roomId.value,
        },
      });
      if (!room) throw new Exception("チャットルームが見つかりません", 404);

      await prisma.chat_comments.deleteMany({
        where: {
          room_id: roomId.value,
        },
      });
      await prisma.chat_rooms.delete({
        where: {
          id: roomId.value,
        },
      });
      await prisma.projects.update({
        where: {
          id: room.project_id,
        },
        data: {
          updated_at: now(),
        },
      });
    } catch (e) {
      console.log(e);
      throw new Exception("チャットルームの削除に失敗しました");
    }
  }
}

export default PrismaChatsRoomsRepository;
