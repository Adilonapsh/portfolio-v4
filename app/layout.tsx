import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/providers";
import Navbar from "./components/layouts/navbar";
import Footer from "./components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { CookieConsent } from "@/components/CookieConsent";
import { SplashScreen } from "@/components/SplashScreen";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://truenapsh.my.id";
const siteTitle = "Truenapsh Portfolio";
const siteDescription = "Creative, Reliable, Innovative Digital Solutions";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Truenapsh Portfolio",
  },
  description: siteDescription,
  applicationName: siteTitle,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: siteTitle,
    images: [
      {
        url: "/opengraph.webp",
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@adilonapsh",
    creator: "@adilonapsh",
    title: siteTitle,
    description: siteDescription,
    images: ["/opengraph.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <Providers>
          {process.env.NEXT_PUBLIC_ENABLE_SPLASH_SCREEN !== "false" && <SplashScreen />}
          <Navbar />
          {children}
          <ScrollToTop />
          <CookieConsent />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
