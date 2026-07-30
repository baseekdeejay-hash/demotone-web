import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Bio from '@/components/Bio';
import Music from '@/components/Music';
import Sets from '@/components/Sets';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/effects/CustomCursor';
import PrivacyGuard from '@/components/effects/PrivacyGuard';
import SynthRain from '@/components/effects/SynthRain';

export default function HomePage() {
  return (
    <>
      <PrivacyGuard />
      <CustomCursor />
      {/* Lluvia 3D de TB-303 en margenes laterales (solo pantallas >= 1500px) */}
      <SynthRain variant="side-margins" count={4} />
      <Navbar />
      <main>
        <Hero />
        <Bio />
        <Music />
        <Sets />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
