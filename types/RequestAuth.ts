import { Request } from "express";

export default interface RequestAuth extends Request {
  userId?: string;
  params: any;
  file?: any;
}
