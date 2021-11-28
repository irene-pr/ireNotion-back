import dotenv from "dotenv";
import { Cypress } from "local-cypress";

dotenv.config();

const tokenTestLoginNala = Cypress.env("tokenNala");

export default tokenTestLoginNala;
