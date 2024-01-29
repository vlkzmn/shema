import { httpClient } from "../http/httpClient";
import { TestResult } from "../types/TestResult";
import { UsersResults } from '../types/UsersResults';

function getAll(): Promise<UsersResults[]> {
  return httpClient.get("/result");
}

function sendResult(data: TestResult): Promise<number> {
  return httpClient.post("/result", data);
}

export const resultsService = { getAll, sendResult };
