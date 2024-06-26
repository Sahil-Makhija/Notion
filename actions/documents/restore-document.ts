"use server";

import { auth } from "@clerk/nextjs/server";

import { z } from "zod";
import { createServerAction } from "zsa";

import { db } from "@/db";
import { Document } from "@prisma/client";

const Schema = z.object({
  id: z.string(),
});

export const restoreDocument = createServerAction()
  .input(Schema)
  .handler(async ({ input }) => {
    const { userId } = auth();
    if (!userId) {
      throw new Error("Unauthenticated!");
    }

    let document;

    document = await db.document.update({
      where: { id: input.id, userId, isArchived: true },
      data: { isArchived: false },
    });

    if (!document) {
      throw new Error("Document not found");
    }

    const restoreChildren = async (id: Document["id"]) => {
      const children = await db.document.findMany({
        where: {
          parentDocument: id,
          userId,
        },
        select: {
          id: true,
        },
      });

      for (const child of children) {
        await db.document.update({
          where: {
            id: child.id,
          },
          data: {
            isArchived: false,
          },
        });
        restoreChildren(child.id);
      }
    };

    restoreChildren(input.id);
    return document;
  });
