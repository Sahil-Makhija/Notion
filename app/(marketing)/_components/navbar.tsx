"use client";

// import { useConvexAuth } from "convex/react";
// import { SignInButton, UserButton } from "@clerk/clerk-react";

import Link from "next/link";

import { useScrollTop } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import Logo from "./logo";

export const Navbar = () => {
  //   const { isAuthenticated, isLoading } = useConvexAuth();
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
        {/* {isLoading && <p>Loading...</p>} */}
        {/* {!isAuthenticated && !isLoading && ( */}
        <>
          {/* <SignInButton mode="modal"> */}
          <Button variant={"ghost"} size={"sm"}>
            Login
          </Button>
          {/* </SignInButton> */}
          {/* <SignInButton mode="modal"> */}
          <Button size={"sm"}>Get Notion free</Button>
          {/* </SignInButton> */}
        </>
        {/* )} */}
        {/* {isAuthenticated && !isLoading && (
          <>
            <Button variant={"ghost"} size={"sm"} asChild>
              <Link href={"/documents"}>Enter Jotion</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )} */}
      </div>
    </div>
  );
};
