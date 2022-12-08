import Button from "@components/ui/button";
import type { NextPage } from "next";

const GanttCharts: NextPage = () => {
  return (
    <div>
      <h1>GanttCharts</h1>
      <div>
        <p>ガントチャートにタスクを追加するモーダルを表示するボタン</p>
        <Button>新規追加</Button>
      </div>
      <div>
        <p>ライブラリの補足説明をここに表示する</p>
      </div>
      <div>ガントチャートライブラリでガントチャート作成する</div>
      <p>タスクをガントチャート形式で表示する</p>
    </div>
  );
};

export default GanttCharts;
