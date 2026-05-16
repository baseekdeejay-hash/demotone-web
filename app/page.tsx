import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Bio from '@/components/Bio';
import Music from '@/components/Music';
import Sets from '@/components/Sets';
import Events from '@/components/Events';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/effects/CustomCursor';

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Bio />
        <Music />
        <Sets />
        <Events />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
