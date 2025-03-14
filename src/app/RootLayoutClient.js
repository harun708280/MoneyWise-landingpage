"use client"; // Mark this as a Client Component

import { usePathname } from "next/navigation";
import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/Footer";

export default function RootLayoutClient({ children }) {
  const pathname = usePathname(); // Get current path
  const isDashboard = pathname.startsWith("/dashboard"); // Check if it's dashboard

  return (
    <>
      {!isDashboard && <Navbar />} {/* Hide Navbar if on Dashboard */}
      {children}
      {!isDashboard && <Footer />} {/* Hide Footer if on Dashboard */}
    </>
  );
}
