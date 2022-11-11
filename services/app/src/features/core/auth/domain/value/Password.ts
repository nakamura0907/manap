import ValueObject from "@/features/shared/ValueObject";
import Exception from "@/util/exception/Exception";
import { hashSync } from "@/util/hash";

class Password extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  static create(value: string) {
    if (value.length < 5 || value.length > 255)
      throw new Exception(
        "パスワードは5文字以上255文字以下で入力してください",
        400
      );

    return new Password(value);
  }

  get encrepted() {
    return hashSync(this._value);
  }
}

export default Password;
