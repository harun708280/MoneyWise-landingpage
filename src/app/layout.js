"use client";

import { Geist, Geist_Mono, Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import { cn } from "@/lib/utils";
import RootLayoutClient from "./RootLayoutClient";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import Loader from "@/components/global/Loader";

// ⬇️ Move fonts OUTSIDE the component
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function Layout({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname.includes("dashboard");

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen text-white antialiased max-w-full overflow-x-hidden",
            geistSans.variable,
            geistMono.variable,
            poppins.variable, 
            !isDashboard && "bg-gray-950"
          )}
        >
          <ClerkLoading><Loader /></ClerkLoading>
          <ClerkLoaded>
            <RootLayoutClient>{children}</RootLayoutClient>
            <Toaster />
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
