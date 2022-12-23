import fetch from "@lib/fetch";
import { Room } from "@features/chat/types";

export type FetchRoomListResponse = {
  rooms: Room[];
};

export const fetchRoomList = async (projectId: number) => {
  return await fetch.get<FetchRoomListResponse>(
    `/projects/${projectId}/chats/rooms`
  );
};
