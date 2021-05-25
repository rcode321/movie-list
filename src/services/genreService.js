import http from "./httpService";
import { apiURL } from "../config.json";

const getGenres = () => http.get(apiURL + "/genres");

export default getGenres;
