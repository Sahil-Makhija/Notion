"use server";

import { db } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createServerAction } from "zsa";

const schema = z.object({
  id: z.string(),
});

export const removeIcon = createServerAction()
  .input(schema)
  .handler(async ({ input }) => {
    const { userId } = auth();
    if (!userId) {
      throw new Error("Unauthenticated!");
    }
    const document = db.document.update({
      where: {
        userId,
        id: input.id,
      },
      data: {
        icon: null,
      },
    });
    if (!document) {
      throw new Error("Document not found");
    }

    return document;
  });
