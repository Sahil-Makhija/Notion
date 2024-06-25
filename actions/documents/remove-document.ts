"use server";

import { auth } from "@clerk/nextjs/server";

import { z } from "zod";
import { createServerAction } from "zsa";

import { revalidatePath } from "next/cache";

import { db } from "@/db";

const Schema = z.object({
  id: z.string(),
});

export const removeDocument = createServerAction()
  .input(Schema)
  .handler(async ({ input }) => {
    const { userId } = auth();
    if (!userId) {
      throw new Error("Unauthenticated!");
    }

    let document;

    document = await db.document.delete({
      where: { id: input.id, userId },
    });

    if (!document) {
      throw new Error("Document not found");
    }

    revalidatePath("/documents");

    return document;
  });
