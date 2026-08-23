import type { Metadata, Viewport } from "next";
import { Mona_Sans, Unbounded, DM_Mono, Inter } from "next/font/google";
import "./globals.css";

// Display face. Variable weight + width — the width axis is what lets the
// wordmark go extended without a second font. Free (OFL).
const mona = Mona_Sans({
  variable: "--font-mona",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "block",
});

// The wordmark face (see --font-wordmark in globals.css). Free (OFL).
const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "latin-ext"],
  display: "block",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aydın Tokur — Design Engineer",
  description:
    "Your friendly neighborhood design engineer. I design product systems and build them.",
};

export const viewport: Viewport = {
  themeColor: "#faf9f6",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${mona.variable} ${unbounded.variable} ${inter.variable} ${dmMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
