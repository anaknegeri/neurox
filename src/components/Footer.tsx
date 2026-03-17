import { Mail, MapPin } from "lucide-react";
import Link from "next/link";

const Footer = () => (
  <footer className="py-16 px-6 border-t border-border/50">
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div>
          <Link href="/">
            <img src="/neurox-logo.png" alt="Neurox" className="h-6 mb-3" />
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Government-grade biometric identity solutions for border control,
            law enforcement, and critical operations worldwide.
          </p>
        </div>

        {/* Products */}
        <div>
          <p className="text-foreground text-sm font-semibold mb-3">Products</p>
          <div className="flex flex-col gap-2">
            <Link
              href="/enrollment-kit"
              className="text-muted-foreground text-sm hover:text-foreground transition-colors"
            >
              Enrollment Kit
            </Link>
            <Link
              href="/neurobio-nb07"
              className="text-muted-foreground text-sm hover:text-foreground transition-colors"
            >
              NeuroBio NB-07
            </Link>
          </div>
        </div>

        {/* Company */}
        <div>
          <p className="text-foreground text-sm font-semibold mb-3">Company</p>
          <div className="flex flex-col gap-2">
            <Link
              href="/contact"
              className="text-muted-foreground text-sm hover:text-foreground transition-colors"
            >
              Contact Us
            </Link>
            <a
              href="#"
              className="text-muted-foreground text-sm hover:text-foreground transition-colors"
            >
              About Us
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-foreground text-sm font-semibold mb-3">
            Get in Touch
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-2 text-muted-foreground text-sm">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
              <span>
                <span className="font-semibold text-foreground/80">Free Zone Office</span>
                <br />
                Meydan Grandstand - 6th Floor
                <br />
                Al Meydan Rd - Nad Al Sheba
                <br />
                Nadd Al Shiba First
                <br />
                Dubai, UAE
              </span>
            </div>
            <div className="flex items-start gap-2 text-muted-foreground text-sm">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
              <span>
                <span className="font-semibold text-foreground/80">Barsha Heights Office</span>
                <br />
                23rd Floor, Damac Smart Heights, Barsha Heights
                <br />
                P.O.Box 393578
                <br />
                Dubai, UAE
                <br />
                <a href="tel:+97142757445" className="hover:text-foreground transition-colors">
                  +97142757445
                </a>
              </span>
            </div>
            <a
              href="mailto:info@neurox.ae"
              className="flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground transition-colors"
            >
              <Mail className="w-4 h-4 shrink-0 text-accent" />
              info@neurox.ae
            </a>
          </div>
        </div>


      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border/30">
        <p className="text-muted-foreground text-xs">
          © 2025 Neorux Intelligence LLC-FZ. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms of Service"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-muted-foreground text-xs hover:text-foreground transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
