import { cy, it } from "local-cypress";
import { getRandomNewUserForCypress } from "../../utils/Factories/usersFactory";

describe.skip("Given a /user/register endpoint", () => {
  // Porque 200 y no 201?
  describe("When you send appropiate name, username and password", () => {
    it("Then it will get sent", () => {
      const randomUserBody: any = getRandomNewUserForCypress();
      cy.request("POST", "http://localhost:1000/user/register", randomUserBody);
    });
    it("Then the response will send status 200", () => {
      const randomUserBody: any = getRandomNewUserForCypress();
      cy.request(
        "POST",
        "http://localhost:1000/user/register",
        randomUserBody
      ).then((response) => {
        expect(response).have.property("status", 200);
      });
    });
    it("Then the response will be faster than half a second", () => {
      const randomUserBody: any = getRandomNewUserForCypress();
      cy.request(
        "POST",
        "http://localhost:1000/user/register",
        randomUserBody
      ).then((response) => {
        expect(response.duration).to.be.lessThan(500);
      });
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
        expect(response.body.boards).to.deep.equal([]);
      });
    });
  });
  describe("When you send an already existing username", () => {
    it("Then response sends status 400", () => {
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/register",
        body: {
          name: "NalaNala",
          username: "NalaNala",
          password: "NalaNala",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(400);
      });
    });
    it("Then response sends status 400", () => {
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/register",
        body: {
          name: "NalaNala",
          username: "NalaNala",
          password: "NalaNala",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.body).to.deep.equal({
          error: "Username already exists",
        });
      });
    });
  });
  // Validation Errors de joi:
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
      }).then((response) => {
        expect(response.status).to.equal(400);
      });
    });
    it("Then the response will send 'Validation Error'", () => {
      const randomUserBody: any = getRandomNewUserForCypress();
      randomUserBody.password =
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/register",
        body: randomUserBody,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.body).to.deep.equal({ error: "Validation Failed" });
      });
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
      }).then((response) => {
        expect(response.status).to.equal(400);
      });
    });
    it("Then the response will send 'Validation Error'", () => {
      const randomUserBody: any = getRandomNewUserForCypress();
      randomUserBody.password = "aaaa";
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/register",
        body: randomUserBody,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.body).to.deep.equal({ error: "Validation Failed" });
      });
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
      }).then((response) => {
        expect(response.status).to.equal(400);
      });
    });
    it("Then the response will send 'Validation Failed'", () => {
      const randomUserBody: any = getRandomNewUserForCypress();
      delete randomUserBody.password;
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/register",
        body: randomUserBody,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.body).to.deep.equal({ error: "Validation Failed" });
      });
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
      }).then((response) => {
        expect(response.status).to.equal(400);
      });
    });
    it("Then the response will send 'Validation Error'", () => {
      const randomUserBody: any = getRandomNewUserForCypress();
      delete randomUserBody.name;
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/register",
        body: randomUserBody,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.body).to.deep.equal({ error: "Validation Failed" });
      });
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
      }).then((response) => {
        expect(response.status).to.equal(400);
      });
    });
    it("Then the response will send 'Validation Error'", () => {
      const randomUserBody: any = getRandomNewUserForCypress();
      delete randomUserBody.username;
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/register",
        body: randomUserBody,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.body).to.deep.equal({ error: "Validation Failed" });
      });
    });
  });
  // se puede testear que User.findOne, create rejecteen?
});

describe("Given a /user/login endpoint", () => {
  let existingUser: any;
  let impostor: any;
  beforeEach(() => {
    existingUser = { username: "NalaNala", password: "NalaNala" };
    impostor = { username: "impostor", password: "impostor" };
  });
  describe("When it receives an existing username and correct password", () => {
    it("Then it will get sent", () => {
      cy.request("POST", "http://localhost:1000/user/login", existingUser);
    });
    it("Then the response will send status 200", () => {
      cy.request("POST", "http://localhost:1000/user/login", existingUser).then(
        (response) => {
          expect(response).have.property("status", 200);
        }
      );
    });
    it("Then the response body will send an object with the token property", () => {
      cy.request("POST", "http://localhost:1000/user/login", existingUser).then(
        (response) => {
          expect(response.body).have.deep.property("token");
        }
      );
    });
    it("Then the response body will be faster than half a second", () => {
      cy.request("POST", "http://localhost:1000/user/login", existingUser).then(
        (response) => {
          expect(response.duration).to.be.lessThan(500);
        }
      );
    });
  });
  describe("When it receives a non existing username", () => {
    it("Then the response will send status 401", () => {
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/login",
        body: impostor,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response).have.property("status", 401);
      });
    });
    it("Then the response body will send an object error: 'Wrong credentials", () => {
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/login",
        body: impostor,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.body).have.deep.equal({ error: "Wrong credentials" });
      });
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
      }).then((response) => {
        expect(response).have.property("status", 401);
      });
    });
    it("Then the response body will send an object error : 'Wrong credentials", () => {
      existingUser.password = "wrongPassword123";
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/login",
        body: impostor,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.body).have.deep.equal({ error: "Wrong credentials" });
      });
    });
  });
  // Validation tests no funcionan como en register????
  describe("When it receives no username", () => {
    it("Then the response will send status 400", () => {
      delete existingUser.username;
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/login",
        body: impostor,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response).have.property("status", 400);
      });
    });
    it("Then the response body will send an object error : 'Validation Failed", () => {
      delete existingUser.username;
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/login",
        body: impostor,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.body).to.deep.equal({ error: "Validation Failed" });
      });
    });
  });
  describe("When it receives no password", () => {
    it("Then the response will send status 400", () => {
      delete existingUser.password;
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/login",
        body: impostor,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response).have.property("status", 400);
      });
    });
    it("Then the response body will send an object error : 'Validation Failed", () => {
      delete existingUser.password;
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/login",
        body: impostor,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.body).to.deep.equal({ error: "Validation Failed" });
      });
    });
  });
  describe("When it receives a password shorter than 7 characters", () => {
    it("Then the response will send status 400", () => {
      existingUser.password = "Nala";
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/login",
        body: impostor,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response).have.property("status", 400);
      });
    });
    it("Then the response body will send an object error : 'Validation Failed", () => {
      existingUser.password = "Nala";
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/login",
        body: impostor,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.body).to.deep.equal({ error: "Validation Failed" });
      });
    });
  });
  describe("When it receives a password longer than 20 characters", () => {
    it("Then the response will send status 400", () => {
      existingUser.password = "Nalaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/login",
        body: impostor,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response).have.property("status", 400);
      });
    });
    it("Then the response body will send an object error : 'Validation Failed", () => {
      existingUser.password = "Nalaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
      cy.request({
        method: "POST",
        url: "http://localhost:1000/user/login",
        body: impostor,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.body).to.deep.equal({ error: "Validation Failed" });
      });
    });
  });
});
