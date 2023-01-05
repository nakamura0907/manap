export type FetchProjectByIdResponse = {
  id: number;
  name: string;
  description: string;
  /**
   * ログインユーザーの権限ID
   */
  roleId: number;
};
