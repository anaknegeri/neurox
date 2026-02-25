import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ScanBarcode } from "lucide-react";

const ScannerAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative aspect-square rounded-2xl bg-black/50 border border-border/50 flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />

      {/* Center icon */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="text-center p-8">
          <ScanBarcode className="w-24 h-24 mx-auto mb-4 text-accent" />
          <p className="text-muted-foreground text-sm">
            1D & 2D Barcode Support
          </p>
        </div>
      </div>

      {/* Scanning laser line animation with CSS */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent animate-scan">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/50 to-transparent blur-sm" />
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
          className={`absolute w-8 h-8 ${classes} border-accent z-20`}
        />
      ))}

      {/* Scan status indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs font-mono text-accent z-20"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_hsl(var(--accent)/0.5)]"
        />
        <span className="font-semibold">SCANNING</span>
      </motion.div>
    </motion.div>
  );
};

export default ScannerAnimation;
