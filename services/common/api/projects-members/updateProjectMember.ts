import { Member } from "./types";

// export const getChangeableRoles = (
//   myRoleId: number,
//   targetRoleId: number
// ) => {};

type RequestBody = {
  roleId: number;
};
export type UpdateProjectMmeberRequest = {
  query: {
    projectId: number;
    userId: number;
  };
  body: RequestBody;
};

export type UpdateProjectMmeberResponse = Member;
