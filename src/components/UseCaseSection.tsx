import { motion } from "framer-motion";

const useCases = [
  "National ID Registration",
  "e-KYC & Bank Onboarding",
  "Border Control & Immigration",
  "Mass SIM Card Registration",
  "Social Benefits Programs",
];

const UseCaseSection = () => {
  return (
    <section className="py-32 px-6 section-light">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Ready to deploy.
            <br />
            Anywhere.
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Designed for mobile operations with quick plug-and-play setup.
          </p>
          <ul className="space-y-4">
            {useCases.map((uc, i) => (
              <motion.li
                key={uc}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 text-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                {uc}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl overflow-hidden"
        >
          <img src="/field-use.jpg" alt="Field operation" className="w-full h-auto object-cover rounded-2xl" />
        </motion.div>
      </div>
    </section>
  );
};

export default UseCaseSection;
