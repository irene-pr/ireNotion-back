import { NextFunction, Request, Response } from "express";

export const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();

  return res;
};
export const mockRequest = (body?: any) => {
  const req = {} as Request;
  req.body = body;

  return req;
};

export interface RequestAuth extends Request {
  userId?: string;
  params: any;
  file?: any;
}

export const mockAuthRequest = (
  body?: any,
  header?: any,
  params?: any,
  userId?: any
) => {
  const req = {} as RequestAuth;
  req.body = body;
  req.header = jest.fn().mockReturnValue(header);
  req.userId = userId;
  req.params = jest.fn().mockReturnValue(params);

  return req;
};

export const mockNextFunction = () => jest.fn() as NextFunction;
