import axios from "axios";
import { URL_API } from "./constants.js";
const instance = axios.create({
  baseURL: URL_API,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
export default instance;
