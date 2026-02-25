import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-12">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-section-dark" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <p className="text-accent text-sm font-medium tracking-widest uppercase mb-4">
          New Generation
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gradient leading-tight">
          Biometric
          <br />
          Enrollment Kit
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
          A portable identity registration system integrating all biometric sensors in one unit.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link
            href="/enrollment-kit"
            className="bg-accent text-accent-foreground px-8 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Explore
          </Link>
          <Link
            href="/enrollment-kit"
            className="border border-border text-foreground px-8 py-3 rounded-full text-sm font-medium hover:bg-secondary transition-colors"
          >
            Overview
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        className="relative z-10 mt-12 w-full max-w-5xl mx-auto px-6"
      >
        <div className="relative rounded-2xl overflow-hidden glow-effect">
          <img
            src="/hero-kit.jpg"
            alt="Biometric Enrollment Kit"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
