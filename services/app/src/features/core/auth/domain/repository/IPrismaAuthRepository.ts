import AuthCredential from "../model/AuthCredential";
import { GeneratedId } from "@/features/shared/Id";

interface IPrismaAuthRepository {
  loginByEmail: (email: string) => Promise<AuthCredential<GeneratedId> | null>;
}

export default IPrismaAuthRepository;
