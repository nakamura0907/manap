abstract class ValueObject<T> {
  protected readonly _value: T;

  constructor(value: T) {
    this._value = value;

    Object.freeze(this);
  }

  get value() {
    return this._value;
  }

  equals(object: ValueObject<T>): boolean {
    if (this.constructor.name !== object.constructor.name) return false;
    return this._value === object.value;
  }
}

export default ValueObject;
