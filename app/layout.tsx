import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import { NextAuthProvider } from "@/components/provider";
import { fetchUserFullname } from "@/lib/actions";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Punch in pro",
  description: "勤怠管理ツール",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let fullname = undefined
  const fullnameSession = await fetchUserFullname()
  if (fullnameSession) {
    fullname = fullnameSession.firstname + " " + fullnameSession.lastname
  }
  return (
    <html lang="ja">
        <NextAuthProvider>
          <body className="font-mono">
            <Toaster />
            <Navbar userFullname={fullname}/>
            {children}
          </body>
        </NextAuthProvider>
    </html>
  );
}
