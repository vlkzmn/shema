import axios from "axios";

export function createClient() {
  return axios.create({
    baseURL: "https://shema-api.onrender.com",
    withCredentials: true,
  });
}
