import { XiorResponse } from "xior";
import xiorClient from "./xior";

const BACKEND_URL = "http://localhost:3001/api/v1/auth";

interface Response {
  success: boolean;
}

interface AuthApi {
  login: (email: string, password: string) => Promise<XiorResponse<Response>>;
  logout: (headers?: Headers) => Promise<XiorResponse<Response>>;
  verifyAccessToken: (headers?: Headers) => Promise<XiorResponse<Response>>;
  refreshAccessToken: (headers?: Headers) => Promise<XiorResponse<Response>>;
}

export const authApi = (): AuthApi => {
  return {
    login,
    logout,
    verifyAccessToken,
    refreshAccessToken,
  };
};

const login = (email: string, password: string) => {
  return xiorClient.post<Response>(`${BACKEND_URL}/login`, { email, password });
};

const logout = (headers?: Headers) => {
  return xiorClient.get<Response>(`${BACKEND_URL}/logout`, { headers });
};

const verifyAccessToken = (headers?: Headers) => {
  return xiorClient.get<Response>(`${BACKEND_URL}/verify`, { headers });
};

const refreshAccessToken = (headers?: Headers) => {
  return xiorClient.get<Response>(`${BACKEND_URL}/refresh`, { headers });
};
