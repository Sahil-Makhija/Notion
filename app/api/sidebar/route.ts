import { getSidebarHandler } from "@/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const parentDocument = request.nextUrl.searchParams.get("parent_doc") || "";
    const documents = await getSidebarHandler({
      input: {
        parentDocument: !!parentDocument ? parentDocument : undefined,
      },
    });
    return NextResponse.json({
      documents,
      parentDocument,
    });
  } catch (error) {
    const errorMsg =
      error instanceof Error ? "Unauthenticated" : "Internal Server Error";
    const status = error instanceof Error ? 401 : 500;

    return NextResponse.json(
      {
        data: null,
        error: error,
      },
      { status },
    );
  }
}
