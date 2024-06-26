"use client";

import { fetcher } from "@/lib/utils";
import { Document } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Item } from "../item";
import { DocumentListView } from "./documents-list-view";

type DocumentListContainerProps = {
  parentDocumentId?: Document["id"];
  level?: number;
  //   data?: Array<unknown>; //TODO: Something from `Document`
};

export const DocumentListContainer = ({
  level = 0,
  parentDocumentId,
}: DocumentListContainerProps) => {
  const { data: documents, isPending } = useQuery<Document[]>({
    queryKey: [`nav-docs-${parentDocumentId}`],
    queryFn: () => fetcher(`/api/documents/sidebar/${parentDocumentId}`),
  });

  if (isPending) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return <DocumentListView documents={documents} level={level} />;
};
