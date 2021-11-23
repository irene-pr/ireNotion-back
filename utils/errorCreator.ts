function newError(code: number | string, message: string) {
  const error = {
    code,
    message,
  };

  return error;
}

export default newError;
