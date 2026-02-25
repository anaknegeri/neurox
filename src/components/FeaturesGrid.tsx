import { motion } from "framer-motion";
import { Fingerprint, Eye, Camera, FileText, Printer, Battery } from "lucide-react";

const features = [
  {
    icon: Fingerprint,
    title: "Fingerprint Scanner",
    desc: "10-print multi-finger capture dengan resolusi tinggi",
  },
  {
    icon: Eye,
    title: "Iris Scanner",
    desc: "Dual-iris capture untuk akurasi identifikasi maksimal",
  },
  {
    icon: Camera,
    title: "HD Camera",
    desc: "Full HD 1080p dengan pencahayaan 700 lux",
  },
  {
    icon: FileText,
    title: "Document Scanner",
    desc: "Resolusi 20MP, mendukung A4 & passport",
  },
  {
    icon: Printer,
    title: "Thermal Printer",
    desc: "Cetak dokumen registrasi langsung di lapangan",
  },
  {
    icon: Battery,
    title: "Battery System",
    desc: "Operasional 10 jam, standby hingga 1 minggu",
  },
];

const FeaturesGrid = () => {
  return (
    <section className="py-32 px-6 section-dark">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">
            Semua yang Anda butuhkan.
          </h2>
          <p className="text-muted-foreground text-lg mt-4">
            Terintegrasi dalam satu koper rugged.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border/50 hover:border-border transition-colors group"
            >
              <feature.icon className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-foreground text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
