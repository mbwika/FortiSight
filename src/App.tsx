import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { About } from "./components/About";
// import { Team } from "./components/Team";
import { AIAF } from "./components/AIAF";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { Toaster } from "./components/Toaster";
import { ThemeProvider } from "./components/ThemeProvider";
import { buildMainSiteUrl, getAiafPath, getSitePage, isAiafSubdomain, type SitePage } from "./lib/site-routing";

export type View = SitePage;

export default function App() {
  const [view, setView] = useState<View>(() => getSitePage(window.location));

  useEffect(() => {
    const syncViewWithLocation = () => {
      setView(getSitePage(window.location));
    };

    window.addEventListener("popstate", syncViewWithLocation);
    return () => window.removeEventListener("popstate", syncViewWithLocation);
  }, []);

  useEffect(() => {
    const section = window.location.hash.replace(/^#/, "");
    if (!section) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    window.setTimeout(() => {
      if (section === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    }, 60);
  }, [view]);

  const navigate = (target: string) => {
    if (target === "aiaf" || target === "aiaf-pilot") {
      const nextPath = getAiafPath(window.location);
      const nextUrl = target === "aiaf-pilot" ? `${nextPath}#aiaf-pilot` : nextPath;
      window.history.pushState({}, "", nextUrl);
      setView("aiaf");
      if (target === "aiaf") {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
      return;
    }

    if (isAiafSubdomain(window.location.hostname)) {
      window.location.assign(buildMainSiteUrl(window.location, target === "home" ? undefined : target));
      return;
    }

    const nextUrl = target === "home" ? "/" : `/#${target}`;
    const scrollToSection = () => {
      if (target === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    };

    if (window.location.pathname !== "/" || window.location.hash !== (target === "home" ? "" : `#${target}`)) {
      window.history.pushState({}, "", nextUrl);
    }

    if (view !== "main") {
      setView("main");
      window.setTimeout(scrollToSection, 60);
    } else {
      scrollToSection();
    }
  };

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen">
        <Header onNavigate={navigate} activeView={view} />
        <main>
          {view === "aiaf" ? (
            <AIAF />
          ) : (
            <>
              <Hero />
              <Services />
              <About />
              {/* <Team /> */}
              <Contact />
            </>
          )}
        </main>
        <Footer onNavigate={navigate} activeView={view} />
        <ScrollToTop />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
