"use client";
import React, { useEffect } from "react";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  const pathname = usePathname();
  useEffect(() => {});
  return (
    <section className="sticky left-0 top-14 flex h-screen w-fit  flex-col justify-between  pt-20 max-sm:hidden lg:w-[250px]  bg-background border-r border-l border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="flex flex-1 flex-col gap-2 overflow-auto ">
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.route || pathname.startsWith(`${link.route}/`);
          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "flex gap-4 items-center p-4 mx-1 rounded-lg justify-start",
                {
                  underline: isActive,
                }
              )}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="  max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
