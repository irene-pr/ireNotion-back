import { NextFunction, Request, Response } from "express";
import RequestAuth from "../../types/RequestAuth";

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
