import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { LogOut } from "lucide-react";

const SignOutButton: React.FC = () => {
  const { toast } = useToast();

  const handleSignOut: React.MouseEventHandler<HTMLDivElement> = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };

  return (
    <div className="flex w-full items-center gap-2" role="button" onClick={handleSignOut}>
      <Button
        variant="outline"
        size="icon"
        className="h-[1.8rem] w-[1.8rem] flex"
      >
        <LogOut className="h-[1rem] w-[1rem]" />
      </Button>
      <span>SignOut</span>
    </div>
  );
};

export default SignOutButton;
