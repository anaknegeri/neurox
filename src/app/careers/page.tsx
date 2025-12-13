import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Clock,
  Code,
  DollarSign,
  Globe,
  Heart,
  MapPin,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join NeuroBio and build the future of identity security. Work with cutting-edge biometric technology including facial recognition, fingerprint scanners, and iris authentication. Explore career opportunities in engineering, product, sales, and research. Competitive compensation, flexible work, and global exposure.",
  openGraph: {
    title: "Careers at NeuroBio | Build the Future of Identity Security",
    description:
      "Join our team of innovators working on cutting-edge biometric technology. Explore career opportunities in engineering, product management, sales, and research.",
  },
};

interface Position {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

export default function CareersPage() {
  const openPositions: Position[] = [];

  const benefits = [
    {
      icon: DollarSign,
      title: "Competitive Compensation",
      description: "Industry-leading salary and performance bonuses",
    },
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive medical insurance for you and family",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Training budget and clear career progression paths",
    },
    {
      icon: Clock,
      title: "Flexible Work",
      description: "Hybrid work options and flexible hours",
    },
    {
      icon: Globe,
      title: "Global Exposure",
      description: "Work with clients and teams across the world",
    },
    {
      icon: Zap,
      title: "Innovation Time",
      description: "20% time for personal projects and learning",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-black via-cyan-950/10 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
            Join Our Team
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Build the future of
            <br />
            <span className="gradient-text">identity security.</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Join a team of innovators working on cutting-edge biometric
            technology that protects millions of identities worldwide.
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Why NeuroBio?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
              <Shield className="w-10 h-10 text-violet-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Mission-Critical Work</h3>
              <p className="text-zinc-400 text-sm">
                Your work directly impacts national security, law enforcement,
                and healthcare systems globally.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
              <Code className="w-10 h-10 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">Cutting-Edge Tech</h3>
              <p className="text-zinc-400 text-sm">
                Work with the latest in AI, computer vision, and biometric
                authentication technology.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
              <Users className="w-10 h-10 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">World-Class Team</h3>
              <p className="text-zinc-400 text-sm">
                Collaborate with top engineers, researchers, and domain experts
                from around the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Benefits & Perks
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-all"
              >
                <benefit.icon className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-zinc-400 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Open Positions
          </h2>
          {openPositions.length === 0 ? (
            <div className="text-center py-16">
              <Briefcase className="w-16 h-16 text-zinc-700 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-zinc-400 mb-3">
                No open positions at the moment
              </h3>
              <p className="text-zinc-500 max-w-md mx-auto">
                We don&apos;t have any open positions right now, but we&apos;re
                always looking for talented individuals. Send us your resume
                below.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <div
                  key={index}
                  className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-cyan-500/30 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-3">
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-sm text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {position.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {position.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {position.type}
                        </span>
                      </div>
                    </div>
                    <Button className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full px-6 shrink-0">
                      Apply Now
                    </Button>
                  </div>
                  <p className="text-zinc-400 mb-4">{position.description}</p>
                  <div>
                    <p className="text-sm font-semibold text-zinc-300 mb-2">
                      Key Requirements:
                    </p>
                    <ul className="space-y-1 text-sm text-zinc-400">
                      {position.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-1">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Don&apos;t see a perfect fit?
          </h2>
          <p className="text-xl text-zinc-400 mb-8">
            We&apos;re always looking for talented individuals. Send us your
            resume and we&apos;ll keep you in mind for future opportunities.
          </p>
          <Button
            size="lg"
            className="bg-white text-black hover:bg-zinc-200 rounded-full px-6"
          >
            Send General Application
          </Button>
        </div>
      </section>
    </div>
  );
}
