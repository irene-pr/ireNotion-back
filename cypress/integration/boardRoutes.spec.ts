import { before, cy, describe, it } from "local-cypress";
import { getRandomNewBoard } from "../../utils/Factories/boardFactory";

describe("Given a /boards/create/ endpoint", () => {
  let newBoard: any;
  let existingUser: any;
  let token: any;
  let idBoard: string;
  before(() => {
    newBoard = getRandomNewBoard();
    existingUser = { username: "NalaNala", password: "NalaNala" };
    cy.request("POST", "http://localhost:1000/user/login", existingUser).then(
      (response) => {
        token = response.body.token;
      }
    );
  });
  afterEach(() => {
    cy.request({
      method: "DELETE",
      url: `http://localhost:1000/boards/delete/${idBoard}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  });
  describe("When it receives an existing user id fro params", () => {
    it("Then it will create a board", () => {
      cy.request({
        method: "POST",
        url: "http://localhost:1000/boards/create",
        body: newBoard,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        idBoard = response.body.id;
      });
    });

    it.skip("Then it will emit a status 204", () => {
      cy.request({
        method: "POST",
        url: "http://localhost:1000/boards/create",
        body: newBoard,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .its("status")
        .should("equal", 204);
    });
  });
});
