import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      {/* Divider */}
      <div className="w-full">
        <Separator className="bg-zinc-800" />
      </div>

      {/* Footer */}
      <footer className="py-16 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand & Description */}
            <div className="md:col-span-1">
              <Image
                src="/logo.png"
                alt="NeuroBio Logo"
                width={150}
                height={48}
                className="h-12 w-auto object-contain mb-4"
              />
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Government-grade biometric identity solutions for border
                control, law enforcement, and critical operations worldwide.
              </p>
              <div className="flex gap-4">
                <a
                  href="mailto:info@neurox.ae"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                >
                  info@neurox.ae
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-1">
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li>
                  <Link
                    href="/#overview"
                    className="hover:text-white transition-colors"
                  >
                    Product Overview
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#features"
                    className="hover:text-white transition-colors"
                  >
                    Features & Specs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#use-cases"
                    className="hover:text-white transition-colors"
                  >
                    Use Cases
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Request Quote
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Download Specs PDF
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="md:col-span-1">
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact & Address */}
            <div className="md:col-span-1">
              <h4 className="font-semibold text-white mb-4">Contact Us</h4>
              <div className="space-y-3 text-sm text-zinc-400">
                <p>1102 Prime Tower, Burj Khalifa Street</p>
                <p>Business Bay, Dubai, UAE</p>
                <div className="pt-4 space-y-2">
                  <p className="text-white font-medium">Support</p>
                  <p>24/7 Technical Support</p>
                  <p>1 Year Warranty</p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-zinc-800 mb-8" />

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
            <p>© 2025 NeuroBio Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
