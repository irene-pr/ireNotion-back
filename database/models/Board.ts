import { Schema, Model, model, Types, ObjectId } from "mongoose";

interface IBoard {
  userId: ObjectId;
  type: string;
  name: string;
  notes: ObjectId[];
}

const boardSchema: Schema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    default: "board",
  },
  name: {
    type: String,
    required: true,
  },
  notes: {
    type: [Types.ObjectId],
    ref: "Note",
  },
});

const Board: Model<IBoard> = model("Board", boardSchema, "boards");

export default Board;
