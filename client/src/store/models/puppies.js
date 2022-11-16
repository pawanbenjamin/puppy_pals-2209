import { action, thunk } from "easy-peasy";
import axios from "axios";

export const puppies = {
  data: [],
  setPuppies: action((state, payload) => {
    state.data = payload;
  }),
  fetchPuppies: thunk(async (actions, payload) => {
    const { data } = await axios.get("/api/puppies");
    actions.setPuppies(data);
  }),
  addPuppy: action((state, payload) => [state.data.push(payload)]),
  createPuppy: thunk(async (actions, payload) => {
    const { data } = await axios.post("/api/puppies", payload);
    actions.addPuppy(data);
  }),
};
