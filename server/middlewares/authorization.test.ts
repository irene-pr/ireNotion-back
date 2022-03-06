import { expect } from "@jest/globals";
import ObjectID from "bson-objectid";
import Board from "../../database/models/Board";
import Note from "../../database/models/Note";
import {
  mockAuthRequest,
  mockNextFunction,
  mockResponse,
} from "../../utils/mocks/mockFunctionsForTests";
import { badRequest, notFound, unauthorized } from "../../utils/errorFunctions";
import { authorizationForBoard, authorizationForNote } from "./authorization";

jest.setTimeout(50000);
jest.mock("../../database/models/Board");
jest.mock("../../database/models/Note");

describe("Given a authorizationForBoard middleware", () => {
  let idBoard: any;
  let userId: any;
  let foundBoard: any;
  beforeEach(() => {
    idBoard = new ObjectID();
    userId = new ObjectID();
    foundBoard = { board: "board", userId };
  });
  describe("When it is called", () => {
    test("Then it executes", async () => {
      const req = mockAuthRequest(null, null, idBoard);
      const res = mockResponse();
      const next = mockNextFunction();

      await authorizationForBoard(req, res, next);
    });
  });
  describe("When it receives an idBoard via params that belongs to the user logged in", () => {
    test("Then the idUser's received and found match", async () => {
      Board.findById = jest.fn().mockResolvedValue(foundBoard);
      const req = mockAuthRequest(null, null, idBoard, userId);
      const res = mockResponse();
      const next = mockNextFunction();

      await authorizationForBoard(req, res, next);

      expect(`${req.userId}`).toBe(`${foundBoard.userId}`);
    });
    test("Then it calls the next function", async () => {
      Board.findById = jest.fn().mockResolvedValue(foundBoard);
      const req = mockAuthRequest(null, null, idBoard, userId);
      const res = mockResponse();
      const next = mockNextFunction();

      await authorizationForBoard(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
  describe("When it receives an idBoard via body that belongs to the user logged in", () => {
    test("Then the idUser's received and found match", async () => {
      Board.findById = jest.fn().mockResolvedValue(foundBoard);
      const req = mockAuthRequest(
        { idBoard },
        null,
        { idBoard: undefined },
        userId
      );
      const res = mockResponse();
      const next = mockNextFunction();

      await authorizationForBoard(req, res, next);

      expect(`${req.userId}`).toBe(`${foundBoard.userId}`);
    });
    test("Then it calls the next function", async () => {
      Board.findById = jest.fn().mockResolvedValue(foundBoard);
      const req = mockAuthRequest(
        { idBoard },
        null,
        { idBoard: undefined },
        userId
      );
      const res = mockResponse();
      const next = mockNextFunction();

      await authorizationForBoard(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
  describe("When it receives an idBoard via params that doesn't belong to the user logged in", () => {
    test("Then the idUser's received and found don't match", async () => {
      foundBoard.userId = new ObjectID();
      Board.findById = jest.fn().mockResolvedValue(foundBoard);
      const req = mockAuthRequest(
        { idBoard: undefined },
        null,
        idBoard,
        userId
      );
      const res = mockResponse();
      const next = mockNextFunction();

      await authorizationForBoard(req, res, next);

      expect(`${req.userId}`).not.toBe(`${foundBoard.userId}`);
    });
    test("Then it calls the next function", async () => {
      foundBoard.userId = new ObjectID();
      Board.findById = jest.fn().mockResolvedValue(foundBoard);
      const req = mockAuthRequest(
        { idBoard: undefined },
        null,
        idBoard,
        userId
      );
      const res = mockResponse();
      const next = mockNextFunction();

      await authorizationForBoard(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it calls the next function with an error 404 'User not allowed'", async () => {
      foundBoard.userId = new ObjectID();
      Board.findById = jest.fn().mockResolvedValue(foundBoard);
      const req = mockAuthRequest(
        { idBoard: undefined },
        null,
        idBoard,
        userId
      );
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = unauthorized("User not allowed");

      await authorizationForBoard(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When it receives an idBoard via body that doesn't belong to the user logged in", () => {
    test("Then the idUser's received and found don't match", async () => {
      foundBoard.userId = new ObjectID();
      Board.findById = jest.fn().mockResolvedValue(foundBoard);
      const req = mockAuthRequest({ idBoard }, null, undefined, userId);
      const res = mockResponse();
      const next = mockNextFunction();

      await authorizationForBoard(req, res, next);

      expect(`${req.userId}`).not.toBe(`${foundBoard.userId}`);
    });
    test("Then it calls the next function", async () => {
      foundBoard.userId = new ObjectID();
      Board.findById = jest.fn().mockResolvedValue(foundBoard);
      const req = mockAuthRequest({ idBoard }, null, undefined, userId);
      const res = mockResponse();
      const next = mockNextFunction();

      await authorizationForBoard(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it calls the next function with an error 404 'User not allowed'", async () => {
      foundBoard.userId = new ObjectID();
      Board.findById = jest.fn().mockResolvedValue(foundBoard);
      const req = mockAuthRequest({ idBoard }, null, undefined, userId);
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = unauthorized("User not allowed");

      await authorizationForBoard(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When it receives an unexisting idBoard via params", () => {
    test("Then it calls the next function", async () => {
      Board.findById = jest.fn().mockResolvedValue(null);
      const req = mockAuthRequest(
        { idBoard: undefined },
        null,
        idBoard,
        new ObjectID()
      );
      const res = mockResponse();
      const next = mockNextFunction();

      await authorizationForBoard(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it calls the next function with an error 404 'Board not found'", async () => {
      Board.findById = jest.fn().mockResolvedValue(null);
      const req = mockAuthRequest(
        { idBoard: undefined },
        null,
        idBoard,
        new ObjectID()
      );
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = notFound("Board not found");

      await authorizationForBoard(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When it receives an unexisting idBoard via body", () => {
    test("Then it calls the next function", async () => {
      Board.findById = jest.fn().mockResolvedValue(null);
      const req = mockAuthRequest({ idBoard }, null, undefined, new ObjectID());
      const res = mockResponse();
      const next = mockNextFunction();

      await authorizationForBoard(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it calls the next function with an error 404 'Board not found'", async () => {
      Board.findById = jest.fn().mockResolvedValue(null);
      const req = mockAuthRequest({ idBoard }, null, undefined, new ObjectID());
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = notFound("Board not found");

      await authorizationForBoard(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When Board.findById rejects", () => {
    test("Then it calls the next function", async () => {
      Board.findById = jest.fn().mockRejectedValue(null);
      const req = mockAuthRequest(null, null, idBoard, new ObjectID());
      const res = mockResponse();
      const next = mockNextFunction();

      await authorizationForBoard(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it calls the next function with an error 401 'Failed Authorization to access board modification'", async () => {
      Board.findById = jest.fn().mockRejectedValue(null);
      const req = mockAuthRequest(null, null, idBoard, new ObjectID());
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = badRequest(
        "Failed Authorization to access board modification"
      );

      await authorizationForBoard(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a authorizationForNote middleware", () => {
  let idNote: any;
  let userId: any;
  let foundNote: any;
  beforeEach(() => {
    idNote = new ObjectID();
    userId = new ObjectID();
    foundNote = { note: "note", userId };
  });
  describe("When it is called", () => {
    test("Then it executes", async () => {
      const req = mockAuthRequest(null, null, null);
      const res = mockResponse();
      const next = mockNextFunction();

      await authorizationForNote(req, res, next);
    });
  });
  describe("When it receives an idNote via params that belongs to the user logged in", () => {
    test("Then the idUser's received and found match", async () => {
      Note.findById = jest.fn().mockResolvedValue(foundNote);
      const req = mockAuthRequest(null, null, idNote, userId);
      const res = mockResponse();
      const next = mockNextFunction();

      await authorizationForNote(req, res, next);

      expect(`${req.userId}`).toBe(`${foundNote.userId}`);
    });
    test("Then it calls the next function", async () => {
      Note.findById = jest.fn().mockResolvedValue(foundNote);
      const req = mockAuthRequest(null, null, idNote, userId);
      const res = mockResponse();
      const next = mockNextFunction();

      await authorizationForNote(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
  describe("When it receives an idNote via body that belongs to the user logged in", () => {
    test("Then the idUser's received and found match", async () => {
      Note.findById = jest.fn().mockResolvedValue(foundNote);
      const req = mockAuthRequest(
        { idNote },
        null,
        { idNote: undefined },
        userId
      );
      const res = mockResponse();
      const next = mockNextFunction();

      await authorizationForNote(req, res, next);

      expect(`${req.userId}`).toBe(`${foundNote.userId}`);
    });
    test("Then it calls the next function", async () => {
      Note.findById = jest.fn().mockResolvedValue(foundNote);
      const req = mockAuthRequest(
        { idNote },
        null,
        { idNote: undefined },
        userId
      );
      const res = mockResponse();
      const next = mockNextFunction();

      await authorizationForNote(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
  describe("When it receives an idNote via params that doesn't belong to the user logged in", () => {
    test("Then the idUser's received and found don't match", async () => {
      foundNote.userId = new ObjectID();
      Note.findById = jest.fn().mockResolvedValue(foundNote);
      const req = mockAuthRequest({ idNote: undefined }, null, idNote, userId);
      const res = mockResponse();
      const next = mockNextFunction();

      await authorizationForNote(req, res, next);

      expect(`${req.userId}`).not.toBe(`${foundNote.userId}`);
    });
    test("Then it calls the next function", async () => {
      foundNote.userId = new ObjectID();
      Note.findById = jest.fn().mockResolvedValue(foundNote);
      const req = mockAuthRequest({ idNote: undefined }, null, idNote, userId);
      const res = mockResponse();
      const next = mockNextFunction();

      await authorizationForNote(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it calls the next function with an error 401 'User not allowed'", async () => {
      foundNote.userId = new ObjectID();
      Note.findById = jest.fn().mockResolvedValue(foundNote);
      const req = mockAuthRequest({ idNote: undefined }, null, idNote, userId);
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = unauthorized("User not allowed");

      await authorizationForNote(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When it receives an idNote via body that doesn't belong to the user logged in", () => {
    test("Then the idUser's received and found don't match", async () => {
      foundNote.userId = new ObjectID();
      Note.findById = jest.fn().mockResolvedValue(foundNote);
      const req = mockAuthRequest({ idNote }, null, undefined, userId);
      const res = mockResponse();
      const next = mockNextFunction();

      await authorizationForNote(req, res, next);

      expect(`${req.userId}`).not.toBe(`${foundNote.userId}`);
    });
    test("Then it calls the next function", async () => {
      foundNote.userId = new ObjectID();
      Note.findById = jest.fn().mockResolvedValue(foundNote);
      const req = mockAuthRequest({ idNote }, null, undefined, userId);
      const res = mockResponse();
      const next = mockNextFunction();

      await authorizationForNote(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it calls the next function with an error 401 'User not allowed'", async () => {
      foundNote.userId = new ObjectID();
      Note.findById = jest.fn().mockResolvedValue(foundNote);
      const req = mockAuthRequest({ idNote }, null, undefined, userId);
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = unauthorized("User not allowed");

      await authorizationForNote(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When it receives an unexisting idNote via params", () => {
    test("Then it calls the next function", async () => {
      Note.findById = jest.fn().mockResolvedValue(null);
      const req = mockAuthRequest(
        { idNote: undefined },
        null,
        idNote,
        new ObjectID()
      );
      const res = mockResponse();
      const next = mockNextFunction();

      await authorizationForNote(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it calls the next function with an error 404 'Note not found'", async () => {
      Note.findById = jest.fn().mockResolvedValue(null);
      const req = mockAuthRequest(
        { idNote: undefined },
        null,
        idNote,
        new ObjectID()
      );
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = notFound("Note not found");

      await authorizationForNote(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When it receives an unexisting idNote via body", () => {
    test("Then it calls the next function", async () => {
      Note.findById = jest.fn().mockResolvedValue(null);
      const req = mockAuthRequest({ idNote }, null, undefined, new ObjectID());
      const res = mockResponse();
      const next = mockNextFunction();

      await authorizationForNote(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it calls the next function with an error 404 'Note not found'", async () => {
      Note.findById = jest.fn().mockResolvedValue(null);
      const req = mockAuthRequest({ idNote }, null, undefined, new ObjectID());
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = notFound("Note not found");

      await authorizationForNote(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When Note.findById rejects", () => {
    test("Then it calls the next function", async () => {
      Note.findById = jest.fn().mockRejectedValue(null);
      const req = mockAuthRequest(null, null, idNote, new ObjectID());
      const res = mockResponse();
      const next = mockNextFunction();

      await authorizationForNote(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then it calls the next function with an error 401 'Failed Authorization to access note modification'", async () => {
      Note.findById = jest.fn().mockRejectedValue(null);
      const req = mockAuthRequest(null, null, idNote, new ObjectID());
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = badRequest(
        "Failed Authorization to access note modification"
      );

      await authorizationForNote(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
