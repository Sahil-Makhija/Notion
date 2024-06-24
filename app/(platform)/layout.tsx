"use client";

import { Spinner } from "@/components/shared";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Navigation } from "./_components";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  if (!isSignedIn && isLoaded) {
    redirect("/");
  }

  return (
    <div className="flex h-full dark:bg-[#1F1F1F]">
      <Navigation />
      <main className="h-full flex-1 overflow-y-auto">
        {/* <SearchCommand /> */}
        {children}
      </main>
    </div>
  );
};

export default PlatformLayout;
