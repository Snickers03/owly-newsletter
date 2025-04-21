import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { APP_DESCRIPTION, APP_NAME } from "@/config";
import { Toaster } from "sonner";

import AuthProvider from "@/components/providers/auth-provider";

import TrpcProvider from "../components/providers/trpc-provider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TrpcProvider>
          <AuthProvider>
            {children}
            <Toaster position='top-center' />
          </AuthProvider>
        </TrpcProvider>
      </body>
    </html>
  );
}
