"use client";

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { redirect, useRouter } from "next/navigation";
import { SignInResponse, signIn, useSession } from "next-auth/react";

import { useFormState, useFormStatus } from "react-dom";
import { OctagonAlert } from "lucide-react";

const SignInPage = () => {
  const router = useRouter();
  const [info, setInfo] = useState({ email: "", password: "" });
  const [loader, setLoader] = useState(false);
  const { toast } = useToast();
  const { pending } = useFormStatus();
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!info.email || !info.password) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please fill the inputs then try.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }
    try {
      setLoader(true);
      const res = await signIn("credentials", {
        email: info.email,
        password: info.password,
        redirect: false,
      });
      if (res?.error) {
        toast({
          variant: "destructive",
          title: "Sign in failed",
          description: res.error,
        });
        setLoader(false);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      toast({
        variant: "destructive",
        title: "Sign in error",
        description: "An error occurred during sign in.",
      });
      setLoader(false);
    }
  };
  return (
    <div className="flex flex-col gap-6  justify-center">
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-bold min-w-10 ">Login</h1>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              name="password"
              id="password"
              type="password"
              required
              onChange={(e) => handleInput(e)}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            // disabled={loader ? true : false}
            aria-disabled={pending}
          >
            Login
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline">
            Sign Up
          </Link>
        </div>

        {/* <>
          <OctagonAlert className=" text-red-500" />
          <p className="text-sm text-red-500"> </p>
        </> */}
      </form>
    </div>
  );
};

export default SignInPage;
