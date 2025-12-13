import SmoothScroll from "@/components/animations/SmoothScroll";
import HomePage from "@/components/HomePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "NeuroBio NB-07: Government-grade biometric tablet featuring FBI-certified 508 DPI fingerprint scanner, facial recognition (RGB+IR), iris scanner, and MRZ passport reader. IP67 rated, MIL-STD-810G certified, 6GB RAM, ARM Octa-Core processor. Trusted by law enforcement, border control, and healthcare sectors worldwide.",
  openGraph: {
    title: "NeuroBio NB-07 | Government-Grade Biometric Tablet",
    description:
      "Government-grade biometric tablet with FBI-certified fingerprint scanner, facial recognition, iris scanner, and passport reader. IP67 rated and MIL-STD-810G certified.",
  },
};

export default function Home() {
  return (
    <SmoothScroll>
      <HomePage />
    </SmoothScroll>
  );
}
