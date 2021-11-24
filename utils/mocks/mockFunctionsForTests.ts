import { NextFunction, Request, Response } from "express";
import { RequestAuth } from "../../server/middlewares/auth";

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

export const mockAuthRequest = (body?: any, header?: any) => {
  const req = {} as RequestAuth;
  req.body = body;
  req.header = jest.fn().mockReturnValue(header);
  req.userId = "";

  return req;
};

export const mockNextFunction = () => jest.fn() as NextFunction;
