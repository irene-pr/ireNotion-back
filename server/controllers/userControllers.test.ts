import bcrypt from "bcrypt";
import User from "../../database/models/User";
import newError from "../../utils/errorCreator";
import { getRandomNewUser } from "../../utils/Factories/usersFactory";
import {
  mockRequest,
  mockResponse,
  mockNextFunction,
} from "../../utils/mocks/mockFunctionsForTests";
import registerUser from "./userControllers";

jest.setTimeout(50000);
jest.mock("../../database/models/User");
jest.mock("bcrypt");

let newUser: any;
beforeEach(() => {
  newUser = getRandomNewUser();
});

describe("Given a registerUser controller,", () => {
  describe("When it receives a user with an already existing username,", () => {
    test("Then it calls the next function", async () => {
      User.findOne = jest.fn().mockResolvedValue(newUser);
      const req = mockRequest(newUser);
      const res = mockResponse();
      const next = mockNextFunction();

      await registerUser(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it calls the next function with an error 400 'Username already exists'", async () => {
      User.findOne = jest.fn().mockResolvedValue(newUser);
      const req = mockRequest(newUser);
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = newError(400, "Username already exists");

      await registerUser(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When it receives a user with a new username,", () => {
    test("Then it calls the method json", async () => {
      User.findOne = jest.fn().mockResolvedValue(null);
      bcrypt.hash = jest.fn().mockResolvedValue("encrypted password");
      const req = mockRequest(newUser);
      const res = mockResponse();
      const next = mockNextFunction();

      await registerUser(req, res, next);

      expect(res.json).toHaveBeenCalled();
    });
    test("Then it calls the next function with an error 400 'Username already exists'", async () => {
      User.findOne = jest.fn().mockResolvedValue(null);
      bcrypt.hash = jest.fn().mockResolvedValue("encrypted password");
      const req = mockRequest(newUser);
      const res = mockResponse();
      const next = mockNextFunction();

      await registerUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
    });
  });
  describe("When User.findOne rejects,", () => {
    test("Then it calls the next function", async () => {
      User.findOne = jest.fn().mockRejectedValue(null);
      bcrypt.hash = jest.fn().mockResolvedValue("encrypted password");
      const req = mockRequest(newUser);
      const res = mockResponse();
      const next = mockNextFunction();

      await registerUser(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it calls the next function with a 400 'User registration failed'", async () => {
      User.findOne = jest.fn().mockRejectedValue(null);
      bcrypt.hash = jest.fn().mockResolvedValue("encrypted password");
      const req = mockRequest(newUser);
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = newError(400, "User registration failed");

      await registerUser(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When bcrypt.hash rejects,", () => {
    test("Then it calls the next function", async () => {
      User.findOne = jest.fn().mockResolvedValue(null);
      bcrypt.hash = jest.fn().mockRejectedValue(null);
      const req = mockRequest(newUser);
      const res = mockResponse();
      const next = mockNextFunction();

      await registerUser(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it calls the next function with a 400 'User registration failed'", async () => {
      User.findOne = jest.fn().mockResolvedValue(null);
      bcrypt.hash = jest.fn().mockRejectedValue(null);
      const req = mockRequest(newUser);
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = newError(400, "User registration failed");

      await registerUser(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
