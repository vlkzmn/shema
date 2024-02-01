import { localStorageService } from "../services/localStorageService";
import { Pages } from "../types/Pages";

export const getInitialTheme = () => {
  const savedTheme = localStorageService.getTheme();
  return savedTheme === 'dark';
};

export const getInitialPage = () => {
  const savedPage = localStorageService.getPage() as Pages;
  return savedPage || Pages.info;
};
