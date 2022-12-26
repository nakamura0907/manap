export type Room = {
  id: number;
  name: string;
};

export type ChatComment = {
  id: number;
  user: {
    id: number;
    nickname: string;
  };
  body: string;
  createdAt: string;
};
