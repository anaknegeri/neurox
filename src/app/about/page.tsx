"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Award,
  Globe,
  Heart,
  Shield,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-black via-violet-950/10 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-violet-500/20 text-violet-300 border-violet-500/30">
            About NeuroBio
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Securing identities.
            <br />
            <span className="gradient-text">Enabling trust.</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            NeuroBio is a leading provider of government-grade biometric
            solutions, empowering organizations worldwide to verify identities
            with confidence and precision.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-violet-900/20 to-transparent border border-violet-500/20">
              <Target className="w-12 h-12 text-violet-400 mb-4" />
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-zinc-400 leading-relaxed">
                To deliver cutting-edge biometric technology that enables secure
                identity verification across borders, organizations, and
                communities. We strive to make identity authentication seamless,
                accurate, and accessible for mission-critical operations
                worldwide.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-gradient-to-br from-cyan-900/20 to-transparent border border-cyan-500/20">
              <Zap className="w-12 h-12 text-cyan-400 mb-4" />
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-zinc-400 leading-relaxed">
                To be the global standard in biometric identity solutions,
                trusted by governments, law enforcement, healthcare, and
                enterprises. We envision a world where identity verification is
                instant, secure, and universally trusted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            Our Story
          </h2>
          <div className="space-y-6 text-zinc-400 leading-relaxed">
            <p>
              Founded with a clear purpose, NeuroBio emerged from the critical
              need for reliable, government-grade biometric authentication in an
              increasingly digital and mobile world. Our founders recognized
              that traditional identity verification methods were becoming
              inadequate for modern security challenges.
            </p>
            <p>
              Today, NeuroBio stands at the forefront of biometric innovation,
              serving government agencies, law enforcement, healthcare
              institutions, and financial organizations across multiple
              continents. Our NeuroBio NB-07 device represents years of research
              and development, incorporating FBI-certified fingerprint scanning,
              facial recognition, iris scanning, and advanced document
              verification capabilities.
            </p>
            <p>
              With operations based in Dubai, UAE, we serve a global clientele,
              delivering solutions that meet the highest international standards
              for security, accuracy, and reliability.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Security First",
                description:
                  "We prioritize data security and privacy in every solution we deliver, adhering to the highest international standards.",
                color: "text-violet-400",
                gradient: "from-violet-500/10 to-transparent",
              },
              {
                icon: Award,
                title: "Excellence",
                description:
                  "We pursue excellence in technology, service, and support, ensuring our clients receive world-class solutions.",
                color: "text-cyan-400",
                gradient: "from-cyan-500/10 to-transparent",
              },
              {
                icon: Users,
                title: "Partnership",
                description:
                  "We build lasting relationships with our clients, understanding their unique needs and growing together.",
                color: "text-emerald-400",
                gradient: "from-emerald-500/10 to-transparent",
              },
              {
                icon: TrendingUp,
                title: "Innovation",
                description:
                  "We continuously invest in R&D to stay ahead of emerging security challenges and technological advancements.",
                color: "text-rose-400",
                gradient: "from-rose-500/10 to-transparent",
              },
              {
                icon: Globe,
                title: "Global Reach",
                description:
                  "We serve clients worldwide, understanding diverse regulatory environments and cultural contexts.",
                color: "text-amber-400",
                gradient: "from-amber-500/10 to-transparent",
              },
              {
                icon: Heart,
                title: "Integrity",
                description:
                  "We operate with transparency and honesty, building trust through consistent ethical practices.",
                color: "text-pink-400",
                gradient: "from-pink-500/10 to-transparent",
              },
            ].map((value, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl bg-gradient-to-br ${value.gradient} border border-zinc-800 hover:border-zinc-700 transition-all`}
              >
                <value.icon className={`w-10 h-10 ${value.color} mb-4`} />
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-zinc-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            By The Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50+", label: "Countries Served" },
              { value: "850+", label: "Organizations" },
              { value: "1M+", label: "Identities Verified Daily" },
              { value: "99.9%", label: "Uptime Guarantee" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-zinc-950 border border-zinc-800"
              >
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </p>
                <p className="text-zinc-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to secure your operations?
          </h2>
          <p className="text-xl text-zinc-400 mb-8">
            Join leading organizations worldwide in deploying government-grade
            biometric solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#overview">
              <Button
                size="lg"
                className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white rounded-full px-12"
              >
                View Products
              </Button>
            </Link>
            <Link href="/#tech-specs">
              <Button
                size="lg"
                variant="outline"
                className="border-zinc-700 text-white hover:bg-white hover:text-black rounded-full px-12"
              >
                Technical Specs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
