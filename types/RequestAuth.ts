import ObjectID from "bson-objectid";
import { Request } from "express";

export default interface RequestAuth extends Request {
  userId?: string | ObjectID;
  params: any;
  file?: any;
}
