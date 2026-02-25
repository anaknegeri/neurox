import { motion } from "framer-motion";
import Link from "next/link";

const products = [
  {
    name: "Biometric Enrollment Kit",
    tagline: "All-in-one portable identity registration system",
    image: "/hero-kit.jpg",
    path: "/enrollment-kit",
  },
  {
    name: "NeuroBio NB-07",
    tagline: "Government-Grade Biometric Tablet",
    image: "/neurobio-hero.jpg",
    path: "/neurobio-nb07",
  },
];

const ProductShowcase = () => {
  return (
    <section className="py-32 px-6 section-light">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">
            Explore our products.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Link
                href={product.path}
                className="block bg-card rounded-3xl overflow-hidden border border-border/50 hover:border-border transition-all group"
              >
                <div className="overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-foreground text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground">{product.tagline}</p>
                  <span className="inline-block text-accent text-sm mt-4 group-hover:translate-x-1 transition-transform">
                    Learn more →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
