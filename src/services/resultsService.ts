import axios from "axios";
import { httpClient } from "../http/httpClient";
import { TestResult } from "../types/TestResult";
import { UsersResults } from '../types/UsersResults';
import { ShemaText } from "../types/ShemaText";

function getAll(): Promise<UsersResults[]> {
  return httpClient.get("/result");
}

function getShema(shema: number): Promise<ShemaText> {
  return axios.get(`./api/shema_${shema}.json`);
}

function sendResult(data: TestResult): Promise<number> {
  return axios.post("https://shema-api.onrender.com/result", data);
}

export const resultsService = { getAll, getShema, sendResult };
