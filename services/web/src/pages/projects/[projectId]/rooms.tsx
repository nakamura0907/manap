import Button from "@components/ui/button";
import type { NextPage } from "next";

const Rooms: NextPage = () => {
  return (
    <div>
      <h1>掲示板</h1>
      <div>
        <Button>新しいルームの作成</Button>
      </div>
      <div>
        <h2>ルーム一覧</h2>
      </div>
    </div>
  );
};

export default Rooms;
