import Hero from '@/components/Hero';
import About from '@/components/About';
import Timeline from '@/components/Timeline';
import Albums from '@/components/Albums';
import Gallery from '@/components/Gallery';
import Spotlight from '@/components/Spotlight';
import SocialLinks from '@/components/SocialLinks';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Timeline />
      <Albums />
      <Gallery />
      <Spotlight />
      <SocialLinks />
      <Contact />
      <Footer />
    </>
  );
}
