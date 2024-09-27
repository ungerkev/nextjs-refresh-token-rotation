import { NextResponse } from "next/server";
import { authApi } from "@/lib/auth-api";
import { appendCookiesToNextResponse } from "./append-cookies-to-next-response";
import { extractAndParseCookies } from "./extract-and-parse-cookies";

export const logout = async (response: NextResponse, headers: Headers) => {
  const { logout } = authApi();
  const refreshAccessTokenResponse = await logout(headers);
  const setCookieHeader = refreshAccessTokenResponse.headers.getSetCookie().join("; ");
  const removedAuthCookies = extractAndParseCookies(setCookieHeader, ["Authentication", "Refresh"]);
  const newResponse = appendCookiesToNextResponse(response, removedAuthCookies);
  return newResponse;
};
