import Board from "../../database/models/Board";
import User from "../../database/models/User";
import {
  getRandomBoard,
  getRandomNewBoard,
} from "../../utils/Factories/boardFactory";
import { getRandomUser } from "../../utils/Factories/usersFactory";
import {
  mockAuthRequest,
  mockNextFunction,
  mockResponse,
} from "../../utils/mocks/mockFunctionsForTests";
import newError from "../../utils/newError";
import { createBoard } from "./boardControllers";

jest.setTimeout(50000);
jest.mock("../../database/models/User");
jest.mock("../../database/models/Board");

describe("Given a createBoard controller,", () => {
  let body: any;
  let user: any;
  let idUser: any;
  let newBoard: any;
  beforeAll(() => {
    body = getRandomNewBoard();
    user = getRandomUser();
    idUser = user.id;
    newBoard = getRandomBoard();
    newBoard.name = body.name;
  });

  describe("When it is called", () => {
    test("Then it executes", async () => {
      const req = mockAuthRequest();
      const res = mockResponse();
      const next = mockNextFunction();

      await createBoard(req, res, next);
    });
  });
  describe("When it receives a new board and a wrong user id", () => {
    test("Then it will invoke the next function", async () => {
      Board.create = jest.fn().mockResolvedValue(newBoard);
      User.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
      const req = mockAuthRequest(body, null, { idUser });
      const res = mockResponse();
      const next = mockNextFunction();

      await createBoard(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it will invoke the next function with an error 404 'User not found", async () => {
      Board.create = jest.fn().mockResolvedValue(newBoard);
      User.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
      const req = mockAuthRequest(body, null, { idUser: idUser.id });
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = newError(404, "User not found");

      await createBoard(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When it receives a new board and a correct user id", () => {
    test("Then it will invoke the method json", async () => {
      Board.create = jest.fn().mockResolvedValue(newBoard);
      User.findByIdAndUpdate = jest.fn().mockResolvedValue(user);
      user.save = jest.fn();
      const req = mockAuthRequest(body, null, { idUser: idUser.id });
      const res = mockResponse();
      const next = mockNextFunction();

      await createBoard(req, res, next);

      expect(res.json).toHaveBeenCalled();
    });
    test("Then the response will emit a status 204", async () => {
      Board.create = jest.fn().mockResolvedValue(newBoard);
      User.findByIdAndUpdate = jest.fn().mockResolvedValue(user);
      user.save = jest.fn();
      const req = mockAuthRequest(body, null, { idUser: idUser.id });
      const res = mockResponse();
      const next = mockNextFunction();

      await createBoard(req, res, next);

      expect(res.status).toHaveBeenCalledWith(204);
    });
  });
  describe("When Board.create rejects", () => {
    test("Then it will invoke the next function", async () => {
      Board.create = jest.fn().mockRejectedValue(newBoard);
      User.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
      const req = mockAuthRequest(body, null, { idUser });
      const res = mockResponse();
      const next = mockNextFunction();

      await createBoard(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it will invoke the next function with an error 404 'User not found", async () => {
      Board.create = jest.fn().mockRejectedValue(newBoard);
      User.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
      const req = mockAuthRequest(body, null, { idUser: idUser.id });
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = newError(400, "Could not create a new board");

      await createBoard(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When User.findByIdAndUpdate rejects", () => {
    test("Then it will invoke the next function", async () => {
      Board.create = jest.fn().mockResolvedValue(newBoard);
      User.findByIdAndUpdate = jest.fn().mockRejectedValue(null);
      const req = mockAuthRequest(body, null, { idUser });
      const res = mockResponse();
      const next = mockNextFunction();

      await createBoard(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it will invoke the next function with an error 404 'User not found", async () => {
      Board.create = jest.fn().mockResolvedValue(newBoard);
      User.findByIdAndUpdate = jest.fn().mockRejectedValue(null);
      const req = mockAuthRequest(body, null, { idUser: idUser.id });
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = newError(400, "Could not create a new board");

      await createBoard(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
