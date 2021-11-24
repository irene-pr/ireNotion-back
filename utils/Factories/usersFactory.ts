import { Factory } from "fishery";
import { internet, name } from "faker";
import ObjectID from "bson-objectid";

const factoryNewUsers = Factory.define(() => ({
  name: name.findName(),
  username: internet.userName(),
  password: internet.password(),
}));

const factoryUsers = Factory.define(() => ({
  id: new ObjectID(),
  name: name.findName(),
  username: internet.userName,
  password: internet.password(),
  boards: [],
}));

export const getRandomNewUser = () => factoryNewUsers.build();
export const getRandomUser = () => factoryUsers.build();
export const getRandomUsers = (total = 5) => factoryUsers.buildList(total);
