import ValueObject from "@/features/shared/ValueObject";
import { GeneratedId } from "@/features/shared/Id";
import { Role } from "@common/role";

type MemberProps = {
  userId: GeneratedId;
  role: Role;
};

class Member extends ValueObject<MemberProps> {
  equals(userId: GeneratedId): boolean;
  equals(object: ValueObject<MemberProps>): boolean;
  equals(object: ValueObject<MemberProps> | GeneratedId): boolean {
    if (object instanceof ValueObject) {
      return super.equals(object);
    }
    return this.value.userId.equals(object);
  }
}

export default Member;
