import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

type Props = {
  accessToken?: RequestCookie;
  refreshToken?: RequestCookie;
};

export const createAuthHeaders = (headers: Headers, { accessToken, refreshToken }: Props) => {
  const cookies: string[] = [];

  if (accessToken) {
    cookies.push(`${accessToken.name}=${accessToken.value}`);
  }

  if (refreshToken) {
    cookies.push(`${refreshToken.name}=${refreshToken.value}`);
  }

  const newHeaders = {
    ...headers,
    Cookie: cookies.length ? cookies.join("; ") : headers.get("Cookie"),
  };

  return new Headers(newHeaders);
};
