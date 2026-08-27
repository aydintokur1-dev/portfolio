import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Hud } from "@/components/Hud";
import { GateModal } from "@/components/GateModal";
import { AnchorNav } from "@/components/AnchorNav";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const SITE_URL = "https://aydinswork.com";
const TITLE = "Aydın — Design Engineer";
const DESCRIPTION =
  "Your friendly neighborhood design engineer. I design product systems and build them — and my design decisions survive contact with production.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Aydın's Work",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export const viewport: Viewport = {
  themeColor: "#07090f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrument.variable} ${jetbrains.variable}`}
      // The Safari script below adds an attribute before hydration; this
      // keeps React from reporting it (one element deep, same as next-themes).
      suppressHydrationWarning
    >
      <head>
        {/* Safari flag for the stylesheet, set before first paint so the cheaper
            motion below never flashes the expensive version first. Same test
            as `lib/ua.ts`. A data attribute rather than a class: React does
            not own it, so hydration leaves it alone. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(/^((?!chrome|chromium|crios|fxios|edg|android).)*safari/i.test(navigator.userAgent))document.documentElement.setAttribute('data-safari','')",
          }}
        />
      </head>
      <body className="min-h-svh">
        <SmoothScroll />
        <AnchorNav />
        <Hud />
        {children}
        <GateModal />
      </body>
    </html>
  );
}
