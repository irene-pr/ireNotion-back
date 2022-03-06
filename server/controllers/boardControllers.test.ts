import { expect } from "@jest/globals";
import ObjectID from "bson-objectid";
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
import { badRequest, notFound } from "../../utils/errorFunctions";
import { createBoard, deleteBoard, updateBoard } from "./boardControllers";

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
      const req = mockAuthRequest(body, null, { idUser });
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = notFound("User not found");

      await createBoard(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When it receives a new board and a correct user id", () => {
    test("Then it will invoke the method json", async () => {
      Board.create = jest.fn().mockResolvedValue(newBoard);
      User.findByIdAndUpdate = jest.fn().mockResolvedValue(user);
      user.save = jest.fn();
      const req = mockAuthRequest(body, null, { idUser });
      const res = mockResponse();
      const next = mockNextFunction();

      await createBoard(req, res, next);

      expect(res.json).toHaveBeenCalled();
    });
    test("Then the response will emit a status 204", async () => {
      Board.create = jest.fn().mockResolvedValue(newBoard);
      User.findByIdAndUpdate = jest.fn().mockResolvedValue(user);
      user.save = jest.fn();
      const req = mockAuthRequest(body, null, { idUser });
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
      const req = mockAuthRequest(body, null, { idUser });
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = badRequest("Could not create a new board");

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
    test("Then it will invoke the next function with an error 400 'Could not create a new board", async () => {
      Board.create = jest.fn().mockResolvedValue(newBoard);
      User.findByIdAndUpdate = jest.fn().mockRejectedValue(null);
      const req = mockAuthRequest(body, null, { idUser });
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = badRequest("Could not create a new board");

      await createBoard(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a deleteBoard controller,", () => {
  let user: any;
  let board: any;
  let idBoard: any;
  beforeAll(() => {
    user = getRandomUser();
    board = getRandomBoard();
    idBoard = board.id;
  });

  describe("When it is called", () => {
    test("Then it executes", async () => {
      const req = mockAuthRequest();
      const res = mockResponse();
      const next = mockNextFunction();

      await deleteBoard(req, res, next);
    });
  });
  describe("When it receives the wrong board id", () => {
    test("Then it will invoke the next function", async () => {
      Board.findById = jest.fn().mockResolvedValue(null);
      const req = mockAuthRequest(null, null, { idBoard });
      const res = mockResponse();
      const next = mockNextFunction();

      await deleteBoard(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it will invoke the next function with an error 404 'Board not found", async () => {
      Board.findById = jest.fn().mockResolvedValue(null);
      const req = mockAuthRequest(null, null, { idBoard });
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = notFound("Board not found");

      await deleteBoard(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When it receives a correct board id and a wrong user id", () => {
    test("Then it will call the next function", async () => {
      Board.findById = jest.fn().mockResolvedValue(board);
      User.updateOne = jest.fn().mockResolvedValue(null);
      const req = mockAuthRequest(null, null, { idBoard });
      const res = mockResponse();
      const next = mockNextFunction();

      await deleteBoard(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it will call the next function with an error 404 'User not found'", async () => {
      Board.findById = jest.fn().mockResolvedValue(board);
      User.updateOne = jest.fn().mockResolvedValue(null);
      const req = mockAuthRequest(null, null, { idBoard });
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = notFound("User not found");

      await deleteBoard(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When it receives a correct board id and user id", () => {
    test("Then it will call the json method", async () => {
      Board.findById = jest.fn().mockResolvedValue(board);
      User.updateOne = jest.fn().mockResolvedValue(user);
      const req = mockAuthRequest(null, null, { idBoard });
      const res = mockResponse();
      const next = mockNextFunction();

      await deleteBoard(req, res, next);

      expect(res.json).toHaveBeenCalled();
    });
    test("Then it will call the json method", async () => {
      Board.findById = jest.fn().mockResolvedValue(board);
      User.updateOne = jest.fn().mockResolvedValue(user);
      const req = mockAuthRequest(null, null, { idBoard });
      const res = mockResponse();
      const next = mockNextFunction();

      await deleteBoard(req, res, next);

      expect(res.json).toHaveBeenCalledWith({
        message: "board deleted successfully",
      });
    });
    test("Then it will emit a status 200", async () => {
      Board.findById = jest.fn().mockResolvedValue(board);
      User.updateOne = jest.fn().mockResolvedValue(user);
      const req = mockAuthRequest(null, null, { idBoard });
      const res = mockResponse();
      const next = mockNextFunction();

      await deleteBoard(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
  describe("When Board.findById rejects", () => {
    test("Then it will call the next function", async () => {
      Board.findById = jest.fn().mockRejectedValue(board);
      User.updateOne = jest.fn().mockResolvedValue(user);
      Board.findByIdAndDelete = jest.fn().mockResolvedValue(board);
      const req = mockAuthRequest(null, null, { idBoard });
      const res = mockResponse();
      const next = mockNextFunction();

      await deleteBoard(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it will call the next function with an error 400 'Board deletion failed'", async () => {
      Board.findById = jest.fn().mockRejectedValue(board);
      User.updateOne = jest.fn().mockResolvedValue(user);
      Board.findByIdAndDelete = jest.fn().mockResolvedValue(board);
      const req = mockAuthRequest(null, null, { idBoard });
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = badRequest("Board deletion failed");

      await deleteBoard(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When Board.findByIdAndDelete rejects", () => {
    test("Then it will call the next function", async () => {
      Board.findById = jest.fn().mockResolvedValue(board);
      Board.findByIdAndDelete = jest.fn().mockRejectedValue(board);
      User.updateOne = jest.fn().mockResolvedValue(user);
      const req = mockAuthRequest(null, null, { idBoard });
      const res = mockResponse();
      const next = mockNextFunction();

      await deleteBoard(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it will call the next function with an error 400 'Board deletion failed'", async () => {
      Board.findById = jest.fn().mockResolvedValue(board);
      Board.findByIdAndDelete = jest.fn().mockRejectedValue(board);
      User.updateOne = jest.fn().mockResolvedValue(user);
      const req = mockAuthRequest(null, null, { idBoard });
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = badRequest("Board deletion failed");

      await deleteBoard(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When User.updateOne rejects", () => {
    test("Then it will call the next function", async () => {
      Board.findById = jest.fn().mockResolvedValue(board);
      Board.findByIdAndDelete = jest.fn().mockResolvedValue(board);
      User.updateOne = jest.fn().mockRejectedValue(user);
      const req = mockAuthRequest(null, null, { idBoard });
      const res = mockResponse();
      const next = mockNextFunction();

      await deleteBoard(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it will call the next function with an error 400 'Board deletion failed'", async () => {
      Board.findById = jest.fn().mockResolvedValue(board);
      Board.findByIdAndDelete = jest.fn().mockResolvedValue(board);
      User.updateOne = jest.fn().mockRejectedValue(user);
      const req = mockAuthRequest(null, null, { idBoard });
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = badRequest("Board deletion failed");

      await deleteBoard(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a updateBoard controller", () => {
  const body = {
    updatedBoard: {
      type: "paragraph",
    },
    idBoard: new ObjectID(),
  };
  const foundBoard = {
    acknowledged: true,
    modifiedCount: 1,
    upsertedId: null,
    upsertedCount: 0,
    matchedCount: 1,
  };
  describe("When it is called", () => {
    test("Then it executes", async () => {
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();

      await updateBoard(req, res, next);
    });
  });
  describe("When it receives an updated board and a correct idBoard through the body", () => {
    test("Then calls the method json", async () => {
      Board.findById = jest.fn().mockResolvedValue({ board: "board" });
      Board.findByIdAndUpdate = jest.fn().mockResolvedValue(foundBoard);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();

      await updateBoard(req, res, next);

      expect(res.json).toHaveBeenCalled();
    });
    test("Then calls the method json with the mongoose response", async () => {
      Board.findById = jest.fn().mockResolvedValue({ board: "board" });
      Board.findByIdAndUpdate = jest.fn().mockResolvedValue(foundBoard);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();

      await updateBoard(req, res, next);

      expect(res.json).toHaveBeenCalledWith(foundBoard);
    });
    test("Then emits a status", async () => {
      Board.findById = jest.fn().mockResolvedValue({ board: "board" });
      Board.findByIdAndUpdate = jest.fn().mockResolvedValue(foundBoard);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();

      await updateBoard(req, res, next);

      expect(res.status).toHaveBeenCalled();
    });
    test("Then emits a status 204", async () => {
      Board.findById = jest.fn().mockResolvedValue({ board: "board" });
      Board.findByIdAndUpdate = jest.fn().mockResolvedValue(foundBoard);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();

      await updateBoard(req, res, next);

      expect(res.status).toHaveBeenCalledWith(204);
    });
  });
  describe("When it receives an unexisting idBoard through the body", () => {
    test("Then calls the next function", async () => {
      Board.findById = jest.fn().mockResolvedValue(null);
      Board.findByIdAndUpdate = jest.fn().mockResolvedValue(foundBoard);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();

      await updateBoard(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then calls the next function with an error 404 'Board not found'", async () => {
      Board.findById = jest.fn().mockResolvedValue(null);
      Board.findByIdAndUpdate = jest.fn().mockResolvedValue(foundBoard);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = notFound("Board not found");

      await updateBoard(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When Board.findById rejects", () => {
    test("Then calls the next function", async () => {
      Board.findById = jest.fn().mockRejectedValue(null);
      Board.findByIdAndUpdate = jest.fn().mockResolvedValue(foundBoard);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();

      await updateBoard(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then calls the next function with an error 400 'Could not update a new board'", async () => {
      Board.findById = jest.fn().mockRejectedValue(null);
      Board.findByIdAndUpdate = jest.fn().mockResolvedValue(foundBoard);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = badRequest("Could not update a new board");

      await updateBoard(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When Board.findByIdAndUpdate rejects", () => {
    test("Then calls the next function", async () => {
      Board.findById = jest.fn().mockResolvedValue({ board: "board" });
      Board.findByIdAndUpdate = jest.fn().mockRejectedValue(null);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();

      await updateBoard(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then calls the next function with an error 400 'Could not update a new board'", async () => {
      Board.findById = jest.fn().mockResolvedValue({ board: "board" });
      Board.findByIdAndUpdate = jest.fn().mockRejectedValue(null);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = badRequest("Could not update a new board");

      await updateBoard(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
