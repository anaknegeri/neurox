"use client";

import Image from "next/image";
import Link from "next/link";
import heroKit from "@/../public/hero-kit-v2.png";
import kitFieldDeploy from "@/../public/kit-field-deploy.webp";
import kitFlatlay from "@/../public/kit-flatlay.jpg";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { smoothScrollToSection } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Battery,
  BatteryCharging,
  Briefcase,
  Camera,
  Eye,
  FileText,
  Fingerprint,
  Monitor,
  PenTool,
  Printer,
  Scan,
  Usb,
} from "lucide-react";
import { useRef } from "react";

const specs = [
  { label: "Battery Life", value: "±10 hours", sub: "Continuous operation" },
  { label: "Standby", value: "±1 week", sub: "Low power mode" },
  { label: "Camera", value: "1080p FHD", sub: "H.264 video support" },
  { label: "Doc Scanner", value: "20MP", sub: "A4 & Passport" },
  { label: "Brightness", value: "700 lux", sub: "Optimal capture" },
  { label: "Connectivity", value: "Multi USB", sub: "Expandable ports" },
];

const components = [
  {
    icon: Monitor,
    name: "Laptop / Workstation",
    label: "COMPUTING",
    desc: "High-performance laptop with integrated biometric software for field enrollment operations.",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    icon: Fingerprint,
    name: "Fingerprint Scanner",
    label: "BIOMETRIC",
    desc: "10-print multi-finger capture with high-resolution capacitive sensor.",
    span: "",
  },
  {
    icon: Eye,
    name: "Iris Scanner",
    label: "BIOMETRIC",
    desc: "Dual-iris capture with near-infrared illumination.",
    span: "",
  },
  {
    icon: Camera,
    name: "HD Camera",
    label: "CAPTURE",
    desc: "Full HD 1080p with H.264 video and 700 lux lighting.",
    span: "",
  },
  {
    icon: FileText,
    name: "Document Scanner",
    label: "CAPTURE",
    desc: "20MP resolution supporting A4 documents and passport scanning.",
    span: "",
  },
  {
    icon: PenTool,
    name: "Signature Pad",
    label: "INPUT",
    desc: "Pressure-sensitive digital signature capture with stylus pen.",
    span: "",
  },
  {
    icon: Printer,
    name: "Thermal Printer",
    label: "OUTPUT",
    desc: "On-site document and receipt printing for field registration.",
    span: "",
  },
  {
    icon: Battery,
    name: "Battery System",
    label: "POWER",
    desc: "10 hours continuous operation, 1 week standby.",
    span: "",
  },
  {
    icon: Usb,
    name: "USB Hub",
    label: "CONNECTIVITY",
    desc: "Multi-port expansion for all peripheral devices.",
    span: "",
  },
  {
    icon: Briefcase,
    name: "Rugged Case",
    label: "PROTECTION",
    desc: "IP67-rated hard case for extreme field conditions.",
    span: "md:col-span-3",
  },
];

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

const EnrollmentKit = () => {
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

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-accent text-sm font-medium tracking-widest uppercase mb-4"
        >
          Biometric Enrollment Kit
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-gradient tracking-tight leading-tight pb-2"
        >
          Digital identity. In your hands.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-lg md:text-xl mt-6 max-w-2xl mx-auto"
        >
          All-in-one portable device for field identity registration.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4 justify-center mt-8"
        >
          <a
            href="#overview"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollToSection("#overview");
            }}
            className="bg-accent text-accent-foreground px-8 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Explore Features
          </a>
          <Link
            href="/contact"
            className="border border-border text-foreground px-8 py-3 rounded-full text-sm font-medium hover:bg-secondary transition-colors"
          >
            Get Quote
          </Link>
        </motion.div>
      </section>

      {/* Product Image */}
      <section
        ref={heroImageRef}
        className="px-6 -mt-4"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          className="relative max-w-5xl mx-auto"
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
          <Image
            src={heroKit}
            alt="Enrollment Kit"
            className="w-full relative z-10"
          />
          {/* Edge blending gradients to hide non-black background edges */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />
        </motion.div>
      </section>

      {/* Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent max-w-5xl mx-auto mb-16" />

      {/* Kit flatlay + features side by side */}
      <section id="overview" className="py-20 px-6 section-dark-alt">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              Complete System Overview
            </h2>
            <p className="text-muted-foreground text-lg">
              Every component you need in one portable case
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src={kitFlatlay}
                alt="Kit flatlay"
                className="w-full rounded-3xl"
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
                signature pad, printer, and power system in one rugged case.
                Quick plug-and-play setup.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Monitor, title: "Laptop / Workstation" },
                  { icon: Fingerprint, title: "Fingerprint Scanner" },
                  { icon: Eye, title: "Iris Scanner" },
                  { icon: Camera, title: "Camera" },
                  { icon: PenTool, title: "Signature Pad & Pen" },
                  { icon: Scan, title: "Document Scanner" },
                  { icon: Printer, title: "Thermal Printer" },
                  { icon: BatteryCharging, title: "Battery System" },
                  { icon: Usb, title: "USB Hub & Expansion" },
                  { icon: Briefcase, title: "Hard Rugged Case" },
                ].map((f, i) => (
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
        </div>
      </section>

      {/* Components */}
      <section id="components" className="py-20 px-6 section-dark">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16">
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-4">
              Hardware Specifications
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
              Core Components
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              All devices connected through an integrated USB interface for
              seamless operation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {components.map((comp, i) => (
              <motion.div
                key={comp.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                className={`
                  relative overflow-hidden rounded-2xl p-8
                  border border-border/30 bg-card/50
                  hover:border-accent/40 transition-all duration-500 group cursor-default
                  ${comp.span}
                `}
              >
                {/* Glow orb */}
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-accent/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <p className="text-[10px] font-semibold tracking-[0.2em] text-accent/70 mb-4">
                  {comp.label}
                </p>
                <comp.icon className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-foreground text-lg font-semibold mb-2">
                  {comp.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {comp.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section id="specs" className="py-20 px-6 section-dark-alt">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16">
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-4">
              Technical Specifications
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
              Built for performance.
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Professional-grade hardware engineered for reliable field
              operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border/30 rounded-2xl overflow-hidden">
            {specs.map((spec, i) => (
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
        </div>
      </section>

      {/* Field Deploy Banner */}
      <section className="px-4 md:px-6 py-16 max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden min-h-[500px] md:min-h-[600px] flex items-end"
        >
          <Image
            src={kitFieldDeploy}
            alt="Field deployment"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsla(0,0%,0%,0.9)] via-[hsla(0,0%,0%,0.4)] to-transparent" />
          <div className="relative z-10 p-8 md:p-16 w-full">
            <div className="grid md:grid-cols-2 gap-10 items-end">
              <div>
                <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
                  Field Operations
                </p>
                <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-3 max-w-lg">
                  Ready to deploy. Anywhere.
                </h3>
                <p className="text-muted-foreground max-w-md text-base">
                  Designed for extreme field conditions. Quick plug-and-play
                  setup, long-lasting battery, and full connectivity in one
                  rugged case.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { val: "< 3 min", label: "Setup Time" },
                  { val: "±10h", label: "Battery Life" },
                  { val: "IP67", label: "Rugged Rating" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="text-center p-4 rounded-2xl bg-[hsl(0_0%_100%/0.08)] backdrop-blur-md border border-[hsl(0_0%_100%/0.1)]"
                  >
                    <p className="text-xl md:text-2xl font-bold text-foreground">
                      {s.val}
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Certifications & Compliance */}
      <section id="certifications" className="py-24 px-6 section-dark">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-12">
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-4">
              Certifications & Compliance
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-3">
              Trusted. Certified. Compliant.
            </h2>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto">
              Meeting international standards for biometric systems and data
              security.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "FBI Certified", desc: "Fingerprint Scanner" },
              { name: "ISO 19794-6", desc: "Iris Recognition" },
              { name: "IP67 Rated", desc: "Rugged Protection" },
              { name: "CE Certified", desc: "European Standards" },
            ].map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl border border-border/50 bg-card/30 hover:border-accent/30 transition-colors"
              >
                <p className="text-foreground text-lg font-bold mb-1">
                  {cert.name}
                </p>
                <p className="text-muted-foreground text-xs">{cert.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <motion.div {...fadeIn}>
          <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
            Ready to get started?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join organizations worldwide using our Biometric Enrollment Kit for
            secure identity registration. Contact us for consultation, product
            demonstrations, and custom quotations.
          </p>
          <div className="flex gap-6 justify-center text-xs text-muted-foreground mb-8">
            <span>✓ Expert Consultation</span>
            <span>•</span>
            <span>✓ Product Demo</span>
            <span>•</span>
            <span>✓ Custom Solutions</span>
          </div>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/contact"
              className="inline-block bg-accent text-accent-foreground px-10 py-4 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Contact Sales
            </Link>
            <a
              href="#"
              className="inline-block border border-border text-foreground px-10 py-4 rounded-full text-sm font-medium hover:bg-secondary transition-colors"
            >
              Download Brochure
            </a>
          </div>
        </motion.div>
      </section>

      <BackToTop />
      <Footer />
    </div>
  );
};

export default EnrollmentKit;
