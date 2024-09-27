import { chain } from "./middlewares/chain";
import { withInitializeResponse } from "./middlewares/initialize-response";
import { withAuth } from "./middlewares/with-auth";

export default chain([withInitializeResponse, withAuth]);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)", "/([\\w-]+)?/users/(.+)"],
};
