import fetch from "@lib/fetch";
import { Room } from "@features/chat/types";

type CreateRoomRequest = Omit<Room, "id">;

type CreateRoomResponse = Room;

export const createRoom = async (
  projectId: number,
  room: CreateRoomRequest
) => {
  return await fetch.post<CreateRoomResponse>(
    `/projects/${projectId}/chats/rooms`,
    room
  );
};
