import { Factory } from "fishery";
import { name } from "faker";
import ObjectID from "bson-objectid";

const factoryCreateBoardRequests = Factory.define(() => ({
  name: name.findName(),
}));

const factoryBoards = Factory.define(() => ({
  id: new ObjectID(),
  name: name.findName(),
  notes: [],
}));

export const getRandomNewBoard = () => factoryCreateBoardRequests.build();
export const getRandomBoard = () => factoryBoards.build();
