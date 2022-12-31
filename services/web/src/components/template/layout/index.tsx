import Avatar from "@components/ui/avatar";
import Button from "@components/ui/button";
import Dropdown from "@components/ui/dropdown";
import Layout, { Content, Footer, Header, Sider } from "@components/ui/layout";
import Link from "@components/ui/link";
import Menu from "@components/ui/menu";
import React from "react";
import { authContext, setAuthContext } from "@providers/auth";
import { fetchById } from "@features/project";
import { projectContext, setProjectContext } from "@providers/project";
import { removeToken } from "@features/auth";
import { useRouter } from "next/router";
import { UserOutlined } from "@ant-design/icons";
import { checkPermission } from "@common/role";

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
        console.log(
          `layout.tsx: ${prevProjectId} -> ${projectIdNum} roleId: ${result.data.roleId}}`
        );
      }

      setProjectId(projectIdNum);
    })().catch((error) => {
      console.log(`layout.tsx: ${error}`);
      router.push("/mypage");
    });
  }, [router, router.query, project?.id, setProject]);

  if (!projectId) return <></>;

  return (
    <BaseLayout
      sider={
        <Sider>
          <Menu
            theme="dark"
            items={[
              {
                key: "ダッシュボード",
                label: (
                  <Link href={`/projects/${projectId}/`}>ダッシュボード</Link>
                ),
              },
              {
                key: "メンバー",
                label: (
                  <Link href={`/projects/${projectId}/members`}>メンバー</Link>
                ),
              },
              {
                key: "タスクボード",
                label: (
                  <Link href={`/projects/${projectId}/tasks`}>
                    タスクボード
                  </Link>
                ),
              },
              {
                key: "ガントチャート",
                label: (
                  <Link href={`/projects/${projectId}/gantt_charts`}>
                    ガントチャート
                  </Link>
                ),
              },
              {
                key: "機能提案",
                label: (
                  <Link href={`/projects/${projectId}/feature_suggestions`}>
                    機能提案
                  </Link>
                ),
              },
              {
                key: "掲示板",
                label: (
                  <Link href={`/projects/${projectId}/rooms`}>掲示板</Link>
                ),
              },
              checkPermission(project!.roleId, "project:remove") ||
              checkPermission(project!.roleId, "project:update")
                ? {
                    key: "設定",
                    label: (
                      <Link href={`/projects/${projectId}/settings`}>設定</Link>
                    ),
                  }
                : null,
            ]}
          />
        </Sider>
      }
    >
      {children}
    </BaseLayout>
  );
};

type BaseLayout = React.PropsWithChildren & {
  sider?: React.ReactNode;
};

const useAuth = () => React.useContext(authContext);
const useSetAuth = () => React.useContext(setAuthContext);
const BaseLayout: React.FC<BaseLayout> = ({ children, sider }) => {
  const auth = useAuth();
  const setAuth = useSetAuth();
  const router = useRouter();

  /**
   * ログアウトする
   */
  const handleLogout = () => {
    removeToken();
    setAuth(undefined);
    router.push("/");
  };

  return (
    <Layout className="min-h-screen" style={{ backgroundColor: "#F3F8FF" }}>
      {sider && <>{sider}</>}
      <Layout>
        <Header className="flex px-12 bg-white">
          <div className="mr-auto">
            <h1 className="text-2xl" style={{ lineHeight: "inherit" }}>
              <Link href="/" className="text-black font-bold">
                {process.env.APP_NAME}
              </Link>
            </h1>
          </div>
          {!auth ? (
            <Menu
              mode="horizontal"
              items={[
                {
                  key: "ログイン",
                  label: <Link href="/login">ログイン</Link>,
                },
                {
                  key: "アカウント作成",
                  label: <Link href="/signup">アカウント作成</Link>,
                },
              ]}
              className="w-auto"
            />
          ) : (
            <Dropdown
              menu={{
                items: [
                  {
                    key: "mypage",
                    label: <Link href="/mypage">マイページ</Link>,
                  },
                  {
                    type: "divider",
                  },
                  {
                    key: "ログアウト",
                    label: (
                      <Button
                        type="text"
                        onClick={handleLogout}
                        className="p-0"
                      >
                        ログアウト
                      </Button>
                    ),
                  },
                ],
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Avatar icon={<UserOutlined />} />
              </a>
            </Dropdown>
          )}
        </Header>
        <Content className="mx-12 my-14 p-10 bg-white">
          <div className="max-w-screen-lg mx-auto">{children}</div>
        </Content>
        <Footer className="text-center bg-inherit">
          &copy; All rights reserved.
        </Footer>
      </Layout>
    </Layout>
  );
};
