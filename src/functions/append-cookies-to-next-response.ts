import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextResponse } from "next/server";

export const appendCookiesToNextResponse = (response: NextResponse, cookies: ResponseCookie[]) => {
  cookies.forEach((cookie) => {
    const { name, value, ...options } = cookie;
    response.cookies.set(name, value, options);
  });

  return response;
};
