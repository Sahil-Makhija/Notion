import React from "react";
import Logo from "./logo";
import { Button } from "@/components/ui";

export const Footer = () => {
  return (
    <div className="z-50 flex w-full items-center bg-background p-6">
      <Logo />
      <div className="flex w-full items-center justify-between gap-x-2 md:ml-auto md:justify-end">
        <Button variant={"ghost"} size={"sm"}>
          Privacy policy
        </Button>
        <Button variant={"ghost"} size={"sm"}>
          Terms & conditions
        </Button>
      </div>
    </div>
  );
};
