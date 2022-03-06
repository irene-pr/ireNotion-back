import { Schema, Model, model, Types, ObjectId } from "mongoose";

interface Checklist {
  checked: boolean;
  sentence: string;
}

export interface NoteModelSchema {
  userId: ObjectId;
  type: string;
  order?: number;
  color: string;
  title?: string;
  paragraph?: string;
  list?: Array<string | Checklist>;
  file?: string;
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

const Note: Model<NoteModelSchema> = model("Note", noteSchema, "notes");

export default Note;
