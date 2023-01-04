export type FetchProjectByIdQuery = {
  projectId: number;
};

export type FetchProjectByIdResponse = {
  id: number;
  /**
   * ログインユーザーの権限ID
   */
  roleId: number;
};
