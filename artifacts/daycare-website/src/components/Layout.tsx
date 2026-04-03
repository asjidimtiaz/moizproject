import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Star, Phone, Mail, MapPin } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/programs", label: "Programs" },
    { href: "/about", label: "About Us" },
    { href: "/staff", label: "Our Team" },
    { href: "/gallery", label: "Gallery" },
    { href: "/events", label: "Events" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background selection:bg-brand-yellow/30 selection:text-foreground">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-sm font-medium hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> (555) 123-4567</span>
            <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> hello@littlestars.com</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" /> 123 Sunshine Blvd, Springfield
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 bg-brand-yellow rounded-xl flex items-center justify-center rotate-3">
              <Star className="w-6 h-6 text-primary fill-primary" />
            </div>
            <span className="font-serif text-2xl font-bold text-primary">Little Stars</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-brand-coral ${
                  location === link.href ? "text-brand-coral" : "text-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button asChild size="lg" className="rounded-full font-semibold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
              <Link href="/enroll">Enroll Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background absolute w-full left-0 top-full shadow-lg">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`text-lg font-medium p-2 rounded-lg ${
                    location === link.href ? "bg-muted text-brand-coral" : "text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t">
                <Button asChild className="w-full rounded-xl" size="lg">
                  <Link href="/enroll" onClick={() => setIsMenuOpen(false)}>Enroll Now</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground pt-16 pb-8 border-t border-primary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-brand-yellow rounded-xl flex items-center justify-center -rotate-3">
                  <Star className="w-6 h-6 text-primary fill-primary" />
                </div>
                <span className="font-serif text-2xl font-bold text-white">Little Stars</span>
              </Link>
              <p className="text-primary-foreground/80 leading-relaxed text-sm">
                A warm, trusted childcare center dedicated to nurturing young minds and fostering joyful learning for over 15 years.
              </p>
            </div>
            
            <div>
              <h3 className="font-serif text-lg font-semibold mb-4 text-brand-yellow">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">About Us</Link></li>
                <li><Link href="/programs" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Our Programs</Link></li>
                <li><Link href="/staff" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Meet the Team</Link></li>
                <li><Link href="/gallery" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Gallery</Link></li>
                <li><Link href="/events" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Events</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold mb-4 text-brand-yellow">Programs</h3>
              <ul className="space-y-2">
                <li><Link href="/programs" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Infant Care</Link></li>
                <li><Link href="/programs" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Toddler Program</Link></li>
                <li><Link href="/programs" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Preschool</Link></li>
                <li><Link href="/programs" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Pre-K Readiness</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold mb-4 text-brand-yellow">Contact</h3>
              <ul className="space-y-3 text-sm text-primary-foreground/80">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 shrink-0 text-brand-coral" />
                  <span>123 Sunshine Blvd<br/>Springfield, ST 12345</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 shrink-0 text-brand-coral" />
                  <span>(555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 shrink-0 text-brand-coral" />
                  <span>hello@littlestars.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center text-primary-foreground/60 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Little Stars Daycare. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
