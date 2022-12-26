import { Room } from "@features/chat/types";
import fetch from "@lib/fetch";

export type FetchRoomByIdResponse = Room;

export const fetchRoomById = async (projectId: number, roomId: number) => {
  return await fetch.get<FetchRoomByIdResponse>(
    `/projects/${projectId}/chats/rooms/${roomId}`
  );
};
