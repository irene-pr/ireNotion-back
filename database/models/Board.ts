import { Schema, Model, model, Types } from "mongoose";

interface IBoard {
  userId: any;
  name: string;
  notes: any;
}

const boardSchema: Schema = new Schema({
  type: {
    type: String,
    default: "board",
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20,
  },
  notes: {
    type: [Types.ObjectId],
    ref: "Note",
  },
});

const Board: Model<IBoard> = model("Board", boardSchema, "boards");

export default Board;
