import xior, { XiorRequestConfig, XiorError } from "xior";
import { authApi } from "./auth-api";
import { isClientSide } from "@/functions/is-client-side";

const xiorClient = xior.create({
  withCredentials: true,
  cache: "no-store",
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: (value?: unknown) => void; reject: (reason?: unknown) => void; config: XiorRequestConfig }> = [];

const processQueue = (error: XiorError | null) => {
  failedQueue.forEach((prom) => {
    if (!error) {
      prom.resolve(xiorClient.request(prom.config));
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

// Request interceptor
xiorClient.interceptors.request.use(async (config) => {
  if (!isClientSide()) {
    const { cookies } = await import("next/headers");
    const cookiesString = cookies()
      .getAll()
      .map((item) => `${item.name}=${item.value}`)
      .join("; ");
    config.headers = {
      ...config.headers,
      cookie: cookiesString,
    };
  }

  return config;
});

// Response interceptor for handling 401
xiorClient.interceptors.response.use(
  (response) => response,
  async (error: XiorError) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      isClientSide() &&
      !originalRequest?.url?.includes("/login") &&
      !error.response?.request.url.includes("/refresh")
    ) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const { refreshAccessToken } = authApi();
          await refreshAccessToken();
          isRefreshing = false;
          processQueue(null);
          return xiorClient.request(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          processQueue(refreshError as XiorError);
          return Promise.reject(refreshError);
        }
      }

      return new Promise((resolve, reject) => {
        if (originalRequest) {
          failedQueue.push({ resolve, reject, config: originalRequest });
        } else {
          reject(error);
        }
      });
    }

    if (isClientSide() && error.response?.status === 401) {
      window.location.reload();
    }

    return Promise.reject(error);
  }
);

export default xiorClient;
