import React from "react";
import "./globals.css";
import { Lexend } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/shared/sidebar/Sidebar";
import { MessageProvider } from "@/context/DataContext";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-lexend"
});

export const metadata: Metadata = {
  title: "Kapy Management",
  description: "Kapy Management",
  icons: {
    icon: "/assets/images/icon.png"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Chewy&family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body
        cz-shortcut-listen="true"
        className="font-helvetica overflow-scroll custom-scrollbar"
      >
        <ThemeProvider>
          <MessageProvider>{children}</MessageProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
