"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, Github } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import RegistrationBanner from "./RegistrationBanner";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    setHash(window.location.hash);
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navItems: { label: string; href: string }[] = [
    { label: "Build Day", href: "/techkoodaram-build-day" },
    { label: "Blog", href: "/blog" },
    { label: "Community", href: "/#community" },
    // { label: "About", href: "/#about" },
    // { label: "Gatherings", href: "/#gatherings" },
    // { label: "Blog", href: "/#blog" },
    // { label: "Products", href: "/products" },
  ];

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/" && hash === href.substring(1);
    return pathname === href;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="techKoodaram Logo" priority loading="eager" width={230} height={50} className="w-[230px] h-auto" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              item.href.startsWith("/#") ? (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-200 ${isActive(item.href) ? "text-accent" : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-200 ${isActive(item.href) ? "text-accent" : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {item.label}
                </Link>
              )
            ))}
            <Link
              href="https://github.com/techkoodaram"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-white hover:bg-primary transition-colors border border-primary px-4 py-2 rounded-full"
            >
              <Github size={16} />
              GitHub
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                item.href.startsWith("/#") ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}
              <Button
                variant="outline"
                className="mt-2 gap-2"
                onClick={() => window.open("https://github.com/techkoodaram", "_blank")}
              >
                <Github size={16} />
                GitHub
              </Button>
            </div>
          </nav>
        )}
      </div>
      {/* <RegistrationBanner /> */}
    </header>
  );
};

export default Header;
