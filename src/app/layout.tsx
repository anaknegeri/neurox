import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "NeuroX | Biometric Solutions",
    template: "%s | NeuroX",
  },
  description:
    "Advanced biometric solutions including NeuroBio NB-07 tablet and Biometric Enrollment Kit. FBI-certified fingerprint scanner, facial recognition, iris scanner, and MRZ passport reader. IP67 rated, MIL-STD-810G certified. Trusted by governments and law enforcement worldwide.",
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
    "biometric enrollment kit",
  ],
  authors: [{ name: "NeuroX" }],
  creator: "NeuroX",
  publisher: "NeuroX",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://neurox.ae",
    siteName: "NeuroX",
    title: "NeuroX | Advanced Biometric Solutions",
    description:
      "Advanced biometric solutions including NeuroBio NB-07 tablet and Biometric Enrollment Kit. FBI-certified and trusted by governments worldwide.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NeuroX Biometric Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NeuroX | Advanced Biometric Solutions",
    description:
      "Advanced biometric solutions including NeuroBio NB-07 tablet and Biometric Enrollment Kit. FBI-certified and trusted by governments worldwide.",
    images: ["/og-image.jpg"],
    creator: "@neurox",
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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
