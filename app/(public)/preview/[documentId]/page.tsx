"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import { Document } from "@prisma/client";

import { ImageCover, Toolbar } from "@/components/shared";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/utils";
import { useServerAction } from "zsa-react";
import { updateDocument } from "@/actions";
import { useRevalidate } from "@/lib/hooks";

interface DocumentIdPageProps {
  params: {
    documentId: Document["id"];
  };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/shared/editor"), { ssr: false }),
    [],
  );

  const {
    data: document,
    isPending,
    isFetching,
    isLoading,
  } = useQuery<Document>({
    queryKey: [params.documentId],
    queryFn: () => fetcher(`/api/documents/${params.documentId}`),
  });

  const { revalidate } = useRevalidate();

  const { execute: update } = useServerAction(updateDocument, {
    onSuccess: () => revalidate(params.documentId),
  });

  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content,
    });
  };

  if (isLoading) {
    return (
      <div>
        <ImageCover.Skeleton />
        <div className="mx-auto mt-10 md:max-w-3xl lg:max-w-4xl">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-1/2" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </div>
      </div>
    );
  }

  if (!document) {
    return <>Not Found</>;
    // throw new Error("Document not found!");
  }

  return (
    <div className="pb-40">
      <ImageCover preview url={document.coverImage} />
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <Toolbar preview initialData={document} />
        <Editor
          editable={false}
          onChange={onChange}
          initialContent={document.content}
        />
      </div>
    </div>
  );
};
export default DocumentIdPage;
