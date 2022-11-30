import React from "react";
import { LoadingProvider } from "./loading";
import { ModalProvider } from "./modal";

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <LoadingProvider>
      <ModalProvider>{children}</ModalProvider>
    </LoadingProvider>
  );
};

export default AppProvider;
