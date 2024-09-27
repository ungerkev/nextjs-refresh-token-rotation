"use client";
import React from "react";
import { Button } from "./ui/button";
import { authApi } from "@/lib/auth-api";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const onLogout = () => {
    const { logout } = authApi();
    logout();
    router.push("/login");
  };

  return <Button onClick={onLogout}>Logout</Button>;
};

export default LogoutButton;
