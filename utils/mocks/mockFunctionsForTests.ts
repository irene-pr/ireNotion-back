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

export const mockNextFunction = () => {
  const next = jest.fn() as NextFunction;
  return next;
};
