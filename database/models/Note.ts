import { Schema, Model, model, Types } from "mongoose";

interface INote {
  userId: any;
  type: string;
  order?: any;
  color: string;
  title?: string;
  paragraph?: string;
  list?: any[];
  file?: any;
}

const noteSchema: Schema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
  },
  color: {
    type: String,
    default: "yellow",
  },
  title: {
    type: String,
  },
  paragraph: {
    type: String,
  },
  list: {
    type: Array,
  },
  file: {
    type: String,
  },
});

const Note: Model<INote> = model("Note", noteSchema, "notes");

export default Note;
