import fetch from "@lib/fetch";

type LoginByEmailRequest = {
  email: string;
  password: string;
};

type LoginByEmailResponse = {
  id: number;
  token: string;
};

export const loginByEmail = async (data: LoginByEmailRequest) => {
  return await fetch.post<LoginByEmailResponse>("/auth/login", data);
};
