import { Toaster } from "sonner";

import { Navigation } from "./_components";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster />
      <div className="flex h-full dark:bg-[#1F1F1F]">
        <Navigation />
        <main className="h-full flex-1 overflow-y-auto">
          {/* <SearchCommand /> */}
          {children}
        </main>
      </div>
    </>
  );
};

export default PlatformLayout;
