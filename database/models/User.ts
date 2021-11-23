import { Schema, Model, model } from "mongoose";

interface IUser {
  name: string;
  username: string;
  password: string;
}

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20,
  },
  username: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 20,
  },
});

const User: Model<IUser> = model("User", userSchema, "users");

export default User;
