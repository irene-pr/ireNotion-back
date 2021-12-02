import { before, cy, describe, expect, it } from "local-cypress";
import { getRandomNewUserForCypress } from "../../utils/Factories/usersFactory";

describe("Given a /user/register endpoint", () => {
  describe("When you send appropiate name, username and password", () => {
    it("Then it will get sent", () => {
      const randomUserBody: any = getRandomNewUserForCypress();
      cy.request("POST", "http://localhost:1000/user/register", randomUserBody);
    });
    it("Then the response will send status 200", () => {
      const randomUserBody: any = getRandomNewUserForCypress();
      cy.request("POST", "http://localhost:1000/user/register", randomUserBody)
        .its("status")
        .should("equal", 200);
    });
    it("Then the response will be faster than half a second", () => {
      const randomUserBody: any = getRandomNewUserForCypress();
      cy.request("POST", "http://localhost:1000/user/register", randomUserBody)
        .its("duration")
        .should("not.be.greaterThan", 400);
    });
    it("Then the response the json of the body will have the properties name, usrname, password, id and boards", () => {
      const randomUserBody: any = getRandomNewUserForCypress();
      cy.request(
        "POST",
        "http://localhost:1000/user/register",
        randomUserBody
      ).then((response) => {
        expect(response.body).to.have.property("name", randomUserBody.name);
        expect(response.body).to.have.property(
          "username",
          randomUserBody.username
        );
        expect(response.body).to.have.property("password");
        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("boards");
      });
    });
    it("Then the response the json of the body will have an empty board array", () => {
      const randomUserBody: any = getRandomNewUserForCypress();
      cy.request("POST", "http://localhost:1000/user/register", randomUserBody)
        .its("body")
        .should("have.a.property", "boards")
        .and("and.deep.equal", []);
    });
  });
  describe("When you send an already existing username", () => {
    it("Then response send status 400", () => {
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/register",
        body: {
          name: "NalaNala",
          username: "NalaNala",
          password: "NalaNala",
        },
        failOnStatusCode: false,
      })
        .its("status")
        .should("equal", 400);
    });
    it("Then response sends error 'Username already exists'", () => {
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/register",
        body: {
          name: "NalaNala",
          username: "NalaNala",
          password: "NalaNala",
        },
        failOnStatusCode: false,
      })
        .its("body")
        .should("have.deep.property", "error")
        .should("equal", "Username already exists");
    });
  });
  describe("When you send a password that's longer than 20 characters", () => {
    it("Then the response will send status 400", () => {
      const randomUserBody: any = getRandomNewUserForCypress();
      randomUserBody.password =
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/register",
        body: randomUserBody,
        failOnStatusCode: false,
      })
        .its("status")
        .should("equal", 400);
    });
    it("Then the response will send 'Validation Failed'", () => {
      const randomUserBody: any = getRandomNewUserForCypress();
      randomUserBody.password =
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/register",
        body: randomUserBody,
        failOnStatusCode: false,
      })
        .its("body")
        .should("have.deep.property", "error")
        .should("equal", "Validation Failed");
    });
  });
  describe("When you send a password that's shorter than 7 characters", () => {
    it("Then the response will send status 400", () => {
      const randomUserBody: any = getRandomNewUserForCypress();
      randomUserBody.password = "aaaa";
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/register",
        body: randomUserBody,
        failOnStatusCode: false,
      })
        .its("status")
        .should("equal", 400);
    });
    it("Then the response will send 'Validation Failed'", () => {
      const randomUserBody: any = getRandomNewUserForCypress();
      randomUserBody.password = "aaaa";
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/register",
        body: randomUserBody,
        failOnStatusCode: false,
      })
        .its("body")
        .should("have.deep.property", "error")
        .should("equal", "Validation Failed");
    });
  });
  describe("When you send no password", () => {
    it("Then the response will send status 400", () => {
      const randomUserBody: any = getRandomNewUserForCypress();
      delete randomUserBody.password;
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/register",
        body: randomUserBody,
        failOnStatusCode: false,
      })
        .its("status")
        .should("equal", 400);
    });
    it("Then the response will send 'Validation Failed'", () => {
      const randomUserBody: any = getRandomNewUserForCypress();
      delete randomUserBody.password;
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/register",
        body: randomUserBody,
        failOnStatusCode: false,
      })
        .its("body")
        .should("have.deep.property", "error")
        .should("equal", "Validation Failed");
    });
  });
  describe("When you send no name", () => {
    it("Then the response will send status 400", () => {
      const randomUserBody: any = getRandomNewUserForCypress();
      delete randomUserBody.name;
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/register",
        body: randomUserBody,
        failOnStatusCode: false,
      })
        .its("status")
        .should("equal", 400);
    });
    it("Then the response will send 'Validation Failed'", () => {
      const randomUserBody: any = getRandomNewUserForCypress();
      delete randomUserBody.name;
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/register",
        body: randomUserBody,
        failOnStatusCode: false,
      })
        .its("body")
        .should("have.deep.property", "error")
        .should("equal", "Validation Failed");
    });
  });
  describe("When you send no username", () => {
    it("Then the response will send status 400", () => {
      const randomUserBody: any = getRandomNewUserForCypress();
      delete randomUserBody.username;
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/register",
        body: randomUserBody,
        failOnStatusCode: false,
      })
        .its("status")
        .should("be.equal", 400);
    });
    it("Then the response will send 'Validation Failed'", () => {
      const randomUserBody: any = getRandomNewUserForCypress();
      delete randomUserBody.username;
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/register",
        body: randomUserBody,
        failOnStatusCode: false,
      })
        .its("body")
        .should("have.deep.property", "error")
        .should("equal", "Validation Failed");
    });
  });
});

describe("Given a /user/login endpoint", () => {
  const existingUser: any = { username: "NalaNala", password: "NalaNala" };
  const impostor: any = { username: "impostor", password: "impostor" };
  before(() => {
    cy.request("POST", "http://localhost:1000/user/register", existingUser);
  });

  describe("When it receives an existing username and correct password", () => {
    it("Then it will get sent", () => {
      cy.request("POST", "http://localhost:1000/user/login", existingUser);
    });
    it("Then the response will send status 200", () => {
      cy.request("POST", "http://localhost:1000/user/login", existingUser)
        .its("status")
        .should("equal", 200);
    });
    it("Then the response body will send an object with the token property", () => {
      cy.request("POST", "http://localhost:1000/user/login", existingUser)
        .its("body")
        .should("have.deep.property", "token");
    });
    it("Then the response body will be faster than half a second", () => {
      cy.request("POST", "http://localhost:1000/user/login", existingUser)
        .its("duration")
        .should("not.be.greaterThan", 500);
    });
  });
  describe("When it receives a non existing username", () => {
    it("Then the response will send status 401", () => {
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/login",
        body: impostor,
        failOnStatusCode: false,
      })
        .its("status")
        .should("equal", 401);
    });
    it("Then the response body will send an object error: 'Wrong credentials", () => {
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/login",
        body: impostor,
        failOnStatusCode: false,
      })
        .its("body")
        .should("have.deep.property", "error")
        .should("equal", "Wrong credentials");
    });
  });
  describe("When it receives an existing user with a wrong password", () => {
    it("Then the response will send status 401", () => {
      existingUser.password = "wrongPassword123";
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/login",
        body: impostor,
        failOnStatusCode: false,
      })
        .its("status")
        .should("equal", 401);
    });
    it("Then the response body will send an object error : 'Wrong credentials", () => {
      existingUser.password = "wrongPassword123";
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/login",
        body: impostor,
        failOnStatusCode: false,
      })
        .its("body")
        .should("have.deep.property", "error")
        .should("equal", "Wrong credentials");
    });
  });
  describe("When it receives no username", () => {
    it("Then the response will send status 400", () => {
      delete existingUser.username;
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/login",
        body: existingUser,
        failOnStatusCode: false,
      })
        .its("status")
        .should("equal", 400);
    });
    it("Then the response body will send an object error : 'Validation Failed", () => {
      delete existingUser.username;
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/login",
        body: existingUser,
        failOnStatusCode: false,
      })
        .its("body")
        .should("have.deep.property", "error")
        .should("equal", "Validation Failed");
    });
  });
  describe("When it receives no password", () => {
    it("Then the response will send status 400", () => {
      delete existingUser.password;
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/login",
        body: existingUser,
        failOnStatusCode: false,
      })
        .its("status")
        .should("equal", 400);
    });
    it("Then the response body will send an object error : 'Validation Failed", () => {
      delete existingUser.password;
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/login",
        body: existingUser,
        failOnStatusCode: false,
      })
        .its("body")
        .should("have.deep.property", "error")
        .should("equal", "Validation Failed");
    });
  });
  describe("When it receives a password shorter than 7 characters", () => {
    it("Then the response will send status 400", () => {
      existingUser.password = "Nala";
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/login",
        body: existingUser,
        failOnStatusCode: false,
      })
        .its("status")
        .should("equal", 400);
    });
    it("Then the response body will send an object error : 'Validation Failed", () => {
      existingUser.password = "Nala";
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/login",
        body: existingUser,
        failOnStatusCode: false,
      })
        .its("body")
        .should("have.deep.property", "error")
        .should("equal", "Validation Failed");
    });
  });
  describe("When it receives a password longer than 20 characters", () => {
    it("Then the response will send status 400", () => {
      existingUser.password = "Nalaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/login",
        body: existingUser,
        failOnStatusCode: false,
      })
        .its("status")
        .should("equal", 400);
    });
    it("Then the response body will send an object error : 'Validation Failed", () => {
      existingUser.password = "Nalaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/login",
        body: existingUser,
        failOnStatusCode: false,
      })
        .its("body")
        .should("have.deep.property", "error")
        .should("equal", "Validation Failed");
    });
  });
});
