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
import { Separator } from "@/components/ui/separator";
import {
  Battery,
  Camera,
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
  { label: "Tech Specs", href: "tech-specs" },
];

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState<string>("");

  useGsapScrollTrigger();
  useHeroAnimation({ heroRef });

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
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-6xl mx-auto px-6 py-2 flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActiveSection("");
            }}
            className="cursor-pointer"
          >
            <Image
              src="/logo.png"
              alt="Neurox Logo"
              width={200}
              height={64}
              className="h-16 w-auto object-contain"
            />
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={`#${item.href}`}
                className={`transition-colors ${
                  activeSection === item.href
                    ? "text-white font-medium"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {item.label}
                {activeSection === item.href && (
                  <span className="block h-0.5 mt-1 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full" />
                )}
              </a>
            ))}
          </div>
          <Button className="bg-white text-black hover:bg-zinc-200 rounded-full px-6">
            Get Quote
          </Button>
        </div>
      </nav>

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
            Neurox
          </h1>

          <p className="hero-tagline text-3xl md:text-5xl lg:text-6xl font-semibold">
            <span className="bg-gradient-to-r from-orange-400 via-rose-400 to-violet-400 bg-clip-text text-transparent">
              Unstoppable.
            </span>{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Power.
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
            Industrial Grade • IP65 Certified • 10000mAh Battery
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-20">
            <p className="text-violet-400 font-medium mb-4 uppercase tracking-wider">
              Built for Industry
            </p>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Power meets durability.
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Engineered for professionals in the most demanding environments.
              Warehouses, factories, logistics — Neurox is ready to work
              wherever you are.
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
                <h3 className="text-3xl font-bold mb-2">R8 MTK Processor</h3>
                <p className="text-zinc-400 mb-4">
                  12nm chipset with octa-core 2.0GHz performance to handle even
                  the most demanding industrial applications.
                </p>
                <div className="flex gap-6 text-sm">
                  {[
                    { value: "2.0", label: "GHz Octa-core" },
                    { value: "12nm", label: "Process" },
                    { value: "4GB", label: "RAM" },
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
                <h3 className="text-3xl font-bold mb-2">IP65 Certified</h3>
                <p className="text-zinc-400 mb-4">
                  Industrial-grade housing with complete protection. Drop
                  resistant, dustproof, and water-splash proof for extreme
                  usage.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Waterproof",
                    "Dustproof",
                    "Shockproof",
                    "-10°C ~ +50°C",
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
                <h3 className="text-3xl font-bold mb-2">Monster Battery</h3>
                <p className="text-zinc-400 mb-4">
                  10000mAh removable battery. Works &gt;12 hours, standby 500+
                  hours. Hot-swap ready.
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
      <section id="scanning" className="py-32 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="text-rose-400 font-medium mb-4 uppercase tracking-wider">
              N660 Scanning Engine
            </p>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Scan everything.
              <br />
              <span className="text-rose-400">In milliseconds.</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              High-performance N660 scanning engine. Millisecond response for 1D
              and 2D barcodes. Boost your operational efficiency.
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
                      title: "Millisecond Response",
                      desc: "Ultra-fast scanning for high throughput in production lines and warehouses.",
                    },
                    {
                      icon: ScanBarcode,
                      title: "Universal Format",
                      desc: "Supports all 1D barcode formats (UPC, EAN, Code 128) and 2D (QR, Data Matrix, PDF417).",
                    },
                    {
                      icon: Radio,
                      title: "UHF RFID Ready (Optional)",
                      desc: "RFID module for inventory management, asset tracking, and large-scale logistics.",
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
      <section id="features" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-20">
            <p className="text-cyan-400 font-medium mb-4 uppercase tracking-wider">
              Complete Solution
            </p>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Everything you need.
              <br />
              <span className="text-zinc-500">Nothing you don&apos;t.</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Complete features for every industrial need. From scanning to
              security, everything in one device.
            </p>
          </FadeIn>

          {/* Features grid */}
          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Camera,
                title: "Dual Camera System",
                description:
                  "5MP front camera for video calls and 13MP rear with Auto Focus & LED Flash for documentation.",
                color: "from-rose-500 to-rose-700",
                hoverBorder: "hover:border-rose-500/50",
              },
              {
                icon: Fingerprint,
                title: "Fingerprint Security",
                description:
                  "Optional fingerprint sensor for fast and secure authentication. Access your device in seconds.",
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
                  "Operates from -10°C to +50°C. Designed for extreme industrial environments.",
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
                    Neurox comes equipped with USB Type-C and Micro-USB ports
                    for flexible connectivity. Supports Nano SIM + TF Card for
                    storage expansion and cellular connectivity.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "USB Type-C",
                      "Micro-USB",
                      "Nano SIM",
                      "TF Card",
                      "4G LTE",
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
                    { value: "4GB", label: "RAM" },
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
                  { label: "Processor", value: "R8 MTK 12nm Octa-core 2.0GHz" },
                  { label: "RAM", value: "2GB / 3GB / 4GB" },
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
                  { label: "Battery", value: "3.7V 10000mAh Removable" },
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
                  { label: "Cellular", value: "GSM / 3G / 4G LTE" },
                  { label: "NFC", value: "Mifare, NFC Tagging, Access Card" },
                  { label: "Ports", value: "USB Type-C, Micro-USB" },
                  { label: "Expansion", value: "Nano SIM + TF Card" },
                ],
              },
              {
                icon: ScanBarcode,
                iconColor: "text-violet-400",
                title: "Scanning & Security",
                specs: [
                  { label: "Barcode Engine", value: "N660 (1D/2D)" },
                  { label: "Fingerprint", value: "Optional biometric sensor" },
                  { label: "UHF RFID", value: "Optional module for inventory" },
                ],
              },
              {
                icon: Shield,
                iconColor: "text-amber-400",
                title: "Durability & Physical",
                specs: [
                  { label: "Protection", value: "IP65 Rated" },
                  {
                    label: "Drop Resistance",
                    value: "Industrial-grade housing",
                  },
                  { label: "Operating Temp", value: "-10°C to +50°C" },
                  { label: "Dimensions", value: "260 × 117 × 32 mm" },
                  { label: "Weight", value: "0.8 kg" },
                  { label: "Warranty", value: "1 Year" },
                ],
              },
            ].map((category, catIndex) => (
              <FadeIn key={catIndex} delay={catIndex * 0.1}>
                <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 overflow-hidden">
                  <div className="px-6 py-4 bg-zinc-900 border-b border-zinc-800">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <category.icon
                        className={`w-5 h-5 ${category.iconColor}`}
                      />
                      {category.title}
                    </h3>
                  </div>
                  <div className="divide-y divide-zinc-800">
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
            <Badge className="mb-6 bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
              Ready for Deployment
            </Badge>

            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Upgrade your operations.</span>
            </h2>
            <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
              Neurox is ready to boost productivity in your warehouse, factory,
              and logistics operations. Get special pricing for enterprise
              needs.
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
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

          {/* Use cases */}
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {["Warehouse", "Manufacturing", "Logistics", "Retail"].map(
              (useCase, i) => (
                <StaggerItem key={i}>
                  <div className="py-3 px-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-violet-500/30 text-sm text-zinc-400 text-center transition-colors">
                    {useCase}
                  </div>
                </StaggerItem>
              )
            )}
          </StaggerContainer>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full px-6">
        <div className="max-w-6xl mx-auto">
          <Separator className="bg-zinc-800" />
        </div>
      </div>

      {/* Footer */}
      <footer className="py-16 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[
              {
                title: "Products",
                links: [
                  "Neurox Tablet",
                  "Accessories",
                  "Compare Models",
                  "Enterprise Solutions",
                ],
              },
              {
                title: "Support",
                links: [
                  "Help Center",
                  "Contact Sales",
                  "Technical Support",
                  "Warranty Info",
                ],
              },
              {
                title: "Company",
                links: ["About Us", "Partners", "Careers", "News"],
              },
              {
                title: "Legal",
                links: [
                  "Privacy Policy",
                  "Terms of Service",
                  "Cookie Policy",
                  "Compliance",
                ],
              },
            ].map((section, i) => (
              <div key={i}>
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2 text-sm text-zinc-400">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <a
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Separator className="bg-zinc-800 mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
            <div className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt="Neurox Logo"
                width={100}
                height={32}
                className="h-8 w-auto object-contain opacity-50"
              />
              <span>Industrial Tablet Solutions</span>
            </div>
            <p>© 2025 Neurox Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
