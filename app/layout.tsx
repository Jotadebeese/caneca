import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "@/src/styles/globals.css";
import Footer from "@/src/components/Footer";

const dm_sans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dm_sans.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
