import { Member } from "@features/project-member/types";
import fetch from "@lib/fetch";

export type FetchMemberListResponse = {
  members: Member[];
};

export const fetchMemberList = async (projectId: number) => {
  return await fetch.get<FetchMemberListResponse>(
    `/projects/${projectId}/members`
  );
};
