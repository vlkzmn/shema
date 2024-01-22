import axios from "axios";

export function createClient() {
  return axios.create({
    baseURL: "https://shema-api.onrender.com",
    // baseURL: process.env.SHEMA_API_URL,
    withCredentials: true,
  });
}
