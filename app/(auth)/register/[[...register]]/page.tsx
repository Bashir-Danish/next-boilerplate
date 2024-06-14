"use client";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useFetch } from "@/hooks/useFetch";

const SignUpPage = () => {
  const [info, setInfo] = useState({ name: "", email: "", password: "" });
  const [pending, setPending] = useState(false);
  const { toast } = useToast();
  const { httpRequest } = useFetch("api/signup");
  const router = useRouter();

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!info.name || !info.email || !info.password) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please fill the inputs then try.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }
    try {
      setPending(true);
      const result = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
      const data = await result.json();
      console.log(data);
      if (result.status === 201) {
        router.push("/login");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.message,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong, please try again.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 justify-center">
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-bold min-w-10">Sign Up</h1>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">name</Label>
            <Input
              name="name"
              id="name"
              type="text"
              placeholder="Jon doe"
              required
              onChange={handleInput}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={handleInput}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              id="password"
              type="password"
              required
              onChange={handleInput}
            />
          </div>
          <Button type="submit" className="w-full" disabled={pending}>
            Sign Up
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
