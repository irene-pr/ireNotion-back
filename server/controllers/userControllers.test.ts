import {
  mockRequest,
  mockResponse,
  nextFunction,
} from "../../utils/mocks/mockFunctionsForTests";
import registerUser from "./userControllers";

describe("Given a registerUser controller,", () => {
  describe("When it receives a user with an already existing username,", () => {
    test("Then it executes", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const next = nextFunction();
      // const expectedError = newError(400, "Username already exists");

      await registerUser(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
