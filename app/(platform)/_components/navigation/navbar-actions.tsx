import { PlusCircle, Search, Settings } from "lucide-react";

import { useSearch, useSettings } from "@/lib/hooks";

import { Item } from "./item";
import { NewPageItem } from "./new-page-item";
import { UserItem } from "./user-item";

export const NavbarActions = () => {
  const search = useSearch();
  const settings = useSettings();
  return (
    <div>
      <UserItem />
      <Item label="Search" icon={Search} isSearch onClick={search.onOpen} />
      <Item label="Settings" icon={Settings} onClick={settings.onOpen} />
      <NewPageItem label="New Page" icon={PlusCircle} />
    </div>
  );
};
