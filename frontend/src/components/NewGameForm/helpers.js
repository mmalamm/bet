import Axios from "axios";

export const runSearch = query => {
  return Axios.get(`/api/searchUsers/${query}`).then(({ data }) => data);
};
