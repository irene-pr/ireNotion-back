import { Factory } from "fishery";
import { commerce, lorem, name } from "faker";
import ObjectID from "bson-objectid";

const factoryNoteBodyRequests = Factory.define(() => ({
  note: {
    type: "paragraph",
    color: commerce.color(),
    title: lorem.word(),
  },
}));

const factoryNotes = Factory.define(() => ({
  id: new ObjectID(),
  name: name.findName(),
  notes: [],
}));

export const getRandomNoteBodyRequest = () => factoryNoteBodyRequests.build();
export const getRandomBoard = () => factoryNotes.build();
