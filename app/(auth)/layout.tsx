import React, { ReactNode } from "react";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative lg:flex">
      <section className="flex min-h-screen flex-1  pb-6 pt-5 max-md:pb-5 sm:px-5 items-center justify-center ">
        <div className="min-w-[350px]">{children}</div>
      </section>
      <section className="h-screen flex-1 flex-col max-md:pb-0 hidden lg:block">
        <Image
          src="/images/placeholder.jpg"
          alt="Image"
          width={100}
          height={100}
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale border"
        />
      </section>
      <Toaster />

    </main>
  );
};

export default RootLayout;
