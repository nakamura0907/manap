import React from "react";
import { ProjectProvider } from "@providers/project";
import { LoadingProvider } from "./loading";
import { ModalProvider } from "./modal";
import { AuthProvider } from "@providers/auth";

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <LoadingProvider>
      <AuthProvider>
        <ProjectProvider>
          <ModalProvider>{children}</ModalProvider>
        </ProjectProvider>
      </AuthProvider>
    </LoadingProvider>
  );
};

export default AppProvider;
