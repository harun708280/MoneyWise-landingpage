"use client";

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import RootLayoutClient from "./RootLayoutClient"; // Import Client Component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Layout({ children }) {
  const pathname = usePathname(); // Get current path

  // Condition to check if path includes "dashboard"
  const isDashboard = pathname.includes("dashboard");

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen text-white antialiased max-w-full overflow-x-hidden",
          geistSans.variable,
          geistMono.variable,
          !isDashboard && "bg-gray-950" // Apply bg-gray-950 only if NOT on dashboard
        )}
      >
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
