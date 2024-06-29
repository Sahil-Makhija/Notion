"use server";

import { db } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createServerAction } from "zsa";

const schema = z.object({
  documentId: z.string(),
});

export const removeCoverImage = createServerAction()
  .input(schema)
  .handler(async ({ input }) => {
    const { userId } = auth();
    if (!userId) {
      throw new Error("Unauthenticated!");
    }

    const document = await db.document.update({
      where: {
        userId,
        id: input.documentId,
      },
      data: {
        coverImage: null,
      },
    });

    if (!document) {
      throw new Error("Document not found");
    }

    return document;
  });
