import type { AppProps } from "next/app";
import { LayoutA, LayoutB } from "../components/template/layout";
import AppProvider from "../providers/app";

import "../styles/globals.css";

const Layout = ({ route, children }: { route: string; children: any }) => {
  if (route.startsWith("/projects/")) {
    return <LayoutB>{children}</LayoutB>;
  }
  return <LayoutA>{children}</LayoutA>;
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
