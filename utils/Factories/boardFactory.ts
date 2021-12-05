import { Factory } from "fishery";
import { name } from "faker";
import ObjectID from "bson-objectid";

const factoryNewBoard = Factory.define(() => ({
  name: name.findName(),
}));

const factoryBoards = Factory.define(() => ({
  id: new ObjectID(),
  name: name.findName(),
  notes: [],
}));

export const getRandomNewBoard = () => factoryNewBoard.build();
export const getRandomBoard = () => factoryBoards.build();
