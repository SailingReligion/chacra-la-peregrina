'use client';

import { useLocale } from '@/lib/locale-context';
import HeroSection from './sections/hero';
import ValuesSection from './sections/values';
import GallerySection from './sections/gallery';
import VenueSection from './sections/venue';
import EventsSection from './sections/events';
import FAQSection from './sections/faq';
import ContactSection from './sections/contact';
import SiteHeader from './sections/site-header';
import SiteFooter from './sections/site-footer';

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ValuesSection />
        <GallerySection />
        <VenueSection />
        <EventsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
