import { authApi } from "@/lib/auth-api";
import { NextResponse } from "next/server";
import { extractAndParseCookies } from "./extract-and-parse-cookies";
import { appendCookiesToNextResponse } from "./append-cookies-to-next-response";

export const refreshAccessToken = async (response: NextResponse, headers: Headers) => {
  const { refreshAccessToken } = authApi();
  const refreshAccessTokenResponse = await refreshAccessToken(headers);
  const setCookieHeader = refreshAccessTokenResponse.headers.getSetCookie().join("; ");
  const refreshedAuthCookies = extractAndParseCookies(setCookieHeader, ["Authentication", "Refresh"]);
  const newResponse = appendCookiesToNextResponse(response, refreshedAuthCookies);
  return newResponse;
};
