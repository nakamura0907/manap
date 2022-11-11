import AuthCredential from "../model/AuthCredential";
import { GeneratedId } from "@/features/shared/Id";
import NickName from "../value/Nickname";
import EmailAuthCredential from "../model/EmailAuthCredential";

interface IAuthRepository {
  signupByEmail: (
    nickName: NickName,
    credential: EmailAuthCredential
  ) => Promise<void>;
  loginByEmail: (email: string) => Promise<AuthCredential<GeneratedId> | null>;
  authByGithub: (
    username: string,
    githubId: string,
    accessToken: string
  ) => Promise<AuthCredential<GeneratedId>>;
}

export default IAuthRepository;
