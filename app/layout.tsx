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

export const metadata: Metadata = {
  title: "Truenapsh Portfolio",
  description: "Creative, Reliable, Innovative Digital Solutions",
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
