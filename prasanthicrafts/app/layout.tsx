import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ChatbotWrapper from "@/components/ChatbotWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prasanthi Crafts - Handcrafted Arts & Crafts",
  description: "Discover beautiful handcrafted arts and crafts from talented artisans at Prasanthi Crafts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
        <ChatbotWrapper />
      </body>
    </html>
  );
}
