import { authApi } from "@/lib/auth-api";

export const verifyAccessToken = async (headers: Headers) => {
  const { verifyAccessToken } = authApi();
  await verifyAccessToken(headers);
};
