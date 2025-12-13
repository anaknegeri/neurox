"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Overview", href: "/#overview" },
  { label: "Scanning", href: "/#scanning" },
  { label: "Features", href: "/#features" },
  { label: "Use Cases", href: "/#use-cases" },
  { label: "Tech Specs", href: "/#tech-specs" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-6xl mx-auto px-6 py-2 flex items-center justify-between">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/logo.png"
            alt="NeuroBio Logo"
            width={200}
            height={64}
            className="h-16 w-auto object-contain"
          />
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link href={isHomePage ? "#" : "/"}>
          <Button className="bg-white text-black hover:bg-zinc-200 rounded-full px-6">
            {isHomePage ? "Get Quote" : "Back to Home"}
          </Button>
        </Link>
      </div>
    </nav>
  );
}
