import { auth } from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db";

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    const documents = await db.document.findMany({
      where: { userId, isArchived: true },
      select: {
        id: true,
        title: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(documents);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
