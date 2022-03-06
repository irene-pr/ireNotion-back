import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { expect } from "@jest/globals";
import User from "../../database/models/User";
import newError from "../../utils/newError";

import {
  getRandomRegisterUserRequest,
  getRandomUser,
} from "../../utils/Factories/usersFactory";
import {
  mockRequest,
  mockResponse,
  mockNextFunction,
  mockAuthRequest,
} from "../../utils/mocks/mockFunctionsForTests";
import { registerUser, loginUser, getUserContent } from "./userControllers";

jest.setTimeout(50000);
jest.mock("../../database/models/User");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

let newUser: any;
let user: any;
beforeEach(() => {
  newUser = getRandomRegisterUserRequest();
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

describe("Given a getUserContent controller,", () => {
  const populatedUser = {
    id: "userId",
    name: "user",
    username: "user",
    boards: [
      {
        id: "boardId",
        type: "board",
        name: "board1",
        userId: "userId",
        notes: [
          {
            id: "noteId1",
            type: "paragraph",
            color: "blue",
            userId: "userId",
            list: ["hola", "adeu"],
          },
          {
            id: "noteId2",
            type: "paragraph",
            color: "green",
            userId: "userId",
            list: [],
          },
        ],
      },
    ],
  };

  describe("When it receives a correct userId through auth,", () => {
    test("Then it calls the json method", async () => {
      User.findOne = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue(populatedUser),
        }),
      });
      const req = mockAuthRequest();
      const res = mockResponse();
      const next = mockNextFunction();

      await getUserContent(req, res, next);

      expect(res.json).toHaveBeenCalled();
    });
    test("Then the response has a status", async () => {
      User.findOne = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue(populatedUser),
        }),
      });
      const req = mockAuthRequest();
      const res = mockResponse();
      const next = mockNextFunction();

      await getUserContent(req, res, next);

      expect(res.status).toHaveBeenCalled();
    });
    test("Then the response has a status 200", async () => {
      User.findOne = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue(populatedUser),
        }),
      });
      const req = mockAuthRequest();
      const res = mockResponse();
      const next = mockNextFunction();

      await getUserContent(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
  describe("When it receives a non existing userId through auth,", () => {
    test("Then it calls the next function", async () => {
      User.findOne = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue(null),
        }),
      });
      const req = mockAuthRequest();
      const res = mockResponse();
      const next = mockNextFunction();

      await getUserContent(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it calls the next function with an error 404 'User not found'", async () => {
      User.findOne = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue(null),
        }),
      });
      const req = mockAuthRequest();
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = newError(404, "User not found");

      await getUserContent(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When it User.findOne rejects,", () => {
    test("Then it calls the next function", async () => {
      User.findOne = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          populate: jest.fn().mockRejectedValue(null),
        }),
      });
      const req = mockAuthRequest();
      const res = mockResponse();
      const next = mockNextFunction();

      await getUserContent(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it calls the next function with an error 404 'Could not get user content'", async () => {
      User.findOne = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          populate: jest.fn().mockRejectedValue(null),
        }),
      });
      const req = mockAuthRequest();
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = newError(400, "Could not get user content");

      await getUserContent(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
