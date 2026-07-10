import type { Metadata } from "next";
import { IBM_Plex_Serif, Mona_Sans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  variable: "--font-ibm-plex-serif",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShunoApp",
  description:
    "Transform your books into interative AI conversations with ShunoApp. Explore, learn, and engage with your favorite books like never before.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        ibmPlexSerif.variable,
        monaSans.variable,
      )}
    >
      <body
        className={`min-h-full flex flex-col relative font-sans ${monaSans.variable} ${ibmPlexSerif.variable}`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
