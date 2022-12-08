import Button from "@components/ui/button";
import type { NextPage } from "next";

const Tasks: NextPage = () => {
  return (
    <div>
      <h1>タスクボード</h1>
      <div>
        <div>
          <p>タスクを追加するモーダルを表示するボタン</p>
          <Button>新しいタスクの追加</Button>
        </div>
        {/* <div>オプション</div> */}
      </div>
      <div>タスク一覧</div>
    </div>
  );
};

export default Tasks;
