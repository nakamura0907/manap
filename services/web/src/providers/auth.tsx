import { verifyToken } from "@features/auth";
import { parseCookies } from "@lib/cookie";
import { useRouter } from "next/router";
import React from "react";

type Auth = {
  token: string;
  userId: number;
};

type Context = {
  auth?: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth | undefined>>;
};

const initialContext: Context = {
  auth: undefined,
  setAuth: () => undefined,
};

export const authContext = React.createContext(initialContext.auth);
export const setAuthContext = React.createContext(initialContext.setAuth);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [auth, setAuth] = React.useState(initialContext.auth);
  const [isReady, setIsReady] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      const cookies = parseCookies();
      console.log(cookies);

      const token = cookies.token;
      if (token) {
        const response = await verifyToken();
        setAuth({
          token,
          userId: response.data.id,
        });
      }
    })()
      .catch(() => {
        router.push("/logout");
      })
      .finally(() => {
        setIsReady(true);
      });
  }, []);

  if (!isReady) return <></>;

  return (
    <authContext.Provider value={auth}>
      <setAuthContext.Provider value={setAuth}>
        {children}
      </setAuthContext.Provider>
    </authContext.Provider>
  );
};
