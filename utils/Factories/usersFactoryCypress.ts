import { Factory } from "fishery";
import { internet, lorem } from "faker";

const factoryNewUsersCypress = Factory.define(() => ({
  name: lorem.word(10),
  username: internet.userName(),
  password: lorem.word(10),
}));

const getRandomNewUserForCypress = () => factoryNewUsersCypress.build();

export default getRandomNewUserForCypress;
