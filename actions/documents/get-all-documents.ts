"use server";

import { auth } from "@clerk/nextjs/server";

import { createServerAction } from "zsa";

import { db } from "@/db";

export const getAllDocuments = createServerAction().handler(async () => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthenticated!");

  let documents;

  documents = await db.document.findMany({
    where: { userId, isArchived: false, parentDocument: undefined },
    orderBy: { createdAt: "desc" },
  });

  return documents;
});
