class Exception extends Error {
  constructor(readonly message: string, readonly status: number = 500) {
    super(message);
  }

  setOriginalError(error: Error) {
    this.stack = error.stack;
  }
}

export default Exception;
