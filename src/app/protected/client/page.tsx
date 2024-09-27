"use client";

import LogoutButton from "@/components/logout-button";
import { authApi } from "@/lib/auth-api";
import React, { useEffect } from "react";

const Protected = () => {
  useEffect(() => {
    const { verifyAccessToken } = authApi();

    const checkAuth = async () => {
      await verifyAccessToken();
    };

    checkAuth();
  }, []);

  return (
    <div>
      <p>Authenticated Client Component</p>
      <LogoutButton />
    </div>
  );
};

export default Protected;
