import fetch from "@lib/fetch";

type FetchByIdResponse = {
  id: number;
  /**
   * ログインユーザーの権限ID
   */
  roleId: number;
};

export const fetchById = async (id: number) => {
  return await fetch.get<FetchByIdResponse>(`/projects/${id}`);
};
