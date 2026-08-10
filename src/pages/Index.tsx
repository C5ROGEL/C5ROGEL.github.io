import { ThemeProvider } from "@/components/portfolio/ThemeProvider";
// Re-triggering type inference for portfolio components
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

const Index = () => (
  <ThemeProvider>
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About variant="muted" />
        <Skills />
        <Projects variant="muted" />
        <Experience />
        <Contact variant="muted" />
      </main>
      <Footer />
    </div>
  </ThemeProvider>
);

export default Index;
