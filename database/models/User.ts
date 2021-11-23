import { Schema, Model, model } from "mongoose";

interface User {
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

const userModel: Model<User> = model("User", userSchema, "users");

export default userModel;
