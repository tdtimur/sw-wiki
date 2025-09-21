import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/sonner";
import { BackToTopButton } from "@/components/back-to-top";
import { Separator } from "@radix-ui/react-separator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Star Wars Wiki",
  description: "Search your favorite Star Wars character",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SiteHeader />
        <Toaster />
        <BackToTopButton />
        <main className="min-h-[85vh] w-full px-[5vw] md:px-[10vw] lg:px-[15vw]">
          {children}
          <Separator className="my-4 w-full" />
          {/* Footer */}
        </main>
        <footer className="border-t py-4 px-[5vw] md:px-[10vw] lg:px-[15vw] flex items-start justify-between">
          <h6 className="text-xs font-semibold">Star Wars Wiki 2025</h6>
          <h6 className="text-xs font-semibold">May The Force be with you.</h6>
        </footer>
      </body>
    </html>
  );
}
