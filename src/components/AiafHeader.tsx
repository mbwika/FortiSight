import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Logo, LogoCompact } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

type AiafHeaderProps = {
  onBackHome: () => void;
  onRequestDemo: () => void;
};

export function AiafHeader({ onBackHome, onRequestDemo }: AiafHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/92 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-4">
        <button
          type="button"
          onClick={onBackHome}
          className="flex items-center text-left transition-opacity hover:opacity-80"
        >
          <div className="hidden sm:block">
            <Logo />
          </div>
          <div className="sm:hidden">
            <LogoCompact />
          </div>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="sm" onClick={onBackHome} className="hidden sm:inline-flex">
            <ArrowLeft className="h-4 w-4" />
            Main Site
          </Button>
          <ThemeToggle />
          <Button size="sm" onClick={onRequestDemo} className="group">
            Request Demo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
