"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ModeToggle } from "@/components/ToggleMode";
import MobileNav from "./MobileNav";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import SignOutButton from "@/components/SignOut";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [initials, setInitials] = useState("");

  
  useEffect(() => {
    if (session?.user) {
      const nameParts = session.user.name?.split(" ");
      if (nameParts?.length === 1) {
        setInitials(nameParts[0].substring(0, 2).toUpperCase());
      } else if (nameParts) {
        setInitials(
          (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase()
        );
      }
    }
  }, [session]);

  return (
    <nav
      className={cn(
        "w-full flex flex-col justify-between items-center fixed  z-50 px-6 py-2 lg:px-10 dark:bg-glass backdrop-filter backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800 shadow-sm"
      )}
    >
      <div className="w-full flex justify-between items-center">
        <Link href="/" className="flex items-center gap-1">
          <p className="text-[26px] font-extrabold max-sm:hidden">FrCRM</p>
        </Link>

        <div className=" right-20 flex items-center gap-4">
          <ModeToggle />
          <LanguageSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="w-[32px] h-[32px] text-sm cursor-pointer">
                {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-1">
              <DropdownMenuItem>
                <SignOutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex gap-5">
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
