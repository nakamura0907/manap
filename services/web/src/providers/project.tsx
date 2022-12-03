import React from "react";

type Project = {
  id: number;
  roleId: number;
};

type Context = {
  project?: Project;
  setProject: React.Dispatch<React.SetStateAction<Project | undefined>>;
};

const initialContext: Context = {
  project: undefined,
  setProject: () => undefined,
};

export const projectContext = React.createContext(initialContext.project);
export const setProjectContext = React.createContext(initialContext.setProject);

export const ProjectProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [project, setProject] = React.useState(initialContext.project);

  return (
    <projectContext.Provider value={project}>
      <setProjectContext.Provider value={setProject}>
        {children}
      </setProjectContext.Provider>
    </projectContext.Provider>
  );
};
