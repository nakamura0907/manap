import ValueObject from "@/features/shared/ValueObject";
import Exception from "@/util/exception/Exception";

class NickName extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  static create(value: string) {
    if (value.length < 3 || value.length > 255)
      throw new Exception(
        "ニックネームは3文字以上255文字以下で入力してください"
      );

    return new NickName(value);
  }
}

export default NickName;
