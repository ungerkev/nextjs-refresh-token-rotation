import LogoutButton from "@/components/logout-button";
import ServerError from "@/components/server-error";
import { authApi } from "@/lib/auth-api";
import React from "react";

const Protected = async () => {
  try {
    const { verifyAccessToken } = authApi();
    await verifyAccessToken();

    /* Best practice for fetching data in server components
    const results = await Promise.all([
      asyncOperation1(),
      asyncOperation2(),
      asyncOperation3(),
    ]);
    */

    return (
      <div>
        <p>Authenticated Server Component</p>
        <LogoutButton />
      </div>
    );
  } catch (error) {
    return <ServerError error={error} />;
  }
};

export default Protected;
