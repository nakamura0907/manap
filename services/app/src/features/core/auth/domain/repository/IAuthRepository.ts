import AuthCredential from "../model/AuthCredential";
import { GeneratedId } from "@/features/shared/Id";

interface IAuthRepository {
  loginByEmail: (email: string) => Promise<AuthCredential<GeneratedId> | null>;
  authByGithub: (
    username: string,
    githubId: string,
    accessToken: string
  ) => Promise<AuthCredential<GeneratedId>>;
}

export default IAuthRepository;
