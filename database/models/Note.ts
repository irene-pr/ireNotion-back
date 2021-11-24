import { Schema, Model, model } from "mongoose";

interface INote {
  type: string;
  position: any;
  color: string;
  title?: string;
  paragraph?: string;
  list?: any[];
  file?: any;
}

const noteSchema: Schema = new Schema({
  type: {
    type: String,
    required: true,
  },
  position: {
    x: {
      type: Number,
    },
    y: {
      type: Number,
    },
    h: {
      type: Number,
    },
    w: {
      type: Number,
    },
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
