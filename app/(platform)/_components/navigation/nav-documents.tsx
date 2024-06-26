import { Plus, Trash } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui";

import { DocumentListContainer } from "./document-list";
import { NewPageItem } from "./new-page-item";
import { Item } from "./item";
import { TrashBox } from "../trash-box";

export const NavDocuments = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <div className="mt-4">
      <DocumentListContainer />
      <NewPageItem className="my-2" label="Add a page" icon={Plus} />
      <Popover>
        <PopoverTrigger className="mt-4 w-full">
          <Item label="Trash" icon={Trash} />
        </PopoverTrigger>
        <PopoverContent
          side={isMobile ? "bottom" : "right"}
          className="w-72 p-0"
        >
          <TrashBox />
        </PopoverContent>
      </Popover>
    </div>
  );
};
