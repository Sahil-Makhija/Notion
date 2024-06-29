import { ClerkProvider } from "@clerk/nextjs";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { QueryProvider, ThemeProvider } from "@/components/providers";
import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Notion",
    template: "%s | Notion",
  },
  description: "Better Workplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} h-screen`}>
        <ClerkProvider afterSignOutUrl={"/"}>
          <QueryProvider>
            <EdgeStoreProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
                storageKey="notion-theme"
              >
                {children}
              </ThemeProvider>
            </EdgeStoreProvider>
          </QueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
