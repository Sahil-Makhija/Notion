import { Toaster } from "sonner";

import { EdgeStoreProvider } from "@/lib/edgestore";

import { SearchCommand } from "@/components/shared";
import { ModalProvider, QueryProvider } from "@/components/providers";
import { Navigation } from "./_components";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <EdgeStoreProvider>
      <QueryProvider>
        <ModalProvider />
        <Toaster />
        <div className="flex h-full dark:bg-[#1F1F1F]">
          <Navigation />
          <main className="h-full flex-1 overflow-y-auto">
            <SearchCommand />
            {children}
          </main>
        </div>
      </QueryProvider>
    </EdgeStoreProvider>
  );
};

export default PlatformLayout;
