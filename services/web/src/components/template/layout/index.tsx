import { useRouter } from "next/router";
import React from "react";

export const LayoutA: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <BaseLayout>{children}</BaseLayout>;
};

export const LayoutB: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      if (!router.isReady) return;
      const { projectId } = router.query;
      const projectIdNum = Number(projectId);
      if (
        projectId == undefined ||
        Array.isArray(projectId) ||
        Number.isNaN(projectIdNum)
      )
        throw Error("不正なプロジェクトIDです");

      // Providerから値（プロジェクト名・ロールなど）を取得する
      // もしprojectIdが異なっていたら処理を実行する

      console.log(`layout.tsx-projectId: ${projectIdNum}`);
    })().catch((error) => {
      console.log(error);
    });
  }, [router, router.query]);

  return <BaseLayout>{children}</BaseLayout>;
};

const BaseLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
};
