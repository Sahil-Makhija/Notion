"use client";

import { TrashBoxView } from "./trash-box-view";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/utils";
import { Document } from "@prisma/client";

export const TrashBoxContainer = React.memo(() => {
  const { data: documents } = useQuery<
    { id: Document["id"]; title: Document["title"] }[]
  >({
    queryKey: ["archived-notes"],
    queryFn: () => fetcher("/api/documents/trash"),
  });
  return <TrashBoxView documents={documents ?? []} />;
});

TrashBoxContainer.displayName = "TrashBoxContainer";
