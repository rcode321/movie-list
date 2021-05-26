import http from "./httpService";
import { apiURL } from "../config.json";

const apiEndpoint = apiURL + "/users";

export const register = (user) =>
	http.post(apiEndpoint, {
		email: user.username,
		password: user.password,
		name: user.name,
	});
