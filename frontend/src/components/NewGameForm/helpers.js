import Axios from "axios";

const prune = ({ data }) => data;

export const runSearch = query => {
  return Axios.get(`/api/searchUsers/${query}`).then(prune);
};

export const createGame = game => {
  return Axios.post("api/game/new", game).then(prune);
};
