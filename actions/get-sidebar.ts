"use server";

import { auth } from "@clerk/nextjs/server";

import { z } from "zod";
import { createServerAction } from "zsa";

import { db } from "@/db";

const Schema = z.object({
  parentDocument: z.string().optional(),
});

export const getSidebarHandler = async ({
  input,
}: {
  input: z.infer<typeof Schema>;
}) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthenticated!");
  }

  let documents;
  documents = await db.document.findMany({
    where: {
      userId,
      isArchived: false,
      parentDocument: input.parentDocument ?? null,
    },
    select: {
      id: true,
      icon: true,
      title: true,
      parentDocument: true,
    },
    orderBy: { createdAt: "asc" },
  });

  return documents;
};

export const getSidebar = createServerAction()
  .input(Schema)
  .handler(getSidebarHandler);
