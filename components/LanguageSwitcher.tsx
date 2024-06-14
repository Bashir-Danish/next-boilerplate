import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { Button } from "./ui/button";

const LanguageSwitcher = () => {
  const handleLocaleChange = async (locale: string) => {
    const response = await fetch("/api/set-locale", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ locale }),
    });

    const result = await response.json();
    console.log(result);

    if (result.changed) {
      window.location.reload();
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-[1.8rem] w-[1.8rem] flex"
          >
            <Languages className="h-[1rem] w-[1rem]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-1">
          <DropdownMenuItem onClick={() => handleLocaleChange("en")}>
            En
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleLocaleChange("fa")}>
            Fa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu></DropdownMenu>
    </>
  );
};

export default LanguageSwitcher;
