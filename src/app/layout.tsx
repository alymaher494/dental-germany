import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dentalpraxis-luisenplatz.de"),
  title: {
    default: "Dentalpraxis am Luisenplatz - Zahnarzt Darmstadt | Dr. Faiz Eissa",
    template: "%s | Dentalpraxis am Luisenplatz",
  },
  description:
    "Moderne Zahnmedizin in Darmstadt am Luisenplatz. Dr. Faiz Eissa - Zahnarzt & Implantologe. Professionelle Zahnreinigung, Implantate, Bleaching, Kronen & Brücken. Mehrsprachiges Team (Deutsch, Arabisch, Kurdisch). Termin vereinbaren!",
  keywords: [
    "Zahnarzt Darmstadt",
    "Dentalpraxis Darmstadt",
    "Zahnarzt Luisenplatz",
    "Zahnimplantate Darmstadt",
    "Professionelle Zahnreinigung",
    "Bleaching Darmstadt",
    "Kronen Brücken",
    "Dr. Faiz Eissa",
    "Zahnmedizin Darmstadt",
    "Implantologe Darmstadt",
    "Zahnersatz Darmstadt",
    "Zahnfleischbehandlung",
    "Vorsorgeuntersuchungen",
    "Mehrsprachiger Zahnarzt",
    "Arabischsprachiger Zahnarzt Darmstadt",
    "Kurdischsprachiger Zahnarzt Darmstadt",
  ],
  authors: [{ name: "Dr. Faiz Eissa" }],
  creator: "Dentalpraxis am Luisenplatz",
  publisher: "Dentalpraxis am Luisenplatz",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  icons: {
    icon: "/images/Dentalpraxis-Luisenplatz-transparent.png",
    apple: "/images/Dentalpraxis-Luisenplatz-transparent.png",
    shortcut: "/images/Dentalpraxis-Luisenplatz-transparent.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://dentalpraxis-luisenplatz.de",
    siteName: "Dentalpraxis am Luisenplatz",
    title: "Dentalpraxis am Luisenplatz - Zahnarzt Darmstadt | Dr. Faiz Eissa",
    description:
      "Moderne Zahnmedizin in Darmstadt am Luisenplatz. Dr. Faiz Eissa - Zahnarzt & Implantologe. Professionelle Zahnreinigung, Implantate, Bleaching, Kronen & Brücken. Mehrsprachiges Team (Deutsch, Arabisch, Kurdisch).",
    images: [
      {
        url: "/images/hero-clinic.png",
        width: 1200,
        height: 630,
        alt: "Dentalpraxis am Luisenplatz - Moderne Zahnmedizin in Darmstadt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dentalpraxis am Luisenplatz - Zahnarzt Darmstadt",
    description:
      "Moderne Zahnmedizin in Darmstadt. Professionelle Zahnreinigung, Implantate, Bleaching und mehr. Dr. Faiz Eissa und sein mehrsprachiges Team.",
    images: ["/images/hero-clinic.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://dentalpraxis-luisenplatz.de",
    languages: {
      de: "https://dentalpraxis-luisenplatz.de",
      ar: "https://dentalpraxis-luisenplatz.de",
      ku: "https://dentalpraxis-luisenplatz.de",
    },
  },
  verification: {
    google: "google-site-verification-placeholder",
  },
  category: "health",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Dentist", "LocalBusiness", "MedicalOrganization"],
  "@id": "https://dentalpraxis-luisenplatz.de/#organization",
  name: "Dentalpraxis am Luisenplatz",
  legalName: "Dentalpraxis am Luisenplatz",
  description:
    "Moderne zahnmedizinische Praxis in Darmstadt am Luisenplatz. Dr. Faiz Eissa bietet Professionelle Zahnreinigung, Implantate, Bleaching, Kronen und Brücken sowie weitere zahnmedizinische Leistungen an.",
  url: "https://dentalpraxis-luisenplatz.de",
  telephone: "+4915213709772",
  email: "info@dentalpraxis-luisenplatz.de",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Luisenplatz 4",
    addressLocality: "Darmstadt",
    postalCode: "64283",
    addressCountry: "DE",
    addressRegion: "Hessen",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 49.8697,
    longitude: 8.6624,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
  ],
  areaServed: {
    "@type": "City",
    name: "Darmstadt",
  },
  priceRange: "$$",
  image: "https://dentalpraxis-luisenplatz.de/images/hero-clinic.png",
  medicalSpecialty: "Dentistry",
  availableLanguage: ["Deutsch", "Arabisch", "Kurdisch"],
  knowsLanguage: ["de", "ar", "ku"],
  founder: {
    "@type": "Person",
    name: "Dr. Faiz Eissa",
    jobTitle: "Zahnarzt",
    worksFor: {
      "@type": "Organization",
      name: "Dentalpraxis am Luisenplatz",
    },
  },
  sameAs: [
    "https://dentalpraxis-luisenplatz.de",
  ],
  hasMap: "https://maps.google.com/?q=Luisenplatz+4,+64283+Darmstadt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
