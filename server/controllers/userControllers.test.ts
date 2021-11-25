import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../database/models/User";
import newError from "../../utils/newError";
import { expect } from "@jest/globals";

import {
  getRandomNewUser,
  getRandomUser,
} from "../../utils/Factories/usersFactory";
import {
  mockRequest,
  mockResponse,
  mockNextFunction,
} from "../../utils/mocks/mockFunctionsForTests";
import { registerUser, loginUser } from "./userControllers";

jest.setTimeout(50000);
jest.mock("../../database/models/User");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

let newUser: any;
let user: any;
beforeEach(() => {
  newUser = getRandomNewUser();
  user = getRandomUser();
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
      const expectedUser = { ...newUser, password: "encrypted password" };
      User.findOne = jest.fn().mockResolvedValue(null);
      bcrypt.hash = jest.fn().mockResolvedValue("encrypted password");
      User.create = jest.fn().mockResolvedValue(expectedUser);
      const req = mockRequest(newUser);
      const res = mockResponse();
      const next = mockNextFunction();

      await registerUser(req, res, next);

      expect(res.json).toHaveBeenCalled();
    });
    test("Then it calls the method json", async () => {
      const expectedUser = { ...newUser, password: "encrypted password" };
      User.findOne = jest.fn().mockResolvedValue(null);
      bcrypt.hash = jest.fn().mockResolvedValue("encrypted password");
      User.create = jest.fn().mockResolvedValue(expectedUser);
      const req = mockRequest(newUser);
      const res = mockResponse();
      const next = mockNextFunction();

      await registerUser(req, res, next);

      expect(res.json).toHaveBeenCalledWith(expectedUser);
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
  describe("When User.create rejects,", () => {
    test("Then it calls the next function", async () => {
      User.findOne = jest.fn().mockResolvedValue(null);
      bcrypt.hash = jest.fn().mockResolvedValue("123");
      User.create = jest.fn().mockRejectedValue(null);
      const req = mockRequest(newUser);
      const res = mockResponse();
      const next = mockNextFunction();

      await registerUser(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it calls the next function with a 400 'User registration failed'", async () => {
      User.findOne = jest.fn().mockResolvedValue(null);
      bcrypt.hash = jest.fn().mockResolvedValue("123");
      User.create = jest.fn().mockRejectedValue(null);
      const req = mockRequest(newUser);
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = newError(400, "User registration failed");

      await registerUser(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
describe("Given a loginUser controller,", () => {
  describe("When it receives a body with an unexisting username,", () => {
    test("Then it calls the next function", async () => {
      User.findOne = jest.fn().mockResolvedValue(null);
      const req = mockRequest(user);
      const res = mockResponse();
      const next = mockNextFunction();

      await loginUser(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it calls the next function with an error 401 'Wring Credentials'", async () => {
      User.findOne = jest.fn().mockResolvedValue(null);
      const req = mockRequest(user);
      const res = mockResponse();
      const next = mockNextFunction();

      const expectedError = newError(401, "Wrong credentials");

      await loginUser(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When it receives an existing user with a wrong password,", () => {
    test("Then it calls the next function", async () => {
      User.findOne = jest.fn().mockResolvedValue(user);
      bcrypt.compare = jest.fn().mockResolvedValue(false);
      const req = mockRequest(user);
      const res = mockResponse();
      const next = mockNextFunction();

      await loginUser(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it calls the next function with an error 401, 'Wrong Credentials'", async () => {
      User.findOne = jest.fn().mockResolvedValue(user);
      bcrypt.compare = jest.fn().mockResolvedValue(false);
      const req = mockRequest(user);
      const res = mockResponse();
      const next = mockNextFunction();

      const expectedError = newError(401, "Wrong credentials");

      await loginUser(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When it receives an existing user with the right password,", () => {
    test("Then it calls the method json", async () => {
      User.findOne = jest.fn().mockResolvedValue(user);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue("token");
      const req = mockRequest(user);
      const res = mockResponse();
      const next = mockNextFunction();

      await loginUser(req, res, next);

      expect(res.json).toHaveBeenCalled();
    });
    test("Then it calls the method json with the token", async () => {
      User.findOne = jest.fn().mockResolvedValue(user);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue("token");
      const req = mockRequest(user);
      const res = mockResponse();
      const next = mockNextFunction();

      await loginUser(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ token: "token" });
    });
  });
  describe("When User.findOne rejects", () => {
    test("Then it calls the next function", async () => {
      User.findOne = jest.fn().mockRejectedValue(null);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue("token");
      const req = mockRequest(user);
      const res = mockResponse();
      const next = mockNextFunction();

      await loginUser(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it calls the next function with an error 400 'User login failed'", async () => {
      User.findOne = jest.fn().mockRejectedValue(null);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue("token");
      const req = mockRequest(user);
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = newError(400, "User login failed");

      await loginUser(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When bcrypt.compare rejects", () => {
    test("Then it calls the next function", async () => {
      User.findOne = jest.fn().mockResolvedValue(user);
      bcrypt.compare = jest.fn().mockRejectedValue(null);
      jwt.sign = jest.fn().mockReturnValue("token");
      const req = mockRequest(user);
      const res = mockResponse();
      const next = mockNextFunction();

      await loginUser(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it calls the next function with an error 400 'User login failed'", async () => {
      User.findOne = jest.fn().mockResolvedValue(user);
      bcrypt.compare = jest.fn().mockRejectedValue(null);
      jwt.sign = jest.fn().mockReturnValue("token");
      const req = mockRequest(user);
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = newError(400, "User login failed");

      await loginUser(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
