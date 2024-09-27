import { isUnauthorizedError } from "@/functions/is-unauthenticated-error";
import RefreshAccessToken from "./refresh-access-token";

type Props = {
  error: unknown;
};

const ServerError = ({ error }: Props) => {
  if (isUnauthorizedError(error)) {
    return <RefreshAccessToken />;
  }

  throw error;
};

export default ServerError;
