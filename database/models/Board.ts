import { Schema, Model, model, Types } from "mongoose";

interface IBoard {
  userId: any;
  name: string;
  notes: any;
}

const boardSchema: Schema = new Schema({
  userId: {
    type: Types.ObjectId,
    required: true,
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
    required: true,
  },
});

const Board: Model<IBoard> = model("Board", boardSchema, "boards");

export default Board;
