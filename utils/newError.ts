function newError(code: number | string, message: string) {
  return {
    code,
    message,
  };
}

export default newError;
