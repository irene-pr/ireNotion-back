import { Schema, Model, model, Types, ObjectId } from "mongoose";

interface IUser {
  name: string;
  username: string;
  password: string;
  boards: ObjectId[];
}

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
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
