import { createStore } from "easy-peasy";
import { puppies } from "./models/puppies";

const store = createStore({
  puppies,
});

export default store;
