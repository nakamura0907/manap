import { fetchToken } from "@features/auth";
import axios, { AxiosError, AxiosResponse } from "axios";

const baseURL = "http://localhost:3001/api/v1";

type ErrorMessage = {
  message: string;
};
export type FetchErrorResponse = AxiosResponse<ErrorMessage>;

export const isFetchError = (
  error: unknown
): error is AxiosError<ErrorMessage, any> => {
  return (
    axios.isAxiosError(error) &&
    error.response !== undefined &&
    error.response.data !== undefined
  );
};

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use((config) => {
  const token = fetchToken();

  if (token && config.headers) {
    config.headers!.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;
