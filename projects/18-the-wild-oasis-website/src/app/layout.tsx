import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";

import Header from "@components/header";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-josefin-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Welcome / The Wild Oasis",
    template: "%s / The Wild Oasis",
  },
  description:
    "Luxurious cabins hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.variable} font-sans antialiased bg-primary-950 text-primary-100 min-h-dvh flex flex-col`}
      >
        <Header />
        <main className="py-8 md:py-10 px-5 md:px-8 flex-1 grid">
          {children}
        </main>
      </body>
    </html>
  );
}
