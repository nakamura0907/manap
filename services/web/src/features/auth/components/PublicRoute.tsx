import React from "react";
import { authContext } from "@providers/auth";
import { useRouter } from "next/router";

type Props = React.PropsWithChildren & {};

const useAuth = () => React.useContext(authContext);
export const PublicRoute: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const auth = useAuth();

  if (auth) {
    router.push("/mypage");
    return <></>;
  } else {
    return <>{children}</>;
  }
};
