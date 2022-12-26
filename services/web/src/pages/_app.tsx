import type { AppProps } from "next/app";
import {
  DefaultLayout,
  ProjectPageLayout,
} from "../components/template/layout";
import AppProvider from "../providers/app";

import "antd/dist/antd.css";
import "../styles/globals.css";

const Layout = ({ route, children }: { route: string; children: any }) => {
  if (route.startsWith("/projects/")) {
    return <ProjectPageLayout>{children}</ProjectPageLayout>;
  }
  return <DefaultLayout>{children}</DefaultLayout>;
};

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <AppProvider>
      <Layout route={router.route}>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

export default MyApp;
