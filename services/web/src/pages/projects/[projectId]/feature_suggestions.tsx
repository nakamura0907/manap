import Button from "@components/ui/button";
import { projectContext } from "@providers/project";
import type { NextPage } from "next";
import React from "react";

const useProject = () => React.useContext(projectContext);
const FeatureSuggestions: NextPage = () => {
  const project = useProject();

  return (
    <>
      <div>
        <h1>機能提案</h1>
        <div>
          <div>
            <Button>新しい機能提案の追加</Button>
          </div>
          {/* <div>オプション</div> */}
        </div>
        <div>
          <h2>機能提案一覧</h2>
        </div>
      </div>
    </>
  );
};
