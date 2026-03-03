import Hero from '@/components/Hero';
import About from '@/components/About';
import Events from '@/components/Events';
import Albums from '@/components/Albums';
import Gallery from '@/components/Gallery';
import Spotlight from '@/components/Spotlight';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Albums />
       <Events />
      <Gallery />
      <Spotlight />
      <Contact />
      <Footer />
    </>
  );
}
