import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { parentDocumentId?: string } },
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated!", { status: 401 });
    }
    let parentDocument = null;
    if (
      params.parentDocumentId !== "null" &&
      params.parentDocumentId !== "undefined"
    ) {
      parentDocument = params.parentDocumentId;
    }
    const documents = await db.document.findMany({
      where: {
        userId,
        isArchived: false,
        parentDocument,
      },
      select: {
        id: true,
        icon: true,
        title: true,
        parentDocument: true,
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(documents);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
