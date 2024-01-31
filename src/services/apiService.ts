import axios, { AxiosResponse } from "axios";
import { httpClient } from "../http/httpClient";
import { TestResult } from "../types/TestResult";
import { UserResult } from '../types/UserResult'

function getAllResults(): Promise<UserResult[]> {
  return httpClient.get("/result");
}

function getShema(shema: number): Promise<AxiosResponse> {
  return axios.get(`./api/shema_${shema}.json`);
}

function sendResult(data: TestResult): Promise<AxiosResponse> {
  return httpClient.post("/result", data);
}

export const apiService = { getAllResults, getShema, sendResult };
