import Debug from "debug";
import chalk from "chalk";
import mongoose from "mongoose";

const debug = Debug("irenotion:db:index");

const connectDB = (connectionString: any) =>
  new Promise<void>((resolve, reject) => {
    mongoose.set("debug", true);
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        // eslint-disable-next-line no-underscore-dangle
        delete ret._id;
        // eslint-disable-next-line no-underscore-dangle
        delete ret.__v;
      },
    });

    mongoose.connection
      .on("open", () => {
        debug(chalk.green("The database connection is open"));
      })
      .on("close", () => {
        debug(chalk.green("The database connection is closed"));
      });

    mongoose.connect(connectionString, (error) => {
      if (error) {
        debug(chalk.red("Connection refused!"));
        debug(chalk.red(error.message));
        reject(error);
      }
      debug(chalk.green("Connection success!"));
      resolve();
    });
  });

export default connectDB;
