import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db";
import { Document } from "@prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { documentId?: Document["id"] } },
) {
  try {
    if (!params.documentId) {
      return new NextResponse("Invalid Document ID!", { status: 400 });
    }
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    const document = await db.document.findUnique({
      where: { userId, id: params.documentId },
    });
    return NextResponse.json(document);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
