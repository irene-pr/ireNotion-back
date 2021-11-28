import { NextFunction, Response } from "express";
import admin from "firebase-admin";
import { RequestAuth } from "../../utils/mocks/mockFunctionsForTests";
import newError from "../../utils/newError";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: "irenotion.appspot.com",
});

const uploadFirebase = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const bucket = admin.storage().bucket();
    await bucket.upload(req.file.path);
    await bucket.file(req.file.filename).makePublic();
    const fileURL = bucket.file(req.file.filename).publicUrl();
    req.body.note.file = fileURL;
    next();
  } catch {
    const error = newError(400, "Failed uploading to firebase");
    next(error);
  }
};

export default uploadFirebase;
