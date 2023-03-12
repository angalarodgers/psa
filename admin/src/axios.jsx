import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://api.proswimacademykenya.info/api/",
  withCredentials: true,
});
