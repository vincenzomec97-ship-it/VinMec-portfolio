import { BottleStory } from './components/BottleStory';
import { BrandStatement } from './components/BrandStatement';
import { EditorialGrid } from './components/EditorialGrid';
import { Footer } from './components/Footer';
import { FragranceNotes } from './components/FragranceNotes';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LaunchSequence } from './components/LaunchSequence';
import { ProductSection } from './components/ProductSection';
import { Reviews } from './components/Reviews';
import { RitualSection } from './components/RitualSection';
import { SensorySection } from './components/SensorySection';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Salta al contenuto</a>
      <Header />
      <main id="main">
        <Hero />
        <LaunchSequence />
        <BrandStatement />
        <FragranceNotes />
        <BottleStory />
        <SensorySection />
        <RitualSection />
        <EditorialGrid />
        <Reviews />
        <ProductSection />
      </main>
      <Footer />
    </>
  );
}
