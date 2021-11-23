import { Request, Response } from "express";
import { mockRequest, mockResponse } from "../../mocks/mockFunctionsForTests";
import { notFoundErrorHandler } from "./errors";

describe("Given a NotFoundErrorHandler,", () => {
  describe("When it is called", () => {
    test("Then it should invoke the method json", async () => {
      //const res = mockResponse();
      const res = mockResponse();
      const req = mockRequest();

      await notFoundErrorHandler(req, res);

      expect(res.json).toHaveBeenCalled();
    });
    test("Then it should invoke the method json with the message 'Endpoint not found'", async () => {
      //const res = mockResponse();
      const res = mockResponse();
      const req = mockRequest();

      await notFoundErrorHandler(req, res);

      expect(res.json).toHaveBeenCalledWith({ error: "Endpoint not found" });
    });

    test("Then it should send status 404", async () => {
      //const res = mockResponse();
      const res = mockResponse();
      const req = mockRequest();

      await notFoundErrorHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
