import ValueObject from "@/features/shared/ValueObject";
import Exception from "@/util/exception/Exception";

class CommentContent extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  static validate(value: string) {
    if (!value) throw new Exception("コメントを入力してください", 400);
    if (value.length > 255) {
      throw new Exception("コメントは255文字以内で入力してください", 400);
    }
    return new CommentContent(value);
  }
}

export default CommentContent;
