"use client"; // Mark this as a Client Component

import { usePathname } from "next/navigation";
import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/Footer";

export default function RootLayoutClient({ children }) {
  const pathname = usePathname(); // Get current path
  const isDashboard = pathname.startsWith("/dashboard"); // Check if it's Dashboard
  const isSignIn = pathname.startsWith("/sign-in"); // Check if it's Sign-in Page
  const isSignUp = pathname.startsWith("/sign-up"); // Check if it's Sign-up Page

  const shouldShowNavbarFooter = !(isDashboard || isSignIn || isSignUp); // ✅ Proper Condition

  return (
    <>
      {shouldShowNavbarFooter && <Navbar />} {/* Show Navbar only if not in Dashboard, Sign-in, or Sign-up */}
      {children}
      {shouldShowNavbarFooter && <Footer />} {/* Show Footer only if not in Dashboard, Sign-in, or Sign-up */}
    </>
  );
}
