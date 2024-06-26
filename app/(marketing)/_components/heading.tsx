"use client";

import { SignInButton, useAuth } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";

import Link from "next/link";

import { Spinner } from "@/components/shared";
import { Button } from "@/components/ui";

export const Heading = () => {
  const { isLoaded, isSignedIn } = useAuth();
  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">
        Your ideas documents & plans. Unified. Welcome to{" "}
        <span className="underline">Notion</span>
      </h1>
      <h3 className="text-base font-medium sm:text-xl md:text-2xl">
        Notion is connected workspace where <br /> better faster work happens.
      </h3>
      {!isLoaded && <Spinner size={"md"} />}
      {isSignedIn && isLoaded && (
        <Button asChild>
          <Link href={"/documents"}>
            Enter Notion <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      )}
      {!isSignedIn && isLoaded && (
        <SignInButton mode="modal">
          <Button size={"sm"}>Get Notion Free</Button>
        </SignInButton>
      )}
    </div>
  );
};
