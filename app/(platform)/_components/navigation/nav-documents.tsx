import { Plus, Trash } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui";

import { DocumentList } from "./documents-list";
import { NewPageItem } from "./new-page-item";
import { Item } from "./item";

export const NavDocuments = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <div className="mt-4">
      <DocumentList />
      <NewPageItem label="Add a page" icon={Plus} />
      <Popover>
        <PopoverTrigger className="mt-4 w-full">
          <Item label="Trash" icon={Trash} />
        </PopoverTrigger>
        <PopoverContent
          side={isMobile ? "bottom" : "right"}
          className="w-72 p-0"
        >
          {/* <TrashBox /> */}
        </PopoverContent>
      </Popover>
    </div>
  );
};
