import { httpClient } from "../http/httpClient";
import { UsersResults } from '../types/UsersResults';

function getAll(): Promise<UsersResults[]> {
  return httpClient.get("/result");
}

export const resultsService = { getAll };
