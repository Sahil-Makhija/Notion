"use client";

import { useServerAction } from "zsa-react";
import { useQuery } from "@tanstack/react-query";
// import dynamic from "next/dynamic";
// import { useMemo } from "react";

import { updateDocument } from "@/actions";
import { Document } from "@prisma/client";
import { fetcher } from "@/lib/utils";

// import { Cover } from "@/components/cover";;
import { Skeleton } from "@/components/ui";
import { ImageCover, Toolbar } from "@/components/shared";
interface DocumentIdPageProps {
  params: {
    documentId: Document["id"];
  };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  //   const Editor = useMemo(
  //     () => dynamic(() => import("@/components/editor"), { ssr: false }),
  //     [],
  //   );

  const { data: document, isPending } = useQuery<Document>({
    queryKey: [params.documentId],
    queryFn: () => fetcher(`/api/documents/${params.documentId}`),
  });

  const { execute: update } = useServerAction(updateDocument);

  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content,
    });
  };

  if (isPending) {
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
    return <div>Not found</div>;
  }

  return (
    <div className="pb-40">
      <ImageCover url={document.coverImage} />
      <div className="mx-auto md:max-w-3xl lg:max-w-4xl">
        <Toolbar initialData={document} preview={false} />
        {/* <Editor onChange={onChange} initialContent={document.content} /> */}
      </div>
    </div>
  );
};
export default DocumentIdPage;
