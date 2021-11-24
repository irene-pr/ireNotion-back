import jwt from "jsonwebtoken";
import { getRandomUser } from "../../utils/Factories/usersFactory";
import {
  mockAuthRequest,
  mockNextFunction,
  mockResponse,
} from "../../utils/mocks/mockFunctionsForTests";
import newError from "../../utils/newError";
import { auth } from "./auth";

jest.mock("jsonwebtoken");

describe("Given an auth middleware", () => {
  describe("When it receives no authorization", () => {
    test("Then it invokes the next function", async () => {
      const req = mockAuthRequest(null, null);
      const res = mockResponse();
      const next = mockNextFunction();

      await auth(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it invokes the next function with an error", async () => {
      const req = mockAuthRequest(null, null);
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = newError(401, "No Authorization");

      await auth(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When it receives authorization but no token", () => {
    test("Then it invokes the next function", async () => {
      const req = mockAuthRequest(null, "Bearer ");
      const res = mockResponse();
      const next = mockNextFunction();

      await auth(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    test("Then it invokes the next function with an error", async () => {
      const req = mockAuthRequest(null, "Bearer ");
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = newError(401, "No Token");

      await auth(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives the wrong token", () => {
    test("Then it invokes the next function", async () => {
      jwt.verify = jest.fn().mockRejectedValue(null);
      const req = mockAuthRequest(null, "Bearer token");
      const res = mockResponse();
      const next = mockNextFunction();

      await auth(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it invokes the next function with an error", async () => {
      jwt.verify = jest.fn().mockRejectedValue(null);
      const req = mockAuthRequest(null, "Bearer token");
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = newError(401, "Token invalid");

      await auth(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives the right token", () => {
    test("Then it invokes the next function", async () => {
      const user = getRandomUser();
      jwt.verify = jest.fn().mockResolvedValue(user);
      const req = mockAuthRequest(null, "Bearer token");
      const res = mockResponse();
      const next = mockNextFunction();

      await auth(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it adds the userId property to the request", async () => {
      const user: any = getRandomUser();
      jwt.verify = jest.fn().mockResolvedValue(user);
      const req = mockAuthRequest(null, "Bearer token");
      const res = mockResponse();
      const next = mockNextFunction();

      await auth(req, res, next);

      expect(req).toHaveProperty("userId", user.id);
    });
  });
});
