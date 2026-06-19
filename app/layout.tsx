import { Playfair_Display, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler';
import { LocaleProvider } from '@/lib/locale-context';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chacralaperegrina.com';
  return {
    metadataBase: new URL(baseUrl),
    title: 'Chacra La Peregrina | Eventos Exclusivos en Laguna del Sauce, Punta del Este',
    description: 'Eventos exclusivos en armonía con la naturaleza. 7 hectáreas frente a la Laguna del Sauce, Punta del Este, Uruguay. Bodas íntimas, retiros corporativos y celebraciones únicas.',
    keywords: ['eventos punta del este', 'bodas uruguay', 'laguna del sauce', 'chacra eventos', 'venue uruguay', 'destination wedding uruguay', 'chacra la peregrina', 'eventos exclusivos uruguay', 'casamento punta del este'],
    icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
    openGraph: {
      title: 'Chacra La Peregrina | Eventos Exclusivos en Laguna del Sauce',
      description: 'Experiencias íntimas en armonía con la naturaleza. 7 hectáreas frente a la Laguna del Sauce, Punta del Este.',
      images: [{ url: '/images/hero/sunset-pool-reflection.jpg', width: 1920, height: 1280 }],
      locale: 'es_UY',
      alternateLocale: ['en_US', 'pt_BR'],
      type: 'website',
      siteName: 'Chacra La Peregrina',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Chacra La Peregrina | Eventos Exclusivos',
      description: 'Eventos exclusivos en armonía con la naturaleza. Laguna del Sauce, Punta del Este.',
      images: ['/images/hero/sunset-pool-reflection.jpg'],
    },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EventVenue',
              name: 'Chacra La Peregrina',
              description: 'Exclusive event venue on Laguna del Sauce, Punta del Este, Uruguay. 7 hectares of pristine nature for intimate weddings, corporate retreats, and family celebrations.',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://chacralaperegrina.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'El Pejerrey',
                addressLocality: 'Laguna del Sauce',
                addressRegion: 'Maldonado',
                addressCountry: 'UY',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: -34.848869,
                longitude: -55.110706,
              },
              amenityFeature: [
                { '@type': 'LocationFeatureSpecification', name: 'Swimming Pool', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Barbecue Area', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Lagoon Access', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Kitchen', value: true },
              ],
            }),
          }}
        />
      </head>
      <body className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <LocaleProvider>
            {children}
          </LocaleProvider>
          <Toaster />
          <ChunkLoadErrorHandler />
        </ThemeProvider>
      </body>
    </html>
  );
}
