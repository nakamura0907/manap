import type { NextPage } from "next";
import Button from "@components/ui/button";
import Divider from "@components/ui/divider";
import React from "react";
import { PrivateRoute } from "@features/auth";

const ProjectSettings: NextPage = () => {
  return (
    <PrivateRoute>
      <h2>プロジェクト設定</h2>
      <Divider />
      <div>
        <h3>プロジェクトの削除</h3>
        <Button danger className="block ml-auto">
          プロジェクトを削除する
        </Button>
      </div>
    </PrivateRoute>
  );
};

export default ProjectSettings;
