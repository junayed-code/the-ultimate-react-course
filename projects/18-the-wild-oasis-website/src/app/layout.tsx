import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
        className={`${josefinSans.variable} font-sans antialiased bg-primary-950 text-primary-100`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
