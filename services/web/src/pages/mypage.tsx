import Link from "@components/ui/link";
import React from "react";
import { fetchList, FetchListResponse } from "@features/project";
import type { NextPage } from "next";

type State = {
  projects: FetchListResponse["projects"];
};

const initialState: State = {
  projects: [],
};

const MyPage: NextPage = () => {
  const [projects, setProjects] = React.useState(initialState.projects);

  React.useEffect(() => {
    (async () => {
      const result = await fetchList();
      setProjects(result.data.projects);
    })().catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div>
      <div>
        <h1>My Page</h1>
      </div>
      <div>
        {projects.map((project) => {
          return (
            <div key={project.id}>
              <Link href={`/projects/${project.id}`}>{project.name}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyPage;
