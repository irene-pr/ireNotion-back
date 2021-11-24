import { Schema, Model, model, Types } from "mongoose";

interface IUser {
  name: string;
  username: string;
  password: string;
  boards: any;
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
  },
  boards: {
    type: [Types.ObjectId],
    ref: "Board",
  },
});

const User: Model<IUser> = model("User", userSchema, "users");

export default User;
