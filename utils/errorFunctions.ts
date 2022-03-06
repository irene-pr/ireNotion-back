export function newError(code: number | string, message: string) {
  return {
    code,
    message,
  };
}

export function badRequest(message: string) {
  return {
    code: 400,
    message,
  };
}

export function unauthorized(message: string) {
  return {
    code: 401,
    message,
  };
}

export function notFound(message: string) {
  return {
    code: 404,
    message,
  };
}

export function conflict(message: string) {
  return {
    code: 409,
    message,
  };
}
