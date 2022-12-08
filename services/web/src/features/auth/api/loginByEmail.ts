import fetch from "@lib/fetch";

type LoginByEmailRequestData = {
  email: string;
  password: string;
};

type LoginByEmailResponse = {
  id: number;
  token: string;
};

export const loginByEmail = async (data: LoginByEmailRequestData) => {
  return await fetch.post<LoginByEmailResponse>("/auth/login", data);
};
