"use client";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui";
import { useUser } from "@clerk/nextjs";

const DocumentsPage = () => {
  const { user } = useUser();
  const onCreate = () => {};
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.svg"
        alt="empty"
        height="300"
        width="300"
        priority
        className="h-auto dark:hidden"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Notion
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
