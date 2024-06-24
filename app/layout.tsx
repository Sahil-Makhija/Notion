import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

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
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="notion-theme"
          > */}
        <ClerkProvider afterSignOutUrl={"/"}>{children}</ClerkProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
