import AuthCredential from "./AuthCredential";
import Email from "../value/Email";
import Password from "../value/Password";
import { NoneId } from "@/features/shared/Id";

class EmailAuthCredential extends AuthCredential<NoneId> {
  constructor(email: string, password: string) {
    super(NoneId.instance, email, password);
  }

  static create(email: string, password: string) {
    const validatedEmail = Email.create(email);
    const validatedPassword = Password.create(password);

    return new EmailAuthCredential(
      validatedEmail.value,
      validatedPassword.encrepted
    );
  }

  get email() {
    return this.identifier;
  }

  get password() {
    return this.credential;
  }
}

export default EmailAuthCredential;
