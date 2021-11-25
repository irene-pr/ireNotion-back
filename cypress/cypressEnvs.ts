import dotenv from "dotenv";

dotenv.config();

const tokenTestLoginNala = Cypress.env("tokenNala");

export default tokenTestLoginNala;
