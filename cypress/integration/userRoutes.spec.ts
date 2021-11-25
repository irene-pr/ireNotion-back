import { cy, it } from "local-cypress";

describe("TypeScript spec", () => {
  it("works", () => {
    cy.wrap("foo").should("equal", "foo");
  });
});
