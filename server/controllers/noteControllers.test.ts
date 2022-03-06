import { expect } from "@jest/globals";
import ObjectID from "bson-objectid";
import Board from "../../database/models/Board";
import Note from "../../database/models/Note";
import {
  mockAuthRequest,
  mockNextFunction,
  mockResponse,
} from "../../utils/mocks/mockFunctionsForTests";
import { badRequest, notFound } from "../../utils/errorFunctions";
import { createNote, deleteNote, updateNote } from "./noteControllers";

jest.mock("../../database/models/Board");
jest.mock("../../database/models/Note");

describe("Given a createNote controller", () => {
  const body = {
    note: {
      type: "paragraph",
    },
    idBoard: new ObjectID(),
  };
  const boardResult = {
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

      await createNote(req, res, next);
    });
  });
  describe("When it receives a noteand a correct idBoard through the body", () => {
    test("Then calls the method json", async () => {
      Note.create = jest.fn().mockResolvedValue(body.note);
      Board.updateOne = jest.fn().mockResolvedValue(boardResult);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();

      await createNote(req, res, next);

      expect(res.json).toHaveBeenCalled();
    });
    test("Then calls the method json with the mongoose response", async () => {
      Note.create = jest.fn().mockResolvedValue(body.note);
      Board.updateOne = jest.fn().mockResolvedValue(boardResult);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();

      await createNote(req, res, next);

      expect(res.json).toHaveBeenCalledWith(boardResult);
    });
    test("Then emits a status", async () => {
      Note.create = jest.fn().mockResolvedValue(body.note);
      Board.updateOne = jest.fn().mockResolvedValue(boardResult);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();

      await createNote(req, res, next);

      expect(res.status).toHaveBeenCalled();
    });
    test("Then emits a status 204", async () => {
      Note.create = jest.fn().mockResolvedValue(body.note);
      Board.updateOne = jest.fn().mockResolvedValue(boardResult);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();

      await createNote(req, res, next);

      expect(res.status).toHaveBeenCalledWith(204);
    });
  });
  describe("When it receives a note and an unexisting idBoard through the body", () => {
    test("Then calls the next function", async () => {
      Note.create = jest.fn().mockResolvedValue(body.note);
      Board.updateOne = jest.fn().mockResolvedValue(null);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();

      await createNote(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then calls the next function with an error 404 'Board not found'", async () => {
      Note.create = jest.fn().mockResolvedValue(body.note);
      Board.updateOne = jest.fn().mockResolvedValue(null);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = notFound("Board not found");

      await createNote(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When Note.create rejects", () => {
    test("Then calls the next function", async () => {
      Note.create = jest.fn().mockRejectedValue(body.note);
      Board.updateOne = jest.fn().mockResolvedValue(null);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();

      await createNote(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then calls the next function with an error 400 'Could not create a new note'", async () => {
      Note.create = jest.fn().mockRejectedValue(body.note);
      Board.updateOne = jest.fn().mockResolvedValue(null);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = badRequest("Could not create a new note");

      await createNote(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When Board.updateOne rejects", () => {
    test("Then calls the next function", async () => {
      Note.create = jest.fn().mockResolvedValue(body.note);
      Board.updateOne = jest.fn().mockRejectedValue(null);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();

      await createNote(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then calls the next function with an error 400 'Could not create a new note'", async () => {
      Note.create = jest.fn().mockResolvedValue(body.note);
      Board.updateOne = jest.fn().mockRejectedValue(null);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = badRequest("Could not create a new note");

      await createNote(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a deleteNote controller", () => {
  const params = {
    idNote: new ObjectID(),
    idBoard: new ObjectID(),
  };
  describe("When it is called", () => {
    test("Then it executes", async () => {
      const req = mockAuthRequest(null, null, params);
      const res = mockResponse();
      const next = mockNextFunction();

      await deleteNote(req, res, next);
    });
  });
  describe("When it receives a correct idBoard and idNote through params", () => {
    test("Then calls the method json", async () => {
      Note.findById = jest.fn().mockResolvedValue({ note: "note" });
      Board.updateOne = jest.fn().mockResolvedValue({ board: "board" });
      Note.findByIdAndDelete = jest.fn().mockResolvedValue({ note: "note" });
      const req = mockAuthRequest(null, null, params);
      const res = mockResponse();
      const next = mockNextFunction();

      await deleteNote(req, res, next);

      expect(res.json).toHaveBeenCalled();
    });
    test("Then calls the method json with a message", async () => {
      Note.findById = jest.fn().mockResolvedValue({ note: "note" });
      Board.updateOne = jest.fn().mockResolvedValue({ board: "board" });
      Note.findByIdAndDelete = jest.fn().mockResolvedValue({ note: "note" });
      const req = mockAuthRequest(null, null, params);
      const res = mockResponse();
      const next = mockNextFunction();

      await deleteNote(req, res, next);

      expect(res.json).toHaveBeenCalledWith({
        message: "deleted note successfully",
      });
    });
    test("Then emits a status", async () => {
      Note.findById = jest.fn().mockResolvedValue({ note: "note" });
      Board.updateOne = jest.fn().mockResolvedValue({ board: "board" });
      Note.findByIdAndDelete = jest.fn().mockResolvedValue({ note: "note" });
      const req = mockAuthRequest(null, null, params);
      const res = mockResponse();
      const next = mockNextFunction();

      await deleteNote(req, res, next);

      expect(res.status).toHaveBeenCalled();
    });
    test("Then emits a status 200", async () => {
      Note.findById = jest.fn().mockResolvedValue({ note: "note" });
      Board.updateOne = jest.fn().mockResolvedValue({ board: "board" });
      Note.findByIdAndDelete = jest.fn().mockResolvedValue({ note: "note" });
      const req = mockAuthRequest(null, null, params);
      const res = mockResponse();
      const next = mockNextFunction();

      await deleteNote(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
  describe("When it receives an unexisting idNote through params", () => {
    test("Then calls the next function", async () => {
      Note.findById = jest.fn().mockResolvedValue(null);
      Board.updateOne = jest.fn().mockResolvedValue({ board: "board" });
      Note.findByIdAndDelete = jest.fn().mockResolvedValue({ note: "note" });
      const req = mockAuthRequest(null, null, params);
      const res = mockResponse();
      const next = mockNextFunction();

      await deleteNote(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then calls the next function with an error 404 'Note not found'", async () => {
      Note.findById = jest.fn().mockResolvedValue(null);
      Board.updateOne = jest.fn().mockResolvedValue({ board: "board" });
      Note.findByIdAndDelete = jest.fn().mockResolvedValue({ note: "note" });
      const req = mockAuthRequest(null, null, params);
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = notFound("Note not found");

      await deleteNote(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When it receives an unexisting idBoard through params", () => {
    test("Then calls the next function", async () => {
      Note.findById = jest.fn().mockResolvedValue({ note: "note" });
      Board.updateOne = jest.fn().mockResolvedValue(null);
      Note.findByIdAndDelete = jest.fn().mockResolvedValue({ note: "note" });
      const req = mockAuthRequest(null, null, params);
      const res = mockResponse();
      const next = mockNextFunction();

      await deleteNote(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then calls the next function with an error 404 'Board not found'", async () => {
      Note.findById = jest.fn().mockResolvedValue({ note: "note" });
      Board.updateOne = jest.fn().mockResolvedValue(null);
      Note.findByIdAndDelete = jest.fn().mockResolvedValue({ note: "note" });
      const req = mockAuthRequest(null, null, params);
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = notFound("Board not found");

      await deleteNote(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When Note.findById rejects", () => {
    test("Then calls the next function", async () => {
      Note.findById = jest.fn().mockRejectedValue({ note: "note" });
      Board.updateOne = jest.fn().mockResolvedValue({ board: "board" });
      Note.findByIdAndDelete = jest.fn().mockResolvedValue({ note: "note" });
      const req = mockAuthRequest(null, null, params);
      const res = mockResponse();
      const next = mockNextFunction();

      await deleteNote(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then calls the next function with an error 400 'Note deletion failed'", async () => {
      Note.findById = jest.fn().mockRejectedValue({ note: "note" });
      Board.updateOne = jest.fn().mockResolvedValue({ board: "board" });
      Note.findByIdAndDelete = jest.fn().mockResolvedValue({ note: "note" });
      const req = mockAuthRequest(null, null, params);
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = badRequest("Note deletion failed");

      await deleteNote(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When Board.updateOne rejects", () => {
    test("Then calls the next function", async () => {
      Note.findById = jest.fn().mockRejectedValue({ note: "note" });
      Board.updateOne = jest.fn().mockRejectedValue({ board: "board" });
      Note.findByIdAndDelete = jest.fn().mockResolvedValue({ note: "note" });
      const req = mockAuthRequest(null, null, params);
      const res = mockResponse();
      const next = mockNextFunction();

      await deleteNote(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then calls the next function with an error 400 'Note deletion failed'", async () => {
      Note.findById = jest.fn().mockRejectedValue({ note: "note" });
      Board.updateOne = jest.fn().mockRejectedValue({ board: "board" });
      Note.findByIdAndDelete = jest.fn().mockResolvedValue({ note: "note" });
      const req = mockAuthRequest(null, null, params);
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = badRequest("Note deletion failed");

      await deleteNote(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When Note.findByIdAndDelete rejects", () => {
    test("Then calls the next function", async () => {
      Note.findById = jest.fn().mockRejectedValue({ note: "note" });
      Board.updateOne = jest.fn().mockResolvedValue({ board: "board" });
      Note.findByIdAndDelete = jest.fn().mockRejectedValue({ note: "note" });
      const req = mockAuthRequest(null, null, params);
      const res = mockResponse();
      const next = mockNextFunction();

      await deleteNote(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then calls the next function with an error 400 'Note deletion failed'", async () => {
      Note.findById = jest.fn().mockRejectedValue({ note: "note" });
      Board.updateOne = jest.fn().mockResolvedValue({ board: "board" });
      Note.findByIdAndDelete = jest.fn().mockRejectedValue({ note: "note" });
      const req = mockAuthRequest(null, null, params);
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = badRequest("Note deletion failed");

      await deleteNote(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
describe("Given a updateNote controller", () => {
  const body = {
    updatedNote: {
      type: "paragraph",
    },
    idNote: new ObjectID(),
  };
  const foundNote = {
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

      await updateNote(req, res, next);
    });
  });
  describe("When it receives an updated note and a correct idNote through the body", () => {
    test("Then calls the method json", async () => {
      Note.findById = jest.fn().mockResolvedValue({ note: "note" });
      Note.findByIdAndUpdate = jest.fn().mockResolvedValue(foundNote);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();

      await updateNote(req, res, next);

      expect(res.json).toHaveBeenCalled();
    });
    test("Then calls the method json with the mongoose response", async () => {
      Note.findById = jest.fn().mockResolvedValue({ note: "note" });
      Note.findByIdAndUpdate = jest.fn().mockResolvedValue(foundNote);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();

      await updateNote(req, res, next);

      expect(res.json).toHaveBeenCalledWith(foundNote);
    });
    test("Then emits a status", async () => {
      Note.findById = jest.fn().mockResolvedValue({ note: "note" });
      Note.findByIdAndUpdate = jest.fn().mockResolvedValue(foundNote);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();

      await updateNote(req, res, next);

      expect(res.status).toHaveBeenCalled();
    });
    test("Then emits a status 204", async () => {
      Note.findById = jest.fn().mockResolvedValue({ note: "note" });
      Note.findByIdAndUpdate = jest.fn().mockResolvedValue(foundNote);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();

      await updateNote(req, res, next);

      expect(res.status).toHaveBeenCalledWith(204);
    });
  });
  describe("When it receives an unexisting idNote through the body", () => {
    test("Then calls the next function", async () => {
      Note.findById = jest.fn().mockResolvedValue(null);
      Note.findByIdAndUpdate = jest.fn().mockResolvedValue(foundNote);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();

      await updateNote(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then calls the next function with an error 404 'Note not found'", async () => {
      Note.findById = jest.fn().mockResolvedValue(null);
      Note.findByIdAndUpdate = jest.fn().mockResolvedValue(foundNote);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = notFound("Note not found");

      await updateNote(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When Note.findById rejects", () => {
    test("Then calls the next function", async () => {
      Note.findById = jest.fn().mockRejectedValue(null);
      Note.findByIdAndUpdate = jest.fn().mockResolvedValue(foundNote);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();

      await updateNote(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then calls the next function with an error 400 'Could not update a new note'", async () => {
      Note.findById = jest.fn().mockRejectedValue(null);
      Note.findByIdAndUpdate = jest.fn().mockResolvedValue(foundNote);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = badRequest("Could not update a new note");

      await updateNote(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When Note.findByIdAndUpdate rejects", () => {
    test("Then calls the next function", async () => {
      Note.findById = jest.fn().mockResolvedValue({ note: "note" });
      Note.findByIdAndUpdate = jest.fn().mockRejectedValue(null);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();

      await updateNote(req, res, next);

      expect(next).toHaveBeenCalled();
    });
    test("Then calls the next function with an error 400 'Could not update a new note'", async () => {
      Note.findById = jest.fn().mockResolvedValue({ note: "note" });
      Note.findByIdAndUpdate = jest.fn().mockRejectedValue(null);
      const req = mockAuthRequest(body);
      const res = mockResponse();
      const next = mockNextFunction();
      const expectedError = badRequest("Could not update a new note");

      await updateNote(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
