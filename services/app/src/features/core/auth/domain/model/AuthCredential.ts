import { GeneratedId, Id } from "@/features/shared/Id";

class AuthCredential<T extends Id = Id> {
  private readonly _id: T;
  private readonly _identifier: string;
  private readonly _credential: string;

  constructor(id: T, identifier: string, credential: string) {
    this._id = id;
    this._identifier = identifier;
    this._credential = credential;
  }

  get id() {
    if (!this._id.isGenerated) {
      throw new Error("IDが生成されていません");
    }
    return this._id;
  }

  get identifier() {
    return this._identifier;
  }

  get credential() {
    return this._credential;
  }

  setId(id: GeneratedId) {
    return new AuthCredential(id, this._identifier, this._credential);
  }
}

export default AuthCredential;
