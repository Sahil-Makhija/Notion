"use client";

import { useAuth, SignInButton, UserButton } from "@clerk/nextjs";

import Link from "next/link";

import { useScrollTop } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";

import Logo from "./logo";
import { Spinner } from "@/components/shared";

export const Navbar = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const scrolledTop = useScrollTop();

  return (
    <div
      className={cn(
        "fixed top-0 z-50 flex w-full items-center bg-background p-4",
        scrolledTop && "border-b shadow-sm",
      )}
    >
      <Logo />
      <div className="flex w-full items-center justify-between gap-x-2 md:ml-auto md:justify-end">
        {!isLoaded && <Spinner size={"md"} />}
        {isLoaded && !isSignedIn && (
          <>
            <SignInButton mode="modal">
              <Button variant={"ghost"} size={"sm"}>
                Login
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size={"sm"}>Get Notion free</Button>
            </SignInButton>
          </>
        )}
        {isSignedIn && isLoaded && (
          <>
            <Button variant={"ghost"} size={"sm"} asChild>
              <Link href={"/documents"}>Enter Notion</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
      </div>
    </div>
  );
};
