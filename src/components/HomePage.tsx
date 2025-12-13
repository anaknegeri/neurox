"use client";

import {
  useGsapScrollTrigger,
  useHeroAnimation,
} from "@/components/animations/GsapAnimations";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/MotionComponents";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Battery,
  Camera,
  ChevronDown,
  Cpu,
  Fingerprint,
  Monitor,
  Radio,
  ScanBarcode,
  Shield,
  Smartphone,
  Thermometer,
  Wifi,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { label: "Overview", href: "overview" },
  { label: "Scanning", href: "scanning" },
  { label: "Features", href: "features" },
  { label: "Use Cases", href: "use-cases" },
  { label: "Tech Specs", href: "tech-specs" },
];

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const [expandedSpecs, setExpandedSpecs] = useState<Set<number>>(new Set([0]));

  useGsapScrollTrigger();
  useHeroAnimation({ heroRef });

  // Toggle spec category expansion
  const toggleSpec = (index: number) => {
    setExpandedSpecs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) =>
        document.getElementById(item.href)
      );
      const scrollPosition = window.scrollY + 150; // Offset for navbar height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].href);
          return;
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section - Apple Style */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center pt-32 px-6"
      >
        {/* Background - pure black like Apple */}
        <div className="absolute inset-0 bg-black" />

        {/* Top content */}
        <div className="relative z-10 text-center">
          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-4">
            NeuroBio NB-07
          </h1>

          <p className="hero-tagline text-3xl md:text-5xl lg:text-6xl font-semibold">
            <span className="bg-gradient-to-r from-orange-400 via-rose-400 to-violet-400 bg-clip-text text-transparent">
              Identity Secured.
            </span>{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Future Enabled.
            </span>
          </p>
        </div>

        {/* Center product image - the hero */}
        <div className="hero-image relative flex-1 flex items-center justify-center w-full max-w-5xl mx-auto my-8">
          <Image
            src="/product__1.png"
            alt="Neurox Industrial Tablet"
            width={900}
            height={700}
            className="w-full max-w-3xl h-auto object-contain"
            priority
          />
        </div>

        {/* Bottom CTA - like Apple */}
        <div className="hero-buttons relative z-10 text-center pb-16">
          <Button
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8 text-base font-medium mb-4"
          >
            Get Quote
          </Button>
          <p className="hero-description text-zinc-400 text-lg">
            Government-Grade Biometric • IP67 Certified • MIL-STD-810G
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-32 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-20">
            <p className="text-violet-400 font-medium mb-4 uppercase tracking-wider">
              Government-Grade Biometric Solution
            </p>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Identity meets security.
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Engineered for identity enrollment and verification in critical
              operations. Border control, law enforcement, healthcare — NeuroBio
              NB-07 delivers FBI-certified biometric authentication wherever you
              need it.
            </p>
          </FadeIn>

          {/* Feature highlights grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Processor */}
            <div className="feature-card group relative rounded-3xl bg-zinc-950 border border-zinc-800 p-8 overflow-hidden hover:border-violet-500/50 transition-colors duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-violet-600/20 to-transparent rounded-full blur-3xl group-hover:from-violet-600/30 transition-all duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center mb-6">
                  <Cpu className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-2">ARM-Based Processor</h3>
                <p className="text-zinc-400 mb-4">
                  High-performance octa-core ARM-based processor engineered to
                  handle demanding biometric processing and real-time identity
                  verification.
                </p>
                <div className="flex gap-6 text-sm">
                  {[
                    { value: "8", label: "Core CPU" },
                    { value: "ARM", label: "Architecture" },
                    { value: "6GB", label: "RAM" },
                  ].map((stat, i) => (
                    <div key={i}>
                      <p className="text-2xl font-bold gradient-text">
                        {stat.value}
                      </p>
                      <p className="text-zinc-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Display */}
            <div className="feature-card group relative rounded-3xl bg-zinc-950 border border-zinc-800 p-8 overflow-hidden hover:border-cyan-500/50 transition-colors duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cyan-600/20 to-transparent rounded-full blur-3xl group-hover:from-cyan-600/30 transition-all duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center mb-6">
                  <Monitor className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-2">8&quot; HD Display</h3>
                <p className="text-zinc-400 mb-4">
                  IPS display with 1280×800 resolution and capacitive
                  multi-touch. Crystal clear in both bright and dark conditions.
                </p>
                <div className="flex gap-6 text-sm">
                  <div>
                    <p className="text-2xl font-bold text-cyan-400">1280</p>
                    <p className="text-zinc-500">x 800 pixels</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-cyan-400">IPS</p>
                    <p className="text-zinc-500">Wide angle</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rugged Features */}
            <div className="feature-card group relative rounded-3xl bg-zinc-950 border border-zinc-800 p-8 overflow-hidden hover:border-amber-500/50 transition-colors duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-600/20 to-transparent rounded-full blur-3xl group-hover:from-amber-600/30 transition-all duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-2">IP67 Certified</h3>
                <p className="text-zinc-400 mb-4">
                  Military-grade housing with superior protection. Drop
                  protection 1.2m (MIL-STD-810G), fully waterproof and dustproof
                  for mission-critical operations.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "IP67 Waterproof",
                    "Dustproof",
                    "MIL-STD-810G",
                    "-10°C ~ +55°C",
                  ].map((badge, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-amber-500/20 text-amber-300 border-amber-500/30"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Battery */}
            <div className="feature-card group relative rounded-3xl bg-zinc-950 border border-zinc-800 p-8 overflow-hidden hover:border-emerald-500/50 transition-colors duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-emerald-600/20 to-transparent rounded-full blur-3xl group-hover:from-emerald-600/30 transition-all duration-500" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center mb-6">
                  <Battery className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-2">Extended Battery</h3>
                <p className="text-zinc-400 mb-4">
                  8000-10000mAh removable battery (model dependent). All-day
                  operation with 500+ hours standby. Hot-swap ready for
                  continuous field work.
                </p>
                <div className="flex gap-4">
                  {[
                    { value: "12+", label: "hours work" },
                    { value: "500+", label: "hours standby" },
                    { value: "~3", label: "hours charge" },
                  ].map((stat, i) => (
                    <div key={i}>
                      <p className="text-4xl font-bold text-emerald-400">
                        {stat.value}
                      </p>
                      <p className="text-zinc-500 text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scanning Section */}
      <section id="scanning" className="py-32 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="text-rose-400 font-medium mb-4 uppercase tracking-wider">
              Advanced Document & Barcode Scanner
            </p>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Scan everything.
              <br />
              <span className="text-rose-400">From barcodes to passports.</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              High-performance scanning with 1D/2D barcode + OCR. MRZ passport
              reader for instant document verification. Built for border control
              and identity management.
            </p>
          </FadeIn>

          {/* Scanning showcase */}
          <FadeIn delay={0.2}>
            <div className="relative rounded-[3rem] bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 overflow-hidden mb-16 p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Barcode visualization */}
                <div className="relative aspect-square rounded-2xl bg-black/50 border border-zinc-800 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <ScanBarcode className="w-24 h-24 mx-auto mb-4 text-rose-400" />
                      <p className="text-zinc-500 text-sm">
                        1D & 2D Barcode Support
                      </p>
                    </div>
                  </div>

                  {/* Scanning laser line animation */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-rose-500 to-transparent animate-scan">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-rose-400 to-transparent blur-sm" />
                    </div>
                  </div>

                  {/* Corner indicators */}
                  {[
                    "top-4 left-4 border-l-2 border-t-2",
                    "top-4 right-4 border-r-2 border-t-2",
                    "bottom-4 left-4 border-l-2 border-b-2",
                    "bottom-4 right-4 border-r-2 border-b-2",
                  ].map((classes, i) => (
                    <div
                      key={i}
                      className={`absolute w-8 h-8 ${classes} border-rose-500`}
                    />
                  ))}
                </div>

                {/* Scanning features */}
                <StaggerContainer className="space-y-6">
                  {[
                    {
                      icon: Zap,
                      title: "Instant Recognition",
                      desc: "Ultra-fast scanning and OCR for rapid identity verification and document processing.",
                    },
                    {
                      icon: ScanBarcode,
                      title: "MRZ Passport Reader",
                      desc: "Machine-readable zone (MRZ) scanning for passports, IDs, and travel documents. Full OCR support.",
                    },
                    {
                      icon: Radio,
                      title: "Universal Barcode Support",
                      desc: "Reads all 1D (UPC, EAN, Code 128) and 2D formats (QR, Data Matrix, PDF417) plus smart card NFC.",
                    },
                  ].map((feature, i) => (
                    <StaggerItem key={i}>
                      <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-rose-500/30 transition-colors">
                        <div className="flex items-center gap-4 mb-2">
                          <feature.icon className="w-6 h-6 text-rose-400" />
                          <h4 className="font-semibold text-lg">
                            {feature.title}
                          </h4>
                        </div>
                        <p className="text-zinc-400 text-sm">{feature.desc}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </div>
          </FadeIn>

          {/* Scanning specs */}
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "<100", unit: "ms", label: "scan speed" },
              { value: "1D/2D", unit: "", label: "barcode support" },
              { value: "N660", unit: "", label: "engine" },
              { value: "30cm", unit: "+", label: "scan distance" },
            ].map((spec, index) => (
              <StaggerItem key={index}>
                <div className="spec-item text-center p-6 rounded-2xl border border-zinc-800 hover:border-rose-500/30 transition-colors">
                  <p className="text-3xl md:text-4xl font-bold text-rose-400">
                    {spec.value}
                    <span className="text-lg text-zinc-500">{spec.unit}</span>
                  </p>
                  <p className="text-sm text-zinc-500 mt-2">{spec.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-20">
            <p className="text-cyan-400 font-medium mb-4 uppercase tracking-wider">
              Complete Biometric Suite
            </p>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Everything you need.
              <br />
              <span className="text-zinc-500">For identity assurance.</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Complete biometric and scanning features for critical identity
              verification. From fingerprints to iris scan, everything in one
              device.
            </p>
          </FadeIn>

          {/* Features grid */}
          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Camera,
                title: "Biometric Camera System",
                description:
                  "5MP front camera with RGB + IR for face recognition. 13MP rear with Auto Focus & LED Flash for document capture.",
                color: "from-rose-500 to-rose-700",
                hoverBorder: "hover:border-rose-500/50",
              },
              {
                icon: Fingerprint,
                title: "FBI-Certified Fingerprint",
                description:
                  "508 DPI FBI-certified fingerprint scanner with ISO 19794-6 iris recognition for government-grade biometric authentication.",
                color: "from-violet-500 to-violet-700",
                hoverBorder: "hover:border-violet-500/50",
              },
              {
                icon: Smartphone,
                title: "NFC Module",
                description:
                  "Read Mifare cards, NFC tagging, and secure access cards for access control and payments.",
                color: "from-blue-500 to-blue-700",
                hoverBorder: "hover:border-blue-500/50",
              },
              {
                icon: Battery,
                title: "Removable Battery",
                description:
                  "10000mAh removable and replaceable battery. Hot-swap for zero-downtime operations.",
                color: "from-green-500 to-green-700",
                hoverBorder: "hover:border-green-500/50",
              },
              {
                icon: Wifi,
                title: "Dual-Band WiFi",
                description:
                  "Stable 2.4GHz & 5GHz WiFi connection. Supports GSM, 3G, and 4G LTE for maximum mobility.",
                color: "from-cyan-500 to-cyan-700",
                hoverBorder: "hover:border-cyan-500/50",
              },
              {
                icon: Thermometer,
                title: "Extreme Durability",
                description:
                  "Operates from -10°C to +55°C. MIL-STD-810G drop protection 1.2m for mission-critical field operations.",
                color: "from-amber-500 to-amber-700",
                hoverBorder: "hover:border-amber-500/50",
              },
            ].map((feature, index) => (
              <StaggerItem key={index}>
                <div
                  className={`feature-card group rounded-2xl bg-zinc-950 border border-zinc-800 p-6 ${feature.hoverBorder} transition-all duration-300`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Additional connectivity info */}
          <FadeIn delay={0.3} className="mt-16">
            <div className="p-8 rounded-3xl bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    Connectivity & Expansion
                  </h3>
                  <p className="text-zinc-400 mb-6">
                    NeuroBio NB-07 features USB Type-C with OTG support for
                    flexible connectivity. Supports Nano SIM + TF Card for
                    storage expansion and cellular connectivity. Built-in GNSS
                    with AGPS for location tracking.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "USB Type-C (OTG)",
                      "Nano SIM",
                      "TF Card",
                      "4G LTE",
                      "GNSS/AGPS",
                    ].map((badge, i) => (
                      <Badge
                        key={i}
                        className="bg-zinc-800 text-zinc-300 border-zinc-700"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: "64GB", label: "Max Storage" },
                    { value: "6GB", label: "RAM" },
                    { value: "4G", label: "LTE Ready" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="text-center p-4 rounded-xl bg-zinc-900/50"
                    >
                      <p className="text-2xl font-bold text-cyan-400">
                        {stat.value}
                      </p>
                      <p className="text-xs text-zinc-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-20">
            <p className="text-emerald-400 font-medium mb-4 uppercase tracking-wider">
              Real-World Applications
            </p>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Trusted by organizations.
              <br />
              <span className="text-zinc-500">Worldwide.</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              NeuroBio NB-07 powers identity verification across critical
              sectors, from border control to healthcare, ensuring security and
              compliance.
            </p>
          </FadeIn>

          {/* Use cases grid */}
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: "Border Control & Immigration",
                description:
                  "Instant passport verification with MRZ reader, facial recognition, and fingerprint matching for secure border crossings.",
                icon: Shield,
                gradient: "from-blue-500 to-cyan-500",
                features: [
                  "MRZ Passport Scan",
                  "Face + Iris Match",
                  "Real-time Verification",
                ],
              },
              {
                title: "Law Enforcement",
                description:
                  "FBI-certified fingerprint capture and on-field identity verification for police operations and investigations.",
                icon: Fingerprint,
                gradient: "from-violet-500 to-purple-500",
                features: [
                  "FBI-Certified 508 DPI",
                  "Mobile Database Access",
                  "Secure Transmission",
                ],
              },
              {
                title: "Healthcare & Patient ID",
                description:
                  "Accurate patient identification preventing medical errors with biometric authentication and document scanning.",
                icon: Camera,
                gradient: "from-rose-500 to-pink-500",
                features: [
                  "Patient Enrollment",
                  "Duplicate Prevention",
                  "Insurance Verification",
                ],
              },
              {
                title: "Banking & Financial Services",
                description:
                  "KYC compliance with government-grade biometric verification for account opening and high-value transactions.",
                icon: Shield,
                gradient: "from-amber-500 to-orange-500",
                features: ["KYC Compliance", "Anti-Fraud", "Remote Onboarding"],
              },
              {
                title: "Government ID Enrollment",
                description:
                  "Complete biometric capture for national ID, voter registration, and social benefit programs.",
                icon: ScanBarcode,
                gradient: "from-green-500 to-emerald-500",
                features: [
                  "Multi-modal Biometrics",
                  "Offline Capable",
                  "ISO Compliant",
                ],
              },
              {
                title: "Access Control & Security",
                description:
                  "High-security facility access with multi-factor biometric authentication and real-time verification.",
                icon: Smartphone,
                gradient: "from-cyan-500 to-teal-500",
                features: [
                  "Multi-factor Auth",
                  "Time & Attendance",
                  "Audit Trail",
                ],
              },
            ].map((useCase, index) => (
              <StaggerItem key={index}>
                <div className="group relative rounded-2xl bg-zinc-950 border border-zinc-800 p-6 hover:border-emerald-500/50 transition-all duration-300 h-full flex flex-col">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${useCase.gradient} flex items-center justify-center mb-4`}
                  >
                    <useCase.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{useCase.title}</h3>
                  <p className="text-zinc-400 text-sm mb-4 flex-grow">
                    {useCase.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-800">
                    {useCase.features.map((feature, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-zinc-900 text-zinc-400 border-zinc-800 text-xs"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Tech Specs Section */}
      <section id="tech-specs" className="py-32 px-6 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="text-violet-400 font-medium mb-4 uppercase tracking-wider">
              Technical Specifications
            </p>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Built to perform.
            </h2>
            <p className="text-zinc-400">
              Industrial-grade specifications for demanding professionals.
            </p>
          </FadeIn>

          {/* Specs categories */}
          <div className="space-y-8">
            {[
              {
                icon: Monitor,
                iconColor: "text-cyan-400",
                title: "Display & Performance",
                specs: [
                  { label: "Display", value: '8" IPS HD, 1280 × 800 pixels' },
                  {
                    label: "Processor",
                    value: "Octa-Core ARM-based Processor",
                  },
                  { label: "RAM", value: "6GB" },
                  { label: "Storage", value: "16GB / 32GB / 64GB ROM" },
                  { label: "Operating System", value: "Android 9.0" },
                  { label: "Touch Screen", value: "Capacitive Multi-touch" },
                ],
              },
              {
                icon: Camera,
                iconColor: "text-rose-400",
                title: "Camera System",
                specs: [
                  {
                    label: "Rear Camera",
                    value: "13MP Auto Focus + LED Flash",
                  },
                  { label: "Front Camera", value: "5MP" },
                ],
              },
              {
                icon: Battery,
                iconColor: "text-emerald-400",
                title: "Battery & Power",
                specs: [
                  { label: "Battery", value: "3.7V 8000-10000mAh Removable" },
                  { label: "Working Time", value: ">12 hours" },
                  { label: "Standby Time", value: ">500 hours" },
                  { label: "Charging Time", value: "~3 hours" },
                ],
              },
              {
                icon: Wifi,
                iconColor: "text-blue-400",
                title: "Connectivity",
                specs: [
                  { label: "WiFi", value: "Dual-band 2.4GHz & 5GHz" },
                  { label: "Bluetooth", value: "BLE 4.2 / 5.0" },
                  { label: "Cellular", value: "GSM / 3G / 4G LTE" },
                  { label: "NFC", value: "Mifare, NFC Tagging, Smart Card" },
                  { label: "Ports", value: "USB Type-C (OTG)" },
                  { label: "Navigation", value: "GNSS + AGPS" },
                ],
              },
              {
                icon: ScanBarcode,
                iconColor: "text-violet-400",
                title: "Biometric & Scanning",
                specs: [
                  {
                    label: "Fingerprint",
                    value: "FBI-certified 508 DPI sensor",
                  },
                  { label: "Face Recognition", value: "RGB + IR Camera" },
                  { label: "Iris Scan", value: "ISO 19794-6 certified" },
                  { label: "Barcode Scanner", value: "1D/2D + OCR" },
                  { label: "MRZ Reader", value: "Passport/ID Document OCR" },
                  { label: "Smart Card", value: "NFC + Contact Reader" },
                ],
              },
              {
                icon: Shield,
                iconColor: "text-amber-400",
                title: "Durability & Physical",
                specs: [
                  { label: "Protection", value: "IP67 Rated (Waterproof)" },
                  {
                    label: "Drop Protection",
                    value: "1.2m MIL-STD-810G",
                  },
                  { label: "Operating Temp", value: "-10°C to +55°C" },
                  { label: "Dimensions", value: "260 × 117 × 32 mm" },
                  { label: "Weight", value: "0.8 kg" },
                  { label: "Warranty", value: "1 Year" },
                ],
              },
            ].map((category, catIndex) => (
              <FadeIn key={catIndex} delay={catIndex * 0.1}>
                <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 overflow-hidden">
                  <button
                    onClick={() => toggleSpec(catIndex)}
                    className="w-full px-6 py-4 bg-zinc-900 border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <category.icon
                        className={`w-5 h-5 ${category.iconColor}`}
                      />
                      {category.title}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${
                        expandedSpecs.has(catIndex) ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`divide-y divide-zinc-800 transition-all duration-300 ease-in-out overflow-hidden ${
                      expandedSpecs.has(catIndex)
                        ? "max-h-[1000px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {category.specs.map((spec, index) => (
                      <div
                        key={index}
                        className="spec-item flex justify-between items-center py-4 px-6 hover:bg-white/[0.02] transition-colors"
                      >
                        <span className="text-zinc-400">{spec.label}</span>
                        <span className="text-right font-medium">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-violet-950/20 to-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-violet-600/20 to-cyan-600/20 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn>
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">
                Secure identities. Enable trust.
              </span>
            </h2>
            <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
              NeuroBio NB-07 is ready to enhance security in border control, law
              enforcement, and identity verification operations. Get
              government-grade biometric authentication for your organization.
            </p>
          </FadeIn>

          {/* Trust indicators */}
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {[
                { icon: Shield, text: "1 Year Warranty" },
                { icon: Zap, text: "Fast Shipping" },
                { icon: Radio, text: "24/7 Technical Support" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm text-zinc-400"
                >
                  <item.icon className="w-4 h-4 text-emerald-400" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white rounded-full px-12 text-lg"
              >
                Request Quote
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-zinc-700 bg-transparent text-white hover:bg-white hover:text-black rounded-full px-12 text-lg transition-colors"
              >
                Download Specs PDF
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
