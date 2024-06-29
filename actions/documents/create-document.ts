"use server";

import { auth } from "@clerk/nextjs/server";

import { z } from "zod";
import { createServerAction } from "zsa";

import { db } from "@/db";

const CreateDocumentschema = z.object({
  title: z.string(),
  parentDocument: z.string().optional(),
});

export const createDocument = createServerAction()
  .input(CreateDocumentschema)
  .handler(async ({ input }) => {
    const { userId } = auth();
    if (!userId) {
      throw new Error("Unauthenticated!");
    }

    let document;

    document = await db.document.create({
      data: {
        ...input,
        isArchived: false,
        isPublished: false,
        userId,
      },
    });

    return document;
  });
