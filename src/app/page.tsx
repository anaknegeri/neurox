"use client";

import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Award,
  Battery,
  BatteryCharging,
  Briefcase,
  Camera,
  ChevronRight,
  Eye,
  Fingerprint,
  Globe,
  Monitor,
  PenTool,
  Printer,
  Scan,
  Shield,
  Usb,
  Zap,
} from "lucide-react";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

/* ─── Product Section: Enrollment Kit (dark bg) ─── */
const EnrollmentKitSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={ref}
      className="relative min-h-[110vh] flex flex-col items-center justify-start pt-28 overflow-hidden section-dark-alt"
    >
      <motion.div
        style={{ y: textY }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-10 relative px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-4"
        >
          All-in-One Portable Solution
        </motion.p>
        <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tight text-gradient leading-[1.05]">
          Biometric
          <br />
          Enrollment Kit
        </h1>
        <p className="text-muted-foreground text-lg md:text-2xl mt-4 max-w-2xl mx-auto">
          Everything you need for identity registration. In one case.
        </p>
        <div className="flex gap-5 justify-center mt-6">
          <Link
            href="/enrollment-kit"
            className="inline-flex items-center gap-1 text-xl text-accent hover:underline"
          >
            Learn more <ChevronRight className="w-5 h-5" />
          </Link>
          <Link
            href="/enrollment-kit"
            className="inline-flex items-center gap-1 text-xl text-accent hover:underline"
          >
            Buy <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </motion.div>

      <motion.div
        style={{ scale: imgScale, opacity: imgOpacity }}
        className="w-full max-w-6xl mx-auto mt-8 mb-16 px-6 z-10 relative"
      >
        <Image
          src="/hero-kit-home.png"
          alt="Biometric Enrollment Kit"
          className="w-full h-auto relative z-10"
          width={1200}
          height={800}
        />
        {/* Edge blending gradients - stronger to seamlessly merge with section bg */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[hsl(0_0%_7%)] via-[hsl(0_0%_7%/0.6)] to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[hsl(0_0%_7%)] via-[hsl(0_0%_7%/0.6)] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[hsl(0_0%_7%)] via-[hsl(0_0%_7%/0.6)] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[hsl(0_0%_7%)] via-[hsl(0_0%_7%/0.6)] to-transparent z-20 pointer-events-none" />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  );
};

/* ─── Kit Features (dark) ─── */
const KitFeatures = () => {
  const kitFeatures = [
    {
      icon: Monitor,
      title: "Laptop / Workstation",
      desc: "High-performance workstation",
    },
    {
      icon: Fingerprint,
      title: "Fingerprint Scanner",
      desc: "10-print multi-finger capture",
    },
    { icon: Eye, title: "Iris Scanner", desc: "Dual-iris capture" },
    { icon: Camera, title: "Camera", desc: "Full HD 1080p, H.264" },
    {
      icon: PenTool,
      title: "Signature Pad & Pen",
      desc: "Digital signature capture",
    },
    { icon: Scan, title: "Document Scanner", desc: "20MP, A4 & passport" },
    {
      icon: Printer,
      title: "Thermal Printer",
      desc: "Print documents in the field",
    },
    {
      icon: BatteryCharging,
      title: "Battery System",
      desc: "±10h operation, ±1 week standby",
    },
    {
      icon: Usb,
      title: "USB Hub & Expansion",
      desc: "Multi-port plug-and-play",
    },
    {
      icon: Briefcase,
      title: "Hard Rugged Case",
      desc: "Portable protective casing",
    },
  ];

  return (
    <section className="section-dark-alt pt-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Kit flatlay + features side by side */}
        <div className="grid md:grid-cols-2 gap-12 items-center pb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/kit-flatlay.jpg"
              alt="Kit flatlay"
              className="w-full rounded-3xl"
              width={800}
              height={600}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
              All-in-One Case
            </p>
            <h3 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              Everything you need.
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              A portable identity registration system integrating laptop,
              biometric sensors (fingerprint, iris, face), document scanner,
              signature pad, printer, and power system in one rugged case. Quick
              plug-and-play setup.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {kitFeatures.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 py-2"
                >
                  <f.icon className="w-4 h-4 text-accent shrink-0" />
                  <span className="text-foreground text-sm">{f.title}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick stats for Kit */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 pb-24">
          {[
            { val: "1080p", label: "Camera FHD" },
            { val: "700 lux", label: "Brightness" },
            { val: "20MP", label: "Doc Scanner" },
            { val: "±10h", label: "Battery Life" },
            { val: "±1 week", label: "Standby" },
            { val: "Plug & Play", label: "USB Interface" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="text-center p-5 rounded-2xl bg-[hsl(0_0%_8%)] border border-[hsl(0_0%_15%)]"
            >
              <p className="text-foreground text-xl md:text-2xl font-bold">
                {s.val}
              </p>
              <p className="text-muted-foreground text-xs mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Product Section: NeuroBio NB-07 (dark-alt bg) ─── */
const NeuroBioSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);

  const highlights = [
    { icon: Fingerprint, val: "508 DPI", label: "FBI-Certified Scanner" },
    { icon: Eye, val: "Dual Iris", label: "ISO 19794-6" },
    { icon: Shield, val: "IP67", label: "MIL-STD-810G" },
    { icon: Battery, val: "12h+", label: "10000mAh Battery" },
  ];

  return (
    <section ref={ref} className="section-dark py-0 overflow-hidden">
      {/* Title block */}
      <div className="pt-28 pb-8 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Government-Grade Biometric Tablet
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.05]">
            <span className="text-gradient-warm">NeuroBio</span>{" "}
            <span className="text-gradient">NB-07</span>
          </h2>
          <p className="text-muted-foreground text-xl md:text-2xl mt-3 max-w-xl mx-auto">
            Identity Secured. Future Enabled.
          </p>
          <div className="flex gap-5 justify-center mt-5">
            <Link
              href="/neurobio-nb07"
              className="inline-flex items-center gap-1 text-xl text-accent hover:underline"
            >
              Learn more <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/neurobio-nb07"
              className="inline-flex items-center gap-1 text-xl text-accent hover:underline"
            >
              Buy <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Hero product image */}
      <motion.div
        style={{ scale: imgScale }}
        className="max-w-5xl mx-auto px-6 relative"
      >
        <Image
          src="/nb07-hero-dark.png"
          alt="NeuroBio NB-07"
          className="w-full h-auto rounded-3xl"
          width={1200}
          height={800}
        />
        {/* Hide reflection at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[hsl(var(--section-dark))] via-[hsl(var(--section-dark)/0.8)] to-transparent pointer-events-none rounded-b-3xl" />
      </motion.div>

      {/* 4 Key highlights */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="text-center p-6 rounded-2xl bg-card border border-border/50 hover:border-accent/30 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                <h.icon className="w-5 h-5 text-accent" />
              </div>
              <p className="text-foreground text-xl font-bold">{h.val}</p>
              <p className="text-muted-foreground text-xs mt-1">{h.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Side-by-side detail */}
      <div className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/nb07-front.webp"
            alt="NeuroBio NB-07 front"
            className="w-full rounded-3xl"
            width={800}
            height={600}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-6"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-foreground">
            Built for
            <br />
            <span className="text-gradient-warm">extreme conditions.</span>
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Military-grade housing with IP67 waterproof & MIL-STD-810G 1.2m drop
            protection. Operates from -10°C to +55°C for mission-critical
            operations anywhere.
          </p>
          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              { val: "IP67", sub: "Waterproof & Dustproof" },
              { val: "1.2m", sub: "MIL-STD-810G Drop" },
              { val: "-10°C", sub: "to +55°C Operating" },
              { val: "0.8 kg", sub: "260×117×32mm" },
            ].map((s) => (
              <div
                key={s.val}
                className="text-center p-4 rounded-2xl bg-secondary border border-border/50"
              >
                <p className="text-xl font-bold text-accent">{s.val}</p>
                <p className="text-muted-foreground text-xs mt-1">{s.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── Field Operation Banner (shared) ─── */
const FieldBanner = () => (
  <section className="px-4 md:px-6 py-4 max-w-[1440px] mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative rounded-3xl overflow-hidden min-h-[600px] flex items-end"
    >
      <Image
        src="/nb07-field.jpg"
        alt="Field operation"
        className="absolute inset-0 w-full h-full object-cover"
        fill
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsla(0,0%,0%,0.9)] via-[hsla(0,0%,0%,0.4)] to-transparent" />
      <div className="relative z-10 p-10 md:p-16 w-full">
        <div className="grid md:grid-cols-2 gap-10 items-end">
          <div>
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
              Field Operations
            </p>
            <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-3 max-w-lg">
              Ready to deploy. Anywhere.
            </h3>
            <p className="text-muted-foreground max-w-md text-base mb-4">
              Enrollment Kit and NeuroBio NB-07 are designed for field
              operations. Quick setup, long-lasting battery, full connectivity.
            </p>
            <div className="flex gap-4">
              <Link
                href="/enrollment-kit"
                className="inline-flex items-center gap-1 text-accent hover:underline text-sm"
              >
                Enrollment Kit <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/neurobio-nb07"
                className="inline-flex items-center gap-1 text-accent hover:underline text-sm"
              >
                NeuroBio NB-07 <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { val: "< 3 min", label: "Setup Time" },
              { val: "12h+", label: "Battery Life" },
              { val: "4G LTE", label: "Connectivity" },
            ].map((s) => (
              <div
                key={s.label}
                className="text-center p-4 rounded-2xl bg-[hsl(0_0%_100%/0.08)] backdrop-blur-md border border-[hsl(0_0%_100%/0.1)]"
              >
                <p className="text-xl md:text-2xl font-bold text-foreground">
                  {s.val}
                </p>
                <p className="text-muted-foreground text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

/* ─── Stats / Trust ─── */
const StatsSection = () => {
  const stats = [
    { icon: Globe, value: "30+", label: "Countries" },
    { icon: Award, value: "FBI", label: "Certified" },
    { icon: Shield, value: "IP67", label: "MIL-STD-810G" },
    { icon: Zap, value: "12h+", label: "Battery Life" },
    { icon: Fingerprint, value: "508", label: "DPI Scanner" },
    { icon: Eye, value: "ISO", label: "19794-6" },
  ];

  return (
    <section className="section-dark py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gradient">
            Trusted worldwide.
          </h2>
          <p className="text-muted-foreground text-lg mt-4">
            Border control. Law enforcement. Healthcare. Banking.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[hsl(0_0%_10%)] border border-[hsl(0_0%_18%)] flex items-center justify-center mx-auto mb-4 group-hover:border-accent/50 transition-colors">
                <stat.icon className="w-5 h-5 text-accent" />
              </div>
              <p className="text-foreground text-2xl md:text-3xl font-bold">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-xs mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Use Cases ─── */
const UseCases = () => {
  const cases = [
    {
      title: "National ID Registration",
      desc: "National ID cards, passports, and identity documents",
    },
    {
      title: "Border Control & Immigration",
      desc: "Rapid identity verification at borders",
    },
    {
      title: "e-KYC & Bank Onboarding",
      desc: "Secure digital Know Your Customer",
    },
    {
      title: "SIM Card Registration",
      desc: "Mass telecom subscriber enrollment",
    },
    {
      title: "Social Benefits Programs",
      desc: "Biometric-based aid distribution",
    },
    { title: "Law Enforcement", desc: "Real-time field identification" },
  ];

  return (
    <section className="section-dark-alt py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gradient mb-3">
            Deployed across industries.
          </h2>
          <p className="text-muted-foreground text-lg">
            Biometric solutions for every industry need.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-4">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="p-8 rounded-2xl border border-border/50 hover:border-accent/30 transition-all duration-300 bg-card"
            >
              <h4 className="font-semibold text-lg text-foreground mb-2">
                {c.title}
              </h4>
              <p className="text-sm text-muted-foreground">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── CTA ─── */
const CTASection = () => (
  <section className="section-dark py-32 px-6 relative overflow-hidden">
    <div
      className="absolute inset-0 opacity-30"
      style={{
        background:
          "radial-gradient(ellipse at center, hsl(213 100% 50% / 0.15), transparent 70%)",
      }}
    />
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center max-w-3xl mx-auto relative z-10"
    >
      <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gradient mb-4">
        Ready to get started?
      </h2>
      <p className="text-muted-foreground text-lg mb-10">
        Contact us for consultation, product demos, or custom quotations.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <a
          href="#"
          className="bg-accent text-accent-foreground px-8 py-3.5 rounded-full text-base font-medium hover:opacity-90 transition-opacity"
        >
          Contact Sales
        </a>
        <a
          href="#"
          className="border border-[hsl(0_0%_30%)] text-foreground px-8 py-3.5 rounded-full text-base font-medium hover:bg-[hsl(0_0%_10%)] transition-colors"
        >
          Download Brochure
        </a>
      </div>
    </motion.div>
  </section>
);

/* ─── Page ─── */
export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <NeuroBioSection />
      <EnrollmentKitSection />
      <KitFeatures />
      <FieldBanner />
      <StatsSection />
      <UseCases />
      <CTASection />
      <BackToTop />
      <Footer />
    </div>
  );
}
