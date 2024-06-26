import { ConfirmModal } from "@/components/modals";
import { Document } from "@prisma/client";
import { Trash, Undo } from "lucide-react";

interface TrashItemProps {
  id: Document["id"];
  title: Document["title"];
  onClick: (id: Document["id"]) => void;
  onRemove: (id: Document["id"]) => void;
}

export const TrashItem = ({ id, onClick, onRemove, title }: TrashItemProps) => {
  return (
    <div
      role="button"
      key={id}
      onClick={() => onClick(id)}
      className="flex w-full items-center justify-between rounded-sm text-sm text-primary hover:bg-primary/5"
      aria-label="Document"
    >
      <span className="truncate pl-2">{title}</span>
      <div className="flex items-center">
        <button
          // onClick={(e) => onRestore(e, document.id)}
          className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
          aria-label="Restore Document"
        >
          <Undo className="h-4 w-4 text-muted-foreground" />
        </button>
        <ConfirmModal onConfirm={() => onRemove(id)}>
          <button
            className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
            aria-label="Delete Permanently"
          >
            <Trash className="h-4 w-4 text-muted-foreground" />
          </button>
        </ConfirmModal>
      </div>
    </div>
  );
};
