import { XiorError } from "xior";

export const isUnauthorizedError = (error: unknown): boolean => {
  if (error instanceof XiorError && error.response?.status === 401) {
    return true;
  } else {
    return false;
  }
};
