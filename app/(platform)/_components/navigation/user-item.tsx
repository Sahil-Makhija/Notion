"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";
import { ChevronsLeftRight } from "lucide-react";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui";

export const UserItem = () => {
  const { user } = useUser();

  const userInitials =
    user?.firstName && user.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`
      : "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div
          role="button"
          className="flex w-full items-center p-3 text-sm hover:bg-primary/5"
        >
          <div className="flex max-w-[9.375rem] items-center gap-x-2">
            <Avatar className="h-5 w-5">
              {user?.imageUrl && <AvatarImage src={user.imageUrl} />}
              <AvatarFallback>
                <div className="flex size-9 items-center justify-center rounded-full">
                  <span className="font-semibold text-inherit">
                    {userInitials}
                  </span>
                </div>
              </AvatarFallback>
            </Avatar>
            <span className="line-clamp-1 text-start font-medium">
              {user?.fullName}&apos;s Notion
            </span>
          </div>
          <ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90 text-muted-foreground" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {user?.emailAddresses[0].emailAddress}
          </p>
          <div className="flex items-center gap-x-2">
            <div className="rounded-md bg-secondary p-1">
              <Avatar>
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
            </div>
            <div className="space-y-1">
              <p className="line-clamp-1 text-sm">
                {user?.fullName}&apos;s Notion
              </p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full cursor-pointer text-muted-foreground">
          <SignOutButton redirectUrl="/">Log Out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
