import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT ?? 5000;
export const dataBaseString = process.env.MONGO_DB;
export const dataBaseTestString = process.env.MONGO_DB_TEST;
export const secret = `${process.env.SECRET}`;
export const tokenTestLoginNala = Cypress.env("tokenNala");
