import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/providers/theme-providers";
import ReduxProvider from "./auth/_components/ReduxProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notion",
  description: "The connected workspace where better, faster work happens.",
  icons:{
    icon:[
      {
        media: "(prefers-color-scheme:light)",
        url:"/logo.webp",
        href:"/logo.webp"
      },
      {
        media: "(prefers-color-scheme:dark)",
        url:"/logo.webp",
        href:"/logo.webp"
      },
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <ThemeProvider 
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="Notion-theme"
          >
          {children}
          <Toaster />
         </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
