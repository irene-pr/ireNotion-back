import newError from "../../utils/newError";
import { expect } from "@jest/globals";

import {
  mockNextFunction,
  mockRequest,
  mockResponse,
} from "../../utils/mocks/mockFunctionsForTests";
import { generalErrorHandler, notFoundErrorHandler } from "./errors";

describe("Given a NotFoundErrorHandler,", () => {
  describe("When it is called", () => {
    test("Then it should invoke the method json", async () => {
      const res = mockResponse();
      const req = mockRequest();

      await notFoundErrorHandler(req, res);

      expect(res.json).toHaveBeenCalled();
    });
    test("Then it should invoke the method json with the message 'Not found'", async () => {
      const res = mockResponse();
      const req = mockRequest();

      await notFoundErrorHandler(req, res);

      expect(res.json).toHaveBeenCalledWith({ error: "Not found" });
    });

    test("Then it should send status 404", async () => {
      const res = mockResponse();
      const req = mockRequest();

      await notFoundErrorHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});

describe("Given a GenralErrorHandler", () => {
  describe("When it's invoked by an unknown error", () => {
    test("Then it invokes  a 500 error", async () => {
      const error = new Error();
      const res = mockResponse();
      const req = mockRequest();
      const next = mockNextFunction();

      await generalErrorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
    });
    test("Then it invokes the json method with an error of the message 'Wow'", async () => {
      const error = new Error();
      const res = mockResponse();
      const req = mockRequest();
      const next = mockNextFunction();

      await generalErrorHandler(error, req, res, next);

      expect(res.json).toHaveBeenCalledWith({ error: "Wow" });
    });
  });
  describe("When it's invoked by a concrete error", () => {
    test("Then it invokes  a 500 error", async () => {
      const error = newError(418, "I am a teapot");
      const res = mockResponse();
      const req = mockRequest();
      const next = mockNextFunction();

      await generalErrorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(418);
    });
    test("Then it invokes the json method with an error of the message 'Wow'", async () => {
      const error = newError(404, "holins");
      const res = mockResponse();
      const req = mockRequest();
      const next = mockNextFunction();

      await generalErrorHandler(error, req, res, next);

      expect(res.json).toHaveBeenCalledWith({ error: "holins" });
    });
  });
});
