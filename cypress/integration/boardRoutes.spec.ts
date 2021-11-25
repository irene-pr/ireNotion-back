import { describe } from "local-cypress";
import { getRandomNewBoard } from "../../utils/Factories/boardFactory";
import tokenTestLoginNala from "../cypressEnvs";

describe("Given a /boards/create/:idUser endpoint", () => {
  let newBoard: any;
  let idUser: any;
  beforeEach(() => {
    newBoard = getRandomNewBoard();
    idUser = "619fb13ad827562324b843db";
  });
  describe("When it receives an existing user id fro params", () => {
    it("Then it will create a board", () => {
      cy.request({
        method: "POST",
        url: "http://localhost:1000/boards/create/:idUser".replace(
          ":idUser",
          idUser
        ),
        body: newBoard,
        headers: {
          Authorization: `Bearer ${tokenTestLoginNala}`,
        },
      });
    });
    it("Then it will emit a status 204", () => {
      cy.request({
        method: "POST",
        url: "http://localhost:1000/boards/create/:idUser".replace(
          ":idUser",
          idUser
        ),
        body: newBoard,
        headers: {
          Authorization: `Bearer ${tokenTestLoginNala}`,
        },
      }).then((response) => {
        expect(response.status).to.equal(204);
      });
    });
  });
});
