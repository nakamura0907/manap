import { GeneratedId } from "@/features/shared/Id";
import { inject, injectable } from "tsyringe";
import IProjectsMembersQueryService from "../repository/IProjectsMembersQueryService";

@injectable()
class ProjectMemberService {
  private readonly queryService: IProjectsMembersQueryService;
  private readonly MAX_MEMBER_LENGTH = 30;

  constructor(
    @inject("projectsMembersQueryService")
    queryService: IProjectsMembersQueryService
  ) {
    this.queryService = queryService;
  }

  async isExist(projectId: GeneratedId, userId: GeneratedId) {
    return this.queryService.find(projectId, userId);
  }

  async isMaxMember(projectId: GeneratedId) {
    const count = await this.queryService.count(projectId);
    return count >= this.MAX_MEMBER_LENGTH;
  }
}

export default ProjectMemberService;
