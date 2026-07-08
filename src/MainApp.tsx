import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { Toaster } from "./components/Toaster";
import { ThemeProvider } from "./components/ThemeProvider";

export default function MainApp() {
  const navigate = (target: string) => {
    const scrollToSection = () => {
      if (target === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    };

    const nextUrl = target === "home" ? "/" : `/#${target}`;
    if (window.location.pathname !== "/" || window.location.hash !== (target === "home" ? "" : `#${target}`)) {
      window.history.pushState({}, "", nextUrl);
    }

    scrollToSection();
  };

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen">
        <Header onNavigate={navigate} activeView="main" />
        <main>
          <Hero />
          <Services />
          <About />
          <Contact />
        </main>
        <Footer onNavigate={navigate} activeView="main" />
        <ScrollToTop />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
