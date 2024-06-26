"use server";

import { auth } from "@clerk/nextjs/server";

import { z } from "zod";
import { createServerAction } from "zsa";

import { revalidateTag } from "next/cache";

import { db } from "@/db";

const Schema = z.object({
  id: z.string(),
});

export const archiveDocument = createServerAction()
  .input(Schema)
  .handler(async ({ input }) => {
    const { userId } = auth();
    if (!userId) {
      throw new Error("Unauthenticated!");
    }

    let document;

    document = await db.document.update({
      where: { id: input.id, userId },
      data: { isArchived: true },
    });

    if (!document) {
      throw new Error("Document not found");
    }
    revalidateTag(`nav-docs-${document.parentDocument || "undefined"}`);

    return document;
  });
