import ValueObject from "@/features/shared/ValueObject";
import Exception from "@/util/exception/Exception";

class SuggestionTitle extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  static validate(value: string): SuggestionTitle {
    if (!value) throw new Exception("提案タイトルを入力してください", 400);
    if (value.length > 100) {
      throw new Exception("提案のタイトルは100文字以内で入力してください", 400);
    }
    return new SuggestionTitle(value);
  }
}

export default SuggestionTitle;
