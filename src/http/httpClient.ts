import { AxiosResponse } from 'axios';
import { createClient } from "./createClient";
import { localStorageService } from "../services/localStorageService";
import { authService } from "../services/authService";

export const httpClient = createClient();

httpClient.interceptors.request.use(onRequest);
httpClient.interceptors.response.use(onResponseSuccess, onResponseError);

function onRequest(request: any) {
  const accessToken = localStorageService.getAccessToken();

  if (accessToken) {
    request.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return request;
}

function onResponseSuccess(res: AxiosResponse) {
  return res.data;
}

async function onResponseError(error: any) {
  const originalRequest = error.config;

  if (error.response.status !== 401) {
    throw error;
  }

  try {
    const accessToken = await authService.refresh();

    localStorageService.setAccessToken(accessToken);

    return httpClient.request(originalRequest);
  } catch (error) {
    throw error;
  }
}
