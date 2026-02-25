import { smoothScrollToSection } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Overview", path: "/" },
  { label: "Enrollment Kit", path: "/enrollment-kit" },
  { label: "NeuroBio NB-07", path: "/neurobio-nb07" },
];

const pageTitles: Record<string, string> = {
  "/enrollment-kit": "Enrollment Kit",
  "/neurobio-nb07": "NeuroBio NB-07",
  "/contact": "Contact Us",
};

const enrollmentKitSections = [
  { label: "Overview", href: "#overview" },
  { label: "Components", href: "#components" },
  { label: "Specs", href: "#specs" },
  { label: "Certifications", href: "#certifications" },
];

const nb07Sections = [
  { label: "Features", href: "#features" },
  { label: "Scanner", href: "#scanner" },
  { label: "Biometrics", href: "#biometrics" },
  { label: "Applications", href: "#applications" },
  { label: "Specs", href: "#specs" },
];

const Navbar = () => {
  const pathname = usePathname();
  const pageTitle = pageTitles[pathname];
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Show section nav after scrolling 300px
      setIsScrolled(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine which sections to show
  const isEnrollmentKit = pathname === "/enrollment-kit";
  const isNB07 = pathname === "/neurobio-nb07";
  const showSectionNav = (isEnrollmentKit || isNB07) && isScrolled;
  const sections = isEnrollmentKit
    ? enrollmentKitSections
    : isNB07
      ? nb07Sections
      : [];

  return (
    <AnimatePresence mode="wait">
      {showSectionNav ? (
        <motion.nav
          key="section-navbar"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 nav-blur border-b border-border/50"
        >
          <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-foreground font-semibold text-lg tracking-tight">
                {pageTitle}
              </span>
            </Link>

            <div className="flex items-center gap-8">
              {sections.map((section) => (
                <button
                  key={section.href}
                  onClick={() => smoothScrollToSection(section.href)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {section.label}
                </button>
              ))}
              <Link
                href="/contact"
                className="text-sm bg-accent text-accent-foreground px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </motion.nav>
      ) : (
        <motion.nav
          key="main-navbar"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 nav-blur border-b border-border/50"
        >
          <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <img src="/neurox-logo.png" alt="Neurox" className="h-8" />
            </Link>

            <div className="flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-sm transition-colors ${
                    pathname === item.path
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="text-sm bg-accent text-accent-foreground px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
