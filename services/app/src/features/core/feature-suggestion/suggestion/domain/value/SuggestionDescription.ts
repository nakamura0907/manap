import ValueObject from "@/features/shared/ValueObject";
import Exception from "@/util/exception/Exception";

class SuggestionDescription extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  static validate(value: string) {
    if (!value) return new SuggestionDescription("");
    if (value.length > 1000) {
      throw new Exception("提案概要は1000文字以内で入力してください", 400);
    }
    return new SuggestionDescription(value);
  }
}

export default SuggestionDescription;
