import { Response } from "express";

export function okResponse<T>(res: Response, body: T) {
  res.status(200).json(body);
}

export function createdResponse<T>(res: Response, body: T) {
  res.status(201).json(body);
}

export function noContentResponse(res: Response) {
  res.status(204).json();
}
