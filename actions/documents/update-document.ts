"use server";
import { z } from "zod";
import { createServerAction } from "zsa";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/db";

const schema = z.object({
  id: z.string(),
  title: z.string().optional(),
  content: z.string().optional(),
  coverImage: z.string().optional(),
  icon: z.string().optional(),
  isPublished: z.boolean().optional(),
});

export const updateDocument = createServerAction()
  .input(schema)
  .handler(async ({ input }) => {
    const { userId } = auth();
    if (!userId) {
      throw new Error("Unauthenticated!");
    }
    const { id, ...rest } = input;
    const document = await db.document.update({
      where: {
        id,
        userId,
      },
      data: rest,
    });

    return document;
  });
