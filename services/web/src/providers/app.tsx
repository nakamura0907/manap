import React from "react";
import { ModalProvider } from "./modal";

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <ModalProvider>{children}</ModalProvider>;
};

export default AppProvider;
