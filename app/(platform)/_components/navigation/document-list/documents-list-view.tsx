"use client";

import { FileIcon } from "lucide-react";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Document } from "@prisma/client";

import { cn } from "@/lib/utils";
import { Item } from "../item";
import { DocumentListContainer } from "./document-list-container";

interface DocumentListProps {
  documents?: Document[];
  level?: number;
}

export const DocumentListView = ({
  documents,
  level = 0,
}: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  return (
    <>
      <p
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
        className={cn(
          "mx-2 hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden",
        )}
      >
        No pages inside
      </p>
      {documents?.map((document) => (
        <div key={document.id}>
          <Item
            id={document.id}
            onClick={() => onRedirect(document.id)}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={params.documentId === document.id}
            level={level}
            onExpand={() => onExpand(document.id)}
            expanded={expanded[document.id]}
          />
          {expanded[document.id] && (
            <DocumentListContainer
              parentDocumentId={document.id}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </>
  );
};
