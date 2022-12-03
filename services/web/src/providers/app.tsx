import React from "react";
import { ProjectProvider } from "@providers/project";
import { LoadingProvider } from "./loading";
import { ModalProvider } from "./modal";

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <LoadingProvider>
      <ProjectProvider>
        <ModalProvider>{children}</ModalProvider>
      </ProjectProvider>
    </LoadingProvider>
  );
};

export default AppProvider;
