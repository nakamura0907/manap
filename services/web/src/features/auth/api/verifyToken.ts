import fetch from "@lib/fetch";

type VerifyTokenResponse = {
  id: number;
};

export const verifyToken = async () => {
  return await fetch.post<VerifyTokenResponse>("/auth/verify");
};
