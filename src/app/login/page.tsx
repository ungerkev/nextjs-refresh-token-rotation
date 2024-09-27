"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authApi } from "@/lib/auth-api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    const { login } = authApi();
    await login(email, password);
    router.push("/protected/server");
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-xl">Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" onChange={(event) => setEmail(event.target.value)} />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" onChange={(event) => setPassword(event.target.value)} />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={onLogin}>
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
