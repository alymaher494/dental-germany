import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dentalpraxis am Luisenplatz - Ihr Zahnarzt in Darmstadt",
  description:
    "Moderne Zahnmedizin in Darmstadt. Professionelle Zahnreinigung, Implantate, Bleaching, Kronen und Bruecken. Dr. Faiz Eissa und sein mehrsprachiges Team. Termin vereinbaren!",
  keywords: [
    "Zahnarzt Darmstadt",
    "Dentalpraxis Darmstadt",
    "Zahnimplantate",
    "Professionelle Zahnreinigung",
    "Bleaching Darmstadt",
    "Kronen Bruecken",
    "Dr. Faiz Eissa",
    "Luisenplatz Darmstadt",
    "Zahnmedizin",
    "Zahnersatz",
  ],
  authors: [{ name: "Dr. Faiz Eissa - Dentalpraxis am Luisenplatz" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Dentalpraxis am Luisenplatz - Ihr Zahnarzt in Darmstadt",
    description:
      "Moderne Zahnmedizin in Darmstadt. Professionelle Zahnreinigung, Implantate, Bleaching und mehr. Dr. Faiz Eissa und sein mehrsprachiges Team.",
    url: "https://dentalpraxis-luisenplatz.de",
    siteName: "Dentalpraxis am Luisenplatz",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dentalpraxis am Luisenplatz - Zahnarzt Darmstadt",
    description:
      "Moderne Zahnmedizin in Darmstadt. Professionelle Zahnreinigung, Implantate, Bleaching und mehr.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://dentalpraxis-luisenplatz.de",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Dentist"],
  name: "Dentalpraxis am Luisenplatz",
  description:
    "Moderne zahnmedizinische Praxis in Darmstadt. Dr. Faiz Eissa bietet Professionelle Zahnreinigung, Implantate, Bleaching, Kronen und Bruecken sowie weitere zahnmedizinische Leistungen an.",
  url: "https://dentalpraxis-luisenplatz.de",
  telephone: "+4915213709772",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Luisenplatz",
    addressLocality: "Darmstadt",
    postalCode: "64283",
    addressCountry: "DE",
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
  ],
  priceRange: "$$",
  image: "https://dentalpraxis-luisenplatz.de/og-image.jpg",
  medicalSpecialty: "Dentistry",
  availableLanguage: ["de", "ar", "ku"],
  founder: {
    "@type": "Person",
    name: "Dr. Faiz Eissa",
    jobTitle: "Zahnarzt",
    knowsLanguage: ["de", "ar", "ku"],
  },
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
        <Toaster
          position="top-center"
          richColors
          closeButton
        />
      </body>
    </html>
  );
}
