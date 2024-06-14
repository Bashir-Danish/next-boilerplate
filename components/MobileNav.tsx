"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify  } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger className="flex">
          <AlignJustify 
            width={32}
            height={32}
            className="cursor-pointer sm:hidden absolute top-2 left-5"
          />
        </SheetTrigger>
        <SheetContent side={"left"} className="border-non">
          <SheetHeader>
            <Link href="/" className="flex items-center gap-1">
              <Image
                src="/icons/logo.svg"
                width={32}
                height={32}
                alt="loom logo"
                className="max-sm:size-10"
              />
              <p className="text-[26px] font-extrabold max-sm:hidden">
                FrCRM
              </p>
            </Link>
          </SheetHeader>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-6 pt-16 ">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.route;
                  // || pathname.startsWith(link.route);
                  return (
                    <SheetClose key={link.route} asChild>
                      <Link
                        href={link.route}
                        key={link.label}
                        className={cn(
                          "flex gap-4 items-center p-4 rounded-lg w-full max-w-60",
                          { "bg-dark-2": isActive }
                        )}
                      >
                        <Image
                          src={link.imgURL}
                          alt={link.label}
                          width={20}
                          height={20}
                        />
                        <p className="font-semibold ">{link.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
