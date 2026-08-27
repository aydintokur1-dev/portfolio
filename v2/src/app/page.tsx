import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { RingShowcase } from "@/components/RingShowcase";
import { Stats } from "@/components/Stats";
import { Testimonials } from "@/components/Testimonials";
import { Brands } from "@/components/Brands";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <RingShowcase />
      <Stats />
      <Brands />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
