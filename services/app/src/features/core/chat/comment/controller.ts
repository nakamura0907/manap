type ChatCommentController = {
  /** コメントを追加する */
  add: () => Promise<void>;
  /** コメントの一覧を取得する */
  fetchList: () => Promise<void>;
};

const chatCommentController = (): ChatCommentController => {
  const add = async () => {
    return;
  };

  const fetchList = async () => {
    return;
  };

  return {
    add,
    fetchList,
  };
};

export default chatCommentController;
