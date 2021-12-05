import { Factory } from "fishery";
import { internet, lorem, name } from "faker";
import ObjectID from "bson-objectid";

const factoryNewUsers = Factory.define(() => ({
  name: name.findName(),
  username: internet.userName(),
  password: internet.password(),
}));

const factoryNewUsersCypress = Factory.define(() => ({
  name: lorem.word(10),
  username: internet.userName(),
  password: lorem.word(10),
}));

const factoryUsers = Factory.define(() => ({
  id: new ObjectID(),
  name: name.findName(),
  username: internet.userName,
  password: internet.password(),
  boards: [],
}));

export const getRandomNewUser = () => factoryNewUsers.build();
export const getRandomNewUserForCypress = () => factoryNewUsersCypress.build();
export const getRandomUser = () => factoryUsers.build();
