import Link from "@components/ui/link";
import { fetchById } from "@features/project";
import { projectContext, setProjectContext } from "@providers/project";
import { useRouter } from "next/router";
import React from "react";

export const DefaultLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <BaseLayout>{children}</BaseLayout>;
};

const useProject = () => React.useContext(projectContext);
const useSetProject = () => React.useContext(setProjectContext);
export const ProjectPageLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const project = useProject();
  const setProject = useSetProject();
  const router = useRouter();

  const [projectId, setProjectId] = React.useState<number | undefined>(
    undefined
  );

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

      const prevProjectId = project?.id;
      if (projectIdNum != prevProjectId) {
        const result = await fetchById(projectIdNum);
        setProject({
          id: projectIdNum,
          roleId: result.data.roleId,
        });
      }

      setProjectId(projectIdNum);
    })().catch((error) => {
      console.log(`layout.tsx: ${error}`);
      router.push("/mypage");
    });
  }, [router, router.query]);

  if (!projectId) return <></>;

  console.log(`layout.tsx: projectId: ${projectId} roleId: ${project?.roleId}`);

  return (
    <div>
      <div>
        <p>Layout.tsx test link</p>
        <ul>
          <li>
            <Link href={`/projects/${projectId}`}>ダッシュボード</Link>
          </li>
          <li>
            <Link href={`/projects/${projectId}/tasks`}>タスクボード</Link>
          </li>
          <li>
            <Link href={`/projects/${projectId}/gantt_charts`}>
              ガントチャート
            </Link>
          </li>
          <li>
            <Link href={`/projects/${projectId}/rooms`}>掲示板</Link>
          </li>
        </ul>
      </div>
      <BaseLayout>{children}</BaseLayout>
    </div>
  );
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
