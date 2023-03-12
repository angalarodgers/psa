import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://api.proswimacademykenya.info/api/",
  withCredentials: true,
});
