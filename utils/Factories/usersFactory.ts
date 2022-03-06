import { Factory } from "fishery";
import { internet, name } from "faker";
import ObjectID from "bson-objectid";

const factoryRegisterUserRequests = Factory.define(() => ({
  name: name.findName(),
  username: internet.userName(),
  password: internet.password(10),
}));

const factoryUsers = Factory.define(() => ({
  id: new ObjectID(),
  name: name.findName(),
  username: internet.userName,
  password: internet.password(),
  boards: [],
}));

export const getRandomRegisterUserRequest = () =>
  factoryRegisterUserRequests.build();
export const getRandomUser = () => factoryUsers.build();
