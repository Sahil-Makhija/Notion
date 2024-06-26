import { NextRequest, NextResponse } from "next/server";

import { getSidebarHandler } from "@/actions";

export async function GET(
  req: NextRequest,
  { params }: { params: { parentDocumentId?: string } },
) {
  try {
    let parentDocument;
    if (params.parentDocumentId !== "undefined") {
      parentDocument = params.parentDocumentId;
    }
    const documents = await getSidebarHandler({
      input: { parentDocument },
    });
    return NextResponse.json(documents);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
