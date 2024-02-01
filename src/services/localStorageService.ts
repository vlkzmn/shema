import { Pages } from "../types/Pages";

const TEST_NAME_KEY = 'YSQ_S3';
const USER_NAME_KEY = 'shemaUserName';
const SHEMA_THEME = 'shemaTheme';
const SHEMA_PAGE = 'shemaPage';
const ACCESS_TOKEN = 'accessToken';

function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN);
}

function getTheme(): string | null {
  return localStorage.getItem(SHEMA_THEME);
}

function getPage(): string | null {
  return localStorage.getItem(SHEMA_PAGE);
}

function getName(): string | null {
  return localStorage.getItem(USER_NAME_KEY);
}

function getAnswers(): number[] | undefined {
  const savedAnswers = localStorage.getItem(TEST_NAME_KEY);

  if (savedAnswers) {
    try {
      return JSON.parse(savedAnswers);
    } catch (error) {
      return undefined;
    }    
  }
}

function setAccessToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN, token);
}

function setTheme(theme: string) {
  localStorage.setItem(SHEMA_THEME, theme);
}

function setPage(page: Pages) {
  localStorage.setItem(SHEMA_PAGE, page);
}

function setName(name: string) {
  localStorage.setItem(USER_NAME_KEY, name);
}

function setAnswers(answers: number[]) {
  localStorage.setItem(TEST_NAME_KEY, JSON.stringify(answers));
}

function removeUser() {
  localStorage.removeItem(USER_NAME_KEY);
  localStorage.removeItem(TEST_NAME_KEY);
}

export const localStorageService = {
  getAccessToken,
  getTheme,
  getPage,
  getName,
  getAnswers,
  setAccessToken,
  setTheme,
  setPage,
  setName,
  setAnswers,
  removeUser,
};