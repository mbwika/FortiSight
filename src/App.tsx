import { useState } from "react";
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

export type View = "main" | "aiaf";

export default function App() {
  const [view, setView] = useState<View>("main");

  // Single navigation entry point shared by the header. "aiaf" swaps to the
  // standalone AIAF page; every other target returns to the main page and
  // scrolls to that section (deferring the scroll until the sections have
  // re-mounted when we're coming back from the AIAF view).
  const navigate = (target: string) => {
    if (target === "aiaf") {
      setView("aiaf");
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    const scrollToSection = () => document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
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
        <Footer />
        <ScrollToTop />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
