"use server";

import { auth } from "@clerk/nextjs/server";

import { z } from "zod";
import { createServerAction } from "zsa";

import { db } from "@/db";

const Schema = z.object({
  id: z.string(),
});

export const getDocumentById = createServerAction()
  .input(Schema)
  .handler(async ({ input }) => {
    const { userId } = auth();
    if (!userId) {
      throw new Error("Unauthenticated!");
    }

    let document;

    document = await db.document.findUnique({
      where: { id: input.id, userId },
      select: {
        content: true,
        coverImage: true,
        icon: true,
        title: true,
        createdAt: true,
        isArchived: true,
        isPublished: true,
        parentDocument: true,
      },
    });

    if (!document) {
      throw new Error("Document not found");
    }
    if (!document.isArchived) {
      return document;
    }

    return null;
  });
