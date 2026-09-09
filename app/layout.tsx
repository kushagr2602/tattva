import type { Metadata } from "next";
import { Cormorant_Garamond, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { getSiteImages } from "@/lib/catalogue";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import ScrollReveal from "./components/ScrollReveal";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kushagr2602.github.io/"),
  title: `${site.brand} | Silver Gifting`,
  description: `${site.tagline}. Silver gifts for Diwali, weddings and everyday occasions.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { logo } = getSiteImages();
  return (
    <html lang="en" className={`${cormorant.variable} ${hanken.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <SiteHeader logo={logo} />
        <main id="top" className="flex-1">{children}</main>
        <SiteFooter />
        <ScrollReveal />
      </body>
    </html>
  );
}
