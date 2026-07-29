import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Logo, LogoCompact } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import type { View } from "../lib/view";

type HeaderProps = {
  onNavigate: (target: string) => void;
  activeView: View;
};

export function Header({ onNavigate, activeView }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const go = (target: string) => {
    onNavigate(target);
    setIsMenuOpen(false);
  };
  const primaryCtaTarget = activeView === "aiaf" ? "aiaf-pilot" : "contact";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-sm border-b shadow-sm' : 'bg-background/95 backdrop-blur-sm border-b'
    }`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => go('home')}>
          <div className="hidden sm:block">
            <Logo />
          </div>
          <div className="sm:hidden">
            <LogoCompact />
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <button onClick={() => go('home')} className="hover:text-primary transition-colors">Home</button>
          <button onClick={() => go('services')} className="hover:text-primary transition-colors">Services</button>
          <button onClick={() => go('about')} className="hover:text-primary transition-colors">About</button>
          {/* <button onClick={() => go('team')} className="hover:text-primary transition-colors">Team</button> */}
          <button onClick={() => go('contact')} className="hover:text-primary transition-colors">Contact</button>
        </nav>

        <div className="hidden md:flex items-center space-x-6">
          <ThemeToggle />
          </div>
          <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" onClick={() => go(primaryCtaTarget)}>{activeView === "aiaf" ? "Request Demo" : "Get Quote"}</Button>
          <Button onClick={() => go(primaryCtaTarget)}>{activeView === "aiaf" ? "Start Pilot" : "Contact Us"}</Button>
        </div>

        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <button onClick={() => go('home')} className="hover:text-primary transition-colors text-left">Home</button>
            <button onClick={() => go('services')} className="hover:text-primary transition-colors text-left">Services</button>
            <button onClick={() => go('about')} className="hover:text-primary transition-colors text-left">About</button>
            {/* <button onClick={() => go('team')} className="hover:text-primary transition-colors text-left">Team</button> */}
            <button onClick={() => go('contact')} className="hover:text-primary transition-colors text-left">Contact</button>
            <div className="flex flex-col space-y-2 pt-4">
              <Button variant="outline" onClick={() => go(primaryCtaTarget)}>{activeView === "aiaf" ? "Request Demo" : "Get Quote"}</Button>
              <Button onClick={() => go(primaryCtaTarget)}>{activeView === "aiaf" ? "Start Pilot" : "Contact Us"}</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
