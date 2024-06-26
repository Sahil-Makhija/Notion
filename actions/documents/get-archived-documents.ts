"use server";

import { auth } from "@clerk/nextjs/server";

import { createServerAction } from "zsa";

import { db } from "@/db";

export const getArchivedDocuments = createServerAction().handler(async () => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthenticated!");

  let documents;

  documents = await db.document.findMany({
    where: { userId, isArchived: true },
    select: {
      id: true,
      title: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return documents;
});
