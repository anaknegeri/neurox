import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NeuroBio NB-07 | Government-Grade Biometric Tablet",
    template: "%s | NeuroBio",
  },
  description:
    "NeuroBio NB-07: Rugged biometric tablet with FBI-certified fingerprint scanner, facial recognition, iris scanner, and MRZ passport reader. IP67 rated, MIL-STD-810G certified. Trusted by governments and law enforcement worldwide.",
  keywords: [
    "biometric tablet",
    "fingerprint scanner",
    "facial recognition",
    "iris scanner",
    "passport reader",
    "MRZ scanner",
    "rugged tablet",
    "FBI certified",
    "IP67",
    "MIL-STD-810G",
    "government tablet",
    "law enforcement",
    "border control",
    "identity verification",
  ],
  authors: [{ name: "NeuroBio" }],
  creator: "NeuroBio",
  publisher: "NeuroBio",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://neurox.ae",
    siteName: "NeuroBio",
    title: "NeuroBio NB-07 | Government-Grade Biometric Tablet",
    description:
      "Rugged biometric tablet with FBI-certified fingerprint scanner, facial recognition, iris scanner, and MRZ passport reader. Trusted by governments worldwide.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NeuroBio NB-07 Biometric Tablet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NeuroBio NB-07 | Government-Grade Biometric Tablet",
    description:
      "Rugged biometric tablet with FBI-certified fingerprint scanner, facial recognition, iris scanner, and MRZ passport reader.",
    images: ["/og-image.jpg"],
    creator: "@neurobio",
  },
  metadataBase: new URL("https://neurox.ae"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
