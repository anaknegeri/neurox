"use client";

import Image from "next/image";
import Link from "next/link";
import nb07Front from "@/../public/product__1.png";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScannerAnimation from "@/components/ScannerAnimation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { smoothScrollToSection } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Battery,
  Camera,
  ChevronDown,
  Cpu,
  Fingerprint,
  Monitor,
  Nfc,
  ScanLine,
  Shield,
  Wifi,
} from "lucide-react";
import { useRef } from "react";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

const NeuroBioNB07 = () => {
  const heroImageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroImageRef,
    offset: ["start center", "end start"],
  });

  // Parallax effect: scale down, move down, and rotate slightly as scrolling
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 25]);

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-32 pb-4 px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-accent text-sm font-medium tracking-widest uppercase mb-4"
        >
          NeuroBio NB-07
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-gradient tracking-tight leading-tight pb-2"
        >
          Identity Secured. Future Enabled.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-lg md:text-xl mt-6 max-w-2xl mx-auto"
        >
          Government-Grade Biometric · IP67 Certified · MIL-STD-810G
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4 justify-center mt-8"
        >
          <a
            href="#specs"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollToSection("#specs");
            }}
            className="bg-accent text-accent-foreground px-8 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Tech Specs
          </a>
          <Link
            href="/contact"
            className="border border-border text-foreground px-8 py-3 rounded-full text-sm font-medium hover:bg-secondary transition-colors"
          >
            Get Quote
          </Link>
        </motion.div>
      </section>

      {/* Product Hero Image */}
      <section
        ref={heroImageRef}
        className="px-6 pb-16 pt-12"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          className="max-w-2xl mx-auto rounded-3xl overflow-hidden glow-effect"
          style={{
            scale,
            y,
            rotateX,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image src={nb07Front} alt="NeuroBio NB-07" className="w-full" />
        </motion.div>
      </section>

      {/* Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent max-w-4xl mx-auto mb-16" />

      {/* ── Section 1: Identity meets security ── */}
      <section id="features" className="py-20 px-6 section-dark">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <motion.p
            {...fadeIn}
            className="text-accent text-sm font-medium tracking-widest uppercase mb-4"
          >
            Government-Grade Biometric Solution
          </motion.p>
          <motion.h2
            {...fadeIn}
            className="text-4xl md:text-6xl font-bold text-gradient mb-6"
          >
            Identity meets security.
          </motion.h2>
          <motion.p
            {...fadeIn}
            className="text-muted-foreground text-lg max-w-3xl mx-auto"
          >
            Engineered for identity enrollment and verification in critical
            operations. Border control, law enforcement, healthcare — NeuroBio
            NB-07 delivers FBI-certified biometric authentication wherever you
            need it.
          </motion.p>
        </div>

        {/* Feature cards: Processor, Display, IP67, Battery */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {/* ARM Processor */}
          <motion.div
            {...fadeIn}
            className="bg-card rounded-2xl p-8 border border-border/50"
          >
            <Cpu className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-foreground text-xl font-bold mb-2">
              ARM-Based Processor
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              High-performance octa-core ARM-based processor engineered to
              handle demanding biometric processing and real-time identity
              verification.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { val: "8", label: "Core CPU" },
                { val: "ARM", label: "Architecture" },
                { val: "6GB", label: "RAM" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-foreground text-2xl font-bold">{s.val}</p>
                  <p className="text-muted-foreground text-xs mt-1">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 8" HD Display */}
          <motion.div
            {...fadeIn}
            className="bg-card rounded-2xl p-8 border border-border/50"
          >
            <Monitor className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-foreground text-xl font-bold mb-2">
              8" HD Display
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              IPS display with 1280×800 resolution and capacitive multi-touch.
              Crystal clear in both bright and dark conditions.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: "1280", label: "× 800 pixels" },
                { val: "IPS", label: "Wide angle" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-foreground text-2xl font-bold">{s.val}</p>
                  <p className="text-muted-foreground text-xs mt-1">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* IP67 Certified */}
          <motion.div
            {...fadeIn}
            className="bg-card rounded-2xl p-8 border border-border/50"
          >
            <Shield className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-foreground text-xl font-bold mb-2">
              IP67 Certified
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Military-grade housing with superior protection. Drop protection
              1.2m (MIL-STD-810G), fully waterproof and dustproof for
              mission-critical operations.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "IP67 Waterproof",
                "Dustproof",
                "MIL-STD-810G",
                "-10°C ~ +55°C",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Extended Battery */}
          <motion.div
            {...fadeIn}
            className="bg-card rounded-2xl p-8 border border-border/50"
          >
            <Battery className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-foreground text-xl font-bold mb-2">
              Extended Battery
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              8000-10000mAh removable battery (model dependent). All-day
              operation with 500+ hours standby. Hot-swap ready for continuous
              field work.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { val: "12+", label: "hours work" },
                { val: "500+", label: "hours standby" },
                { val: "~3", label: "hours charge" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-foreground text-2xl font-bold">{s.val}</p>
                  <p className="text-muted-foreground text-xs mt-1">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 2: Scanner ── */}
      <section id="scanner" className="py-20 px-6 section-dark-alt">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16">
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-4">
              Advanced Document & Barcode Scanner
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
              Scan everything.
              <br />
              From barcodes to passports.
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              High-performance scanning with 1D/2D barcode + OCR. MRZ passport
              reader for instant document verification. Built for border control
              and identity management.
            </p>
          </motion.div>

          {/* Scanning showcase */}
          <motion.div
            {...fadeIn}
            className="relative rounded-[3rem] bg-gradient-to-br from-card/80 to-card/40 border border-border/50 overflow-hidden mb-16 p-8 md:p-12"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] to-transparent pointer-events-none" />

            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              {/* Scanner Animation */}
              <div className="relative">
                <ScannerAnimation />
              </div>

              {/* Scanner features */}
              <div className="space-y-6">
                {[
                  {
                    icon: ScanLine,
                    title: "Instant Recognition",
                    desc: "Ultra-fast scanning and OCR for rapid identity verification and document processing.",
                  },
                  {
                    icon: Camera,
                    title: "MRZ Passport Reader",
                    desc: "Machine-readable zone (MRZ) scanning for passports, IDs, and travel documents. Full OCR support.",
                  },
                  {
                    icon: Nfc,
                    title: "Universal Barcode Support",
                    desc: "Reads all 1D (UPC, EAN, Code 128) and 2D formats (QR, Data Matrix, PDF417) plus smart card NFC.",
                  },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl bg-card/50 border border-border/50 hover:border-accent/30 transition-colors"
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <feature.icon className="w-6 h-6 text-accent" />
                      <h4 className="font-semibold text-lg">{feature.title}</h4>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {feature.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Scanning specs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: "<100", unit: "ms", label: "scan speed" },
              { val: "1D/2D", unit: "", label: "barcode support" },
              { val: "N660", unit: "", label: "engine" },
              { val: "30cm", unit: "+", label: "scan distance" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl border border-border/50 hover:border-accent/30 transition-colors"
              >
                <p className="text-3xl md:text-4xl font-bold text-gradient">
                  {s.val}
                  <span className="text-lg text-muted-foreground">
                    {s.unit}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground mt-2">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Complete Biometric Suite ── */}
      <section id="biometrics" className="py-20 px-6 section-dark">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16">
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-4">
              Complete Biometric Suite
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
              Everything you need.
              <br />
              For identity assurance.
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Complete biometric and scanning features for critical identity
              verification. From fingerprints to iris scan, everything in one
              device.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Camera,
                title: "Biometric Camera System",
                desc: "5MP front camera with RGB + IR for face recognition. 13MP rear with Auto Focus & LED Flash for document capture.",
              },
              {
                icon: Fingerprint,
                title: "FBI-Certified Fingerprint",
                desc: "508 DPI FBI-certified fingerprint scanner with ISO 19794-6 iris recognition for government-grade biometric authentication.",
              },
              {
                icon: Nfc,
                title: "NFC Module",
                desc: "Read Mifare cards, NFC tagging, and secure access cards for access control and payments.",
              },
              {
                icon: Battery,
                title: "Removable Battery",
                desc: "10000mAh removable and replaceable battery. Hot-swap for zero-downtime operations.",
              },
              {
                icon: Wifi,
                title: "Dual-Band WiFi",
                desc: "Stable 2.4GHz & 5GHz WiFi connection. Supports GSM, 3G, and 4G LTE for maximum mobility.",
              },
              {
                icon: Shield,
                title: "Extreme Durability",
                desc: "Operates from -10°C to +55°C. MIL-STD-810G drop protection 1.2m for mission-critical field operations.",
              },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-2xl p-8 border border-border/50 hover:border-border transition-colors group"
              >
                <f.icon className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-foreground text-lg font-semibold mb-2">
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Connectivity & Expansion ── */}
      <section className="py-20 px-6 section-dark-alt">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16">
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-4">
              Built for Flexibility
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
              Connectivity & Expansion
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              NeuroBio NB-07 features USB Type-C with OTG support for flexible
              connectivity. Supports Nano SIM + TF Card for storage expansion
              and cellular connectivity. Built-in GNSS with AGPS for location
              tracking.
            </p>
          </motion.div>
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {[
              "USB Type-C (OTG)",
              "Nano SIM",
              "TF Card",
              "4G LTE",
              "GNSS/AGPS",
            ].map((tag) => (
              <span
                key={tag}
                className="text-xs bg-secondary text-secondary-foreground px-4 py-2 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { val: "64GB", label: "Max Storage" },
              { val: "6GB", label: "RAM" },
              { val: "4G", label: "LTE Ready" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border/50 rounded-2xl p-6 text-center"
              >
                <p className="text-foreground text-2xl font-bold">{s.val}</p>
                <p className="text-muted-foreground text-xs mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Real-World Applications ── */}
      <section id="applications" className="py-20 px-6 section-dark">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16">
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-4">
              Real-World Applications
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
              Trusted by organizations.
              <br />
              Worldwide.
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              NeuroBio NB-07 powers identity verification across critical
              sectors, from border control to healthcare, ensuring security and
              compliance.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Border Control & Immigration",
                desc: "Instant passport verification with MRZ reader, facial recognition, and fingerprint matching for secure border crossings.",
                tags: [
                  "MRZ Passport Scan",
                  "Face + Iris Match",
                  "Real-time Verification",
                ],
              },
              {
                title: "Law Enforcement",
                desc: "FBI-certified fingerprint capture and on-field identity verification for police operations and investigations.",
                tags: [
                  "FBI-Certified 508 DPI",
                  "Mobile Database Access",
                  "Secure Transmission",
                ],
              },
              {
                title: "Healthcare & Patient ID",
                desc: "Accurate patient identification preventing medical errors with biometric authentication and document scanning.",
                tags: [
                  "Patient Enrollment",
                  "Duplicate Prevention",
                  "Insurance Verification",
                ],
              },
              {
                title: "Banking & Financial Services",
                desc: "KYC compliance with government-grade biometric verification for account opening and high-value transactions.",
                tags: ["KYC Compliance", "Anti-Fraud", "Remote Onboarding"],
              },
              {
                title: "Government ID Enrollment",
                desc: "Complete biometric capture for national ID, voter registration, and social benefit programs.",
                tags: [
                  "Multi-modal Biometrics",
                  "Offline Capable",
                  "ISO Compliant",
                ],
              },
              {
                title: "Access Control & Security",
                desc: "High-security facility access with multi-factor biometric authentication and real-time verification.",
                tags: ["Multi-factor Auth", "Time & Attendance", "Audit Trail"],
              },
            ].map((uc, i) => (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-2xl p-8 border border-border/50 hover:border-border transition-colors"
              >
                <h3 className="text-foreground text-lg font-semibold mb-3">
                  {uc.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">{uc.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {uc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: Technical Specifications ── */}
      <section id="specs" className="py-20 px-6 section-dark-alt">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16">
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-4">
              Technical Specifications
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
              Built to perform.
            </h2>
            <p className="text-muted-foreground text-lg">
              Industrial-grade specifications for demanding professionals.
            </p>
          </motion.div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border/30 rounded-2xl overflow-hidden mb-12">
            {[
              { label: "Display", value: '8" IPS HD', sub: "1280 × 800 px" },
              {
                label: "Processor",
                value: "Octa-Core",
                sub: "ARM Architecture",
              },
              { label: "RAM", value: "6GB", sub: "High performance" },
              { label: "Storage", value: "16-64GB", sub: "ROM + TF Card" },
              {
                label: "Battery",
                value: "10000mAh",
                sub: "Removable, ~3h charge",
              },
              { label: "Weight", value: "0.8 kg", sub: "260×117×32mm" },
            ].map((spec, i) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card p-8 text-center"
              >
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">
                  {spec.label}
                </p>
                <p className="text-foreground text-3xl md:text-4xl font-bold">
                  {spec.value}
                </p>
                <p className="text-muted-foreground text-sm mt-1">{spec.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Full spec table - collapsible */}
          <motion.div
            {...fadeIn}
            className="rounded-2xl overflow-hidden border border-border/50"
          >
            {[
              {
                cat: "Display & Performance",
                rows: [
                  ["Display", '8" IPS HD, 1280 × 800 pixels'],
                  ["Processor", "Octa-Core ARM-based Processor"],
                  ["RAM", "6GB"],
                  ["Storage", "16GB / 32GB / 64GB ROM"],
                  ["Operating System", "Android 9.0"],
                  ["Touch Screen", "Capacitive Multi-touch"],
                ],
              },
              {
                cat: "Camera System",
                rows: [
                  ["Rear Camera", "13MP Auto Focus + LED Flash"],
                  ["Front Camera", "5MP"],
                ],
              },
              {
                cat: "Battery & Power",
                rows: [
                  ["Battery", "3.7V 8000-10000mAh Removable"],
                  ["Working Time", ">12 hours"],
                  ["Standby Time", ">500 hours"],
                  ["Charging Time", "~3 hours"],
                ],
              },
              {
                cat: "Connectivity",
                rows: [
                  ["WiFi", "Dual-band 2.4GHz & 5GHz"],
                  ["Bluetooth", "BLE 4.2 / 5.0"],
                  ["Cellular", "GSM / 3G / 4G LTE"],
                  ["NFC", "Mifare, NFC Tagging, Smart Card"],
                  ["Ports", "USB Type-C (OTG)"],
                  ["Navigation", "GNSS + AGPS"],
                ],
              },
              {
                cat: "Biometric & Scanning",
                rows: [
                  ["Fingerprint", "FBI-certified 508 DPI sensor"],
                  ["Face Recognition", "RGB + IR Camera"],
                  ["Iris Scan", "ISO 19794-6 certified"],
                  ["Barcode Scanner", "1D/2D + OCR"],
                  ["MRZ Reader", "Passport/ID Document OCR"],
                  ["Smart Card", "NFC + Contact Reader"],
                ],
              },
              {
                cat: "Durability & Physical",
                rows: [
                  ["Protection", "IP67 Rated (Waterproof)"],
                  ["Drop Protection", "1.2m MIL-STD-810G"],
                  ["Operating Temp", "-10°C to +55°C"],
                  ["Dimensions", "260 × 117 × 32 mm"],
                  ["Weight", "0.8 kg"],
                  ["Warranty", "1 Year"],
                ],
              },
            ].map((section, idx) => (
              <Collapsible key={section.cat} defaultOpen={idx === 0}>
                <CollapsibleTrigger className="w-full bg-secondary/50 px-6 py-3 flex items-center justify-between border-t border-border/30 first:border-t-0 hover:bg-secondary/70 transition-colors cursor-pointer group">
                  <h4 className="text-foreground text-sm font-semibold">
                    {section.cat}
                  </h4>
                  <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {section.rows.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between items-center px-6 py-3 border-t border-border/30"
                    >
                      <span className="text-muted-foreground text-sm">
                        {label}
                      </span>
                      <span className="text-foreground text-sm font-medium text-right">
                        {value}
                      </span>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Certifications & Compliance */}
      <section className="py-24 px-6 section-dark-alt">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-12">
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-4">
              Certifications & Standards
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-3">
              Government-grade compliance.
            </h2>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              Certified to meet the highest international standards for
              biometric authentication and data security.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { name: "FBI Certified", desc: "508 DPI Scanner" },
              { name: "ISO 19794-6", desc: "Iris Recognition" },
              { name: "IP67", desc: "Waterproof" },
              { name: "MIL-STD-810G", desc: "Drop Protection" },
              { name: "CE Certified", desc: "EU Compliance" },
            ].map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center p-6 rounded-2xl border border-border/50 bg-card/30 hover:border-accent/30 transition-colors"
              >
                <p className="text-foreground text-base font-bold mb-1">
                  {cert.name}
                </p>
                <p className="text-muted-foreground text-xs">{cert.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 text-center section-dark">
        <motion.div {...fadeIn}>
          <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
            Secure identities.
            <br />
            Enable trust.
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            NeuroBio NB-07 is ready to enhance security in border control, law
            enforcement, and identity verification operations. Get
            government-grade biometric authentication for your organization.
          </p>
          <div className="flex gap-6 justify-center text-xs text-muted-foreground mb-8">
            <span>✓ 1 Year Warranty</span>
            <span>•</span>
            <span>✓ Fast Shipping</span>
            <span>•</span>
            <span>✓ 24/7 Technical Support</span>
          </div>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/contact"
              className="inline-block bg-accent text-accent-foreground px-10 py-4 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Get Quote
            </Link>
            <Link
              href="/contact"
              className="inline-block border border-border text-foreground px-10 py-4 rounded-full text-sm font-medium hover:bg-secondary transition-colors"
            >
              Request Demo
            </Link>
          </div>
        </motion.div>
      </section>

      <BackToTop />
      <Footer />
    </div>
  );
};

export default NeuroBioNB07;
