import { Header } from "./components/Header";
import { AIAF } from "./components/AIAF";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { Toaster } from "./components/Toaster";
import { ThemeProvider } from "./components/ThemeProvider";

export default function AiafApp() {
  const navigate = (target: string) => {
    if (target === "aiaf" || target === "home") {
      window.location.assign("https://codensecurity.com/");
      return;
    }

    if (target === "aiaf-pilot") {
      document.getElementById("aiaf-pilot")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    window.location.assign(`https://codensecurity.com/#${target}`);
  };

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen">
        <Header onNavigate={navigate} activeView="aiaf" />
        <main>
          <AIAF />
        </main>
        <Footer onNavigate={navigate} activeView="aiaf" />
        <ScrollToTop />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
