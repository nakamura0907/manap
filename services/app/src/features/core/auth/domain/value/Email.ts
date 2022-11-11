import ValueObject from "@/features/shared/ValueObject";
import Exception from "@/util/exception/Exception";

class Email extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  static create(value: string) {
    const regex =
      /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    if (!regex.test(value))
      throw new Exception("メールアドレスの形式を確認してください", 400);

    return new Email(value);
  }
}

export default Email;
