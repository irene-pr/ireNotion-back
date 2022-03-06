import ObjectID from "bson-objectid";
import { NextFunction, Request, Response } from "express";
import RequestAuth from "../../types/RequestAuth";

export const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();

  return res;
};

export const mockRequest = <T>(body?: T) => {
  const req = {} as Request;
  req.body = body;

  return req;
};

export const mockAuthRequest = <T1, T2>(
  body?: T1,
  header?: string | null,
  params?: T2,
  userId?: string | ObjectID
) => {
  const req = {} as RequestAuth;
  req.body = body;
  req.header = jest.fn().mockReturnValue(header);
  req.params = jest.fn().mockReturnValue(params);
  req.userId = userId;

  return req;
};

export const mockNextFunction = () => jest.fn() as NextFunction;
