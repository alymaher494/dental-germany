'use client'

import { useState, useEffect, useRef, type FormEvent } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
  Phone,
  Menu,
  Sparkles,
  HeartPulse,
  Sun,
  Crown,
  Heart,
  Gem,
  ShieldCheck,
  Smile,
  Star,
  Globe,
  MapPin,
  Clock,
  Mail,
  Monitor,
  Users,
  Award,
  Languages,
  ChevronRight,
  Send,
  CheckCircle2,
  Quote,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

const PHONE = '+49 1521 3709772';
const PHONE_HREF = 'tel:+4915213709772';
const CLINIC = 'Dentalpraxis am Luisenplatz';
const ADDRESS = 'Luisenplatz, 64283 Darmstadt, Deutschland';

const NAV_LINKS = [
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Ueber uns', href: '#ueber-uns' },
  { label: 'Bewertungen', href: '#bewertungen' },
  { label: 'Sprachen', href: '#sprachen' },
  { label: 'Kontakt', href: '#kontakt' },
];

const MAIN_SERVICES = [
  {
    icon: Sparkles,
    title: 'Professionelle Zahnreinigung',
    description:
      'Gruendliche Reinigung Ihrer Zaehne mit modernsten Geraeten. Entfernung von Zahnstein und Verfaerbungen fuer ein strahlendes Laecheln und optimale Mundgesundheit.',
  },
  {
    icon: HeartPulse,
    title: 'Zahnimplantate',
    description:
    'Hochwertige Implantatloesungen fuer einen festen und natuerlichen Zahnersatz. Mit meiner Erfahrung und modernster Technik restoring ich Ihr Laecheln nachhaltig.',
  },
  {
    icon: Sun,
    title: 'Bleaching',
    description:
      'Professionelle Zahnaufhellung fuer strahlend weisse Zaehne. Schonende Verfahren mit nachhaltigen Ergebnissen fuer ein selbstbewusstes Laecheln.',
  },
];

const WHY_US_FEATURES = [
  {
    icon: Monitor,
    title: 'Moderne Ausstattung',
    description:
      'Neueste Diagnostik- und Behandlungstechnologien fuer Praezision und Komfort bei jeder Behandlung.',
  },
  {
    icon: Users,
    title: 'Individuelle Betreuung',
    description:
      'Persoenliche Beratung und massgeschneiderte Behandlungsplaene, die auf Ihre Beduerfnisse abgestimmt sind.',
  },
  {
    icon: Award,
    title: 'Erfahrenes Team',
    description:
      'Ueber 10 Jahre Berufserfahrung mit fundierter Ausbildung an der LMU Muenchen und Weiterbildung in der Implantologie.',
  },
  {
    icon: Languages,
    title: 'Mehrsprachiger Service',
    description:
      'Wir kommunizieren mit Ihnen auf Deutsch, Arabisch und Kurdisch fuer einen angenehmen und verstaendlichen Behandlungsablauf.',
  },
];

const MORE_SERVICES = [
  {
    icon: Crown,
    title: 'Kronen & Bruecken',
    description:
      'Hochwertige Kronen und Bruecken aus modernsten Materialien fuer einen natuerlichen Look und optimale Funktion.',
  },
  {
    icon: Heart,
    title: 'Zahnfleischbehandlung',
    description:
      'Effektive Behandlung von Zahnfleischerkrankungen mit schonenden Methoden fuer gesundes Zahnfleisch.',
  },
  {
    icon: Gem,
    title: 'Aesthetische Fuellungen',
    description:
      'Zahnfarbene Fuellungen, die sich nahtlos in Ihr natuerliches Zaehnebild einfuegen.',
  },
  {
    icon: ShieldCheck,
    title: 'Vorsorgeuntersuchungen',
    description:
      'Regelmaessige Kontrolle und fruehzeitige Erkennung von Zaehneproblemen fuer langfristige Mundgesundheit.',
  },
  {
    icon: Smile,
    title: 'Zahnersatz',
    description:
      'Individuell angefertigte Prothesen und Teilprothesen fuer eine optimale Passform und hoechsten Tragekomfort.',
  },
  {
    icon: Star,
    title: 'Aesthetische Zahnmedizin',
    description:
      'Veneers, Zaehnekorrekturen und weitere aesthetische Behandlungen fuer Ihr perfektes Laecheln.',
  },
];

const STATS = [
  { value: 10, suffix: '+', label: 'Jahre Erfahrung' },
  { value: 5000, suffix: '+', label: 'Zufriedene Patienten' },
  { value: 2000, suffix: '+', label: 'Erfolgreiche Implantate' },
  { value: 98, suffix: '%', label: 'Patientenzufriedenheit' },
];

const TESTIMONIALS = [
  {
    name: 'Sarah K.',
    title: 'Patientin seit 2019',
    text: 'Ich bin seit Jahren Patientin bei Dr. Eissa und bin sehr zufrieden. Die Praxis ist modern, das Team ist freundlich und die Behandlungen sind schmerzfrei. Besonders gut gefaellt mir die muehelose Kommunikation auf Deutsch.',
  },
  {
    name: 'Michael R.',
    title: 'Patient seit 2021',
    text: 'Nach mehreren schlechten Erfahrungen bei anderen Zahnarzten bin ich endlich fündig geworden. Dr. Eissa nimmt sich Zeit, erklaert alles ausfuehrlich und die Qualitaet der Behandlung ist hervorragend.',
  },
  {
    name: 'Anna W.',
    title: 'Patientin seit 2020',
    text: 'Mein Implantat wurde perfekt gesetzt und sieht aus wie ein eigener Zahn. Die Nachsorge ist ebenfalls erstklassig. Ich kann die Praxis nur wärmstens empfehlen.',
  },
];

const LANGUAGES = [
  {
    name: 'Deutsch',
    description: 'Muttersprache der Mehrheit unserer Patienten. Fluessige Kommunikation in allen Belangen der zahnmedizinischen Beratung und Behandlung.',
  },
  {
    name: 'Arabisch',
    description: 'Fuer unsere arabischsprachigen Patienten bieten wir eine vollstaendige Beratung und Behandlung in arabischer Sprache an.',
  },
  {
    name: 'Kurdisch',
    description: 'Wir sprechen auch Kurdisch, damit Sie sich voellig verstanden fuehlen und alle Behandlungsschritte nachvollziehen koennen.',
  },
];

/* ---- Animation Variants ---- */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

/* ---- Counter Component ---- */
function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString('de-DE')}
      {suffix}
    </span>
  );
}

/* ---- Section Wrapper ---- */
function Section({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-16 md:py-24 px-4 sm:px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

function SectionHeading({
  children,
  subtitle,
}: {
  children: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
      className="text-center mb-12 md:mb-16"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
        {children}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  );
}

/* ---- Impressum Content ---- */
function ImpressumContent() {
  return (
    <div className="prose prose-sm max-w-none text-foreground space-y-4">
      <h3 className="text-lg font-semibold">Angaben gemaess Sect. 5 TMG</h3>
      <p>
        <strong>Dr. Faiz Eissa</strong>
        <br />
        {CLINIC}
        <br />
        Luisenplatz
        <br />
        64283 Darmstadt
        <br />
        Deutschland
      </p>

      <h3 className="text-lg font-semibold">Kontakt</h3>
      <p>
        Telefon: {PHONE}
        <br />
        E-Mail: info@dentalpraxis-luisenplatz.de
      </p>

      <h3 className="text-lg font-semibold">Steuernummer</h3>
      <p>Steuernummer: 0781461675</p>

      <h3 className="text-lg font-semibold">Berufsbezeichnung und berufsrechtliche Regelungen</h3>
      <p>
        Berufsbezeichnung: Zahnarzt
        <br />
        Zuständige Kammer: Zahnärztekammer Hessen
        <br />
        Verliehen in: Deutschland
        <br />
        Es gelten folgende berufsrechtliche Regelungen:
        <br />
        - Zahnheilkundegesetz (ZHG)
        <br />
        - Gebührenordnung für Zahnärzte (GOZ)
      </p>

      <h3 className="text-lg font-semibold">Ausbildung</h3>
      <p>
        Studium und Approbation an der LMU München
        <br />
        Anerkennung der Diplomarbeit in der Schweiz Bern
        <br />
        Bewilligung aus Kanton Luzern
        <br />
        Curriculum der Implantologie in Mainz
      </p>

      <h3 className="text-lg font-semibold">Verantwortlich für den Inhalt nach Sect. 55 Abs. 2 RStV</h3>
      <p>Dr. Faiz Eissa
        <br />
        Luisenplatz, 64283 Darmstadt
      </p>

      <h3 className="text-lg font-semibold">Haftungsausschluss</h3>
      <h4 className="text-base font-semibold">Haftung für Inhalte</h4>
      <p>
        Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
        Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
        Als Diensteanbieter sind wir gemäß Sect. 7 Abs.1 TMG für eigene Inhalte auf diesen
        Seiten nach den allgemeinen Gesetzen verantwortlich. Nach Sect. 8 bis 10 TMG sind wir
        als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
        Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
        Tätigkeit hinweisen.
      </p>

      <h4 className="text-base font-semibold">Haftung für Links</h4>
      <p>
        Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen
        Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
        Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
        Seiten verantwortlich.
      </p>

      <h3 className="text-lg font-semibold">Urheberrecht</h3>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
        dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
        der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
        Zustimmung des jeweiligen Autors bzw. Erstellers.
      </p>

      <h3 className="text-lg font-semibold">Streitschlichtung</h3>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit.
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </div>
  );
}

/* ---- Datenschutzerklärung Content ---- */
function DatenschutzContent() {
  return (
    <div className="prose prose-sm max-w-none text-foreground space-y-4">
      <h3 className="text-lg font-semibold">1. Datenschutz auf einen Blick</h3>
      <h4 className="text-base font-semibold">Allgemeine Hinweise</h4>
      <p>
        Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
        personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
        Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
      </p>

      <h3 className="text-lg font-semibold">2. Verantwortliche Stelle</h3>
      <p>
        Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
      </p>
      <p>
        Dr. Faiz Eissa
        <br />
        {CLINIC}
        <br />
        Luisenplatz
        <br />
        64283 Darmstadt
        <br />
        Telefon: {PHONE}
        <br />
        E-Mail: info@dentalpraxis-luisenplatz.de
      </p>
      <p>
        Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder
        gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen
        Daten entscheidet.
      </p>

      <h3 className="text-lg font-semibold">3. Hosting</h3>
      <p>
        Diese Website wird bei einem professionellen Hosting-Provider gehostet. Die auf dieser
        Website verarbeiteten Daten werden auf den Servern des Hosters gespeichert. Hierbei kann
        es sich v.a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten,
        Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine
        Website generiert werden, handeln.
      </p>

      <h3 className="text-lg font-semibold">4. SSL-Verschlüsselung</h3>
      <p>
        Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher
        Inhalte, wie zum Beispiel Anfragen, die Sie an uns als Seitenbetreiber senden, eine
        SSL-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die
        Adresszeile des Browsers von "http" auf "https" wechselt und an dem Schloss-Symbol in
        Ihrer Browserzeile.
      </p>

      <h3 className="text-lg font-semibold">5. Kontaktformular</h3>
      <p>
        Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus
        dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks
        Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
        Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
      </p>
      <p>
        Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO,
        sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur
        Durchführung vorvertraglicher Maßnahmen erforderlich ist.
      </p>

      <h3 className="text-lg font-semibold">6. Server-Log-Dateien</h3>
      <p>
        Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten
        Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Browsertyp und Browserversion</li>
        <li>Verwendetes Betriebssystem</li>
        <li>Referrer URL</li>
        <li>Hostname des zugreifenden Rechners</li>
        <li>Uhrzeit der Serveranfrage</li>
        <li>IP-Adresse</li>
      </ul>
      <p>
        Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
        Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
      </p>

      <h3 className="text-lg font-semibold">7. Google Analytics (Hinweis)</h3>
      <p>
        Auf dieser Website kann ggf. Google Analytics eingesetzt werden. Google Analytics ist
        ein Webanalysedienst. Wenn Google Analytics aktiviert wird, würden Cookies verwendet,
        die eine Analyse der Benutzung der Website durch Sie ermöglichen. Die dadurch erzeugten
        Informationen über die Benutzung dieser Website werden in der Regel an einen Server von
        Google in den USA übertragen und dort gespeichert.
      </p>
      <p>
        <em>Hinweis: Google Analytics ist derzeit nicht aktiv auf dieser Website.</em>
      </p>

      <h3 className="text-lg font-semibold">8. Ihre Rechte</h3>
      <p>Sie haben jederzeit das Recht:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu erhalten (Art. 15 DSGVO)
        </li>
        <li>
          Berichtigung unrichtiger personenbezogener Daten zu verlangen (Art. 16 DSGVO)
        </li>
        <li>
          Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen (Art. 17 DSGVO)
        </li>
        <li>
          Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen (Art. 18 DSGVO)
        </li>
        <li>
          Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten einzulegen (Art. 21 DSGVO)
        </li>
        <li>
          Datenübertragbarkeit zu verlangen (Art. 20 DSGVO)
        </li>
      </ul>

      <h3 className="text-lg font-semibold">9. Cookies</h3>
      <p>
        Diese Website verwendet keine Tracking-Cookies. Es werden lediglich technisch
        notwendige Cookies eingesetzt, die für den Betrieb der Website erforderlich sind.
      </p>

      <h3 className="text-lg font-semibold">10. Aufbewahrungsdauer</h3>
      <p>
        Personenbezogene Daten werden gelöscht, sobald der Zweck der Speicherung entfällt.
        Kontaktanfragen werden nach Abschluss der Bearbeitung archiviert, sofern keine
        gesetzlichen Aufbewahrungsfristen entgegenstehen.
      </p>

      <h3 className="text-lg font-semibold">11. Änderungen der Datenschutzerklärung</h3>
      <p>
        Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den
        aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen
        in der Datenschutzerklärung umzusetzen. Für Ihren erneuten Besuch gilt dann die
        neue Datenschutzerklärung.
      </p>

      <h3 className="text-lg font-semibold">12. Fragen zum Datenschutz</h3>
      <p>
        Für Further Informationen zum Datenschutz kontaktieren Sie uns bitte unter:
        <br />
        Telefon: {PHONE}
        <br />
        E-Mail: info@dentalpraxis-luisenplatz.de
      </p>
    </div>
  );
}

/* ==================== MAIN PAGE ==================== */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [impressumOpen, setImpressumOpen] = useState(false);
  const [datenschutzOpen, setDatenschutzOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    telefon: '',
    email: '',
    nachricht: '',
    behandlung: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Anfrage gesendet', {
          description: 'Vielen Dank! Wir melden uns zeitnah bei Ihnen.',
        });
        setFormData({ name: '', telefon: '', email: '', nachricht: '', behandlung: '' });
      } else {
        toast.error('Fehler', { description: data.message });
      }
    } catch {
      toast.error('Fehler', { description: 'Bitte versuchen Sie es später erneut.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* ===== NAVBAR ===== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/95 backdrop-blur-md shadow-md'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16 md:h-20">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-bold text-primary text-base sm:text-lg md:text-xl tracking-tight text-left"
          >
            {CLINIC}
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
            <a href={PHONE_HREF}>
              <Button size="sm" className="gap-2 cta-pulse">
                <Phone className="size-4" />
                <span className="hidden xl:inline">{PHONE}</span>
                <span className="xl:hidden">Anrufen</span>
              </Button>
            </a>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-3 lg:hidden">
            <a href={PHONE_HREF}>
              <Button variant="outline" size="icon" className="size-9">
                <Phone className="size-4" />
              </Button>
            </a>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="size-9">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>{CLINIC}</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2 mt-4">
                  {NAV_LINKS.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <button
                        onClick={() => scrollTo(link.href)}
                        className="flex items-center gap-2 rounded-md px-3 py-3 text-left text-base font-medium hover:bg-accent transition-colors"
                      >
                        <ChevronRight className="size-4 text-primary" />
                        {link.label}
                      </button>
                    </SheetClose>
                  ))}
                  <Separator className="my-2" />
                  <a href={PHONE_HREF} className="mt-2">
                    <Button className="w-full gap-2">
                      <Phone className="size-4" />
                      {PHONE}
                    </Button>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* ===== HERO ===== */}
        <section className="relative min-h-[90vh] flex items-center pt-20 px-4 sm:px-6 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10 -z-10" />
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10" />

          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-3xl">
              <motion.div initial="hidden" animate="visible" variants={stagger}>
                <motion.div variants={fadeUp}>
                  <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">
                    <CheckCircle2 className="size-4 mr-2 text-primary" />
                    Ihr Zahnarzt in Darmstadt
                  </Badge>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-tight"
                >
                  Ihr Lächeln verdient{' '}
                  <span className="text-primary">die beste Pflege</span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed"
                >
                  Willkommen in der {CLINIC}. Moderne Zahnmedizin, persönliche Betreuung und
                  ein mehrsprachiges Team — alles unter einem Dach in Darmstadt.
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  className="mt-8 flex flex-col sm:flex-row gap-4"
                >
                  <Button
                    size="lg"
                    className="gap-2 text-base px-8 cta-pulse"
                    onClick={() => scrollTo('#kontakt')}
                  >
                    Termin vereinbaren
                    <ChevronRight className="size-4" />
                  </Button>
                  <a href={PHONE_HREF}>
                    <Button size="lg" variant="outline" className="gap-2 text-base px-8">
                      <Phone className="size-4" />
                      Jetzt anrufen
                    </Button>
                  </a>
                </motion.div>

                {/* Trust badges */}
                <motion.div
                  variants={fadeUp}
                  className="mt-12 flex flex-wrap gap-6 text-sm text-muted-foreground"
                >
                  <div className="flex items-center gap-2">
                    <Award className="size-5 text-primary" />
                    <span>Ueber 10 Jahre Erfahrung</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Monitor className="size-5 text-primary" />
                    <span>Modernste Technik</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Languages className="size-5 text-primary" />
                    <span>Mehrsprachiges Team</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== MAIN SERVICES ===== */}
        <Section id="leistungen">
          <SectionHeading>
            Unsere zahnmedizinischen Leistungen
          </SectionHeading>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6 lg:gap-8"
          >
            {MAIN_SERVICES.map((service) => (
              <motion.div key={service.title} variants={fadeUp}>
                <Card className="group h-full border border-border/60 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 lg:p-8">
                    <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="size-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-5">
                      {service.description}
                    </p>
                    <button
                      onClick={() => scrollTo('#kontakt')}
                      className="inline-flex items-center gap-1 text-primary font-medium text-sm hover:gap-2 transition-all"
                    >
                      Mehr erfahren
                      <ChevronRight className="size-4" />
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* ===== WHY US ===== */}
        <Section id="ueber-uns" className="bg-muted/40">
          <SectionHeading>
            Ihr Partner für moderne Zahnmedizin in Darmstadt
          </SectionHeading>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="grid sm:grid-cols-2 gap-6"
            >
              {WHY_US_FEATURES.map((feat) => (
                <motion.div
                  key={feat.title}
                  variants={fadeUp}
                  className="flex gap-4"
                >
                  <div className="size-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <feat.icon className="size-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{feat.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              className="space-y-6"
            >
              <Card className="border-border/60">
                <CardContent className="p-6 lg:p-8 space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Award className="size-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Dr. Faiz Eissa</h3>
                      <p className="text-sm text-muted-foreground">Zahnarzt / Implantologe</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                      <span>Studium und Approbation an der LMU Muenchen</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                      <span>Anerkennung der Diplomarbeit in der Schweiz Bern</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                      <span>Bewilligung aus Kanton Luzern</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                      <span>Curriculum der Implantologie in Mainz</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <p className="text-muted-foreground leading-relaxed">
                Mit ueber 10 Jahren Erfahrung in der Zahnmedizin verbinde ich modernste
                Technik mit einfuehlsamer Patientenbetreuung. Mein Ziel ist es, jedem
                Patienten ein gesundes und schoenes Laecheln zu ermöglichen — in einer
                Atmosphaere des Vertrauens und des Wohlbefindens.
              </p>
            </motion.div>
          </div>
        </Section>

        {/* ===== MORE SERVICES ===== */}
        <Section>
          <SectionHeading>
            Weitere zahnmedizinische Leistungen
          </SectionHeading>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {MORE_SERVICES.map((service) => (
              <motion.div key={service.title} variants={fadeUp}>
                <Card className="h-full border border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <service.icon className="size-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* ===== STATS ===== */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
            >
              {STATS.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className="text-center"
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-2 text-sm sm:text-base text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== TESTIMONIALS ===== */}
        <Section id="bewertungen">
          <SectionHeading>
            Was unsere Patienten sagen
          </SectionHeading>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6 lg:gap-8"
          >
            {TESTIMONIALS.map((t) => (
              <motion.div key={t.name} variants={fadeUp}>
                <Card className="h-full border-border/60">
                  <CardContent className="p-6 lg:p-8 flex flex-col">
                    <Quote className="size-8 text-primary/20 mb-4" />
                    <p className="text-muted-foreground leading-relaxed flex-1 mb-6">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <Separator className="mb-4" />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{t.name}</p>
                        <p className="text-sm text-muted-foreground">{t.title}</p>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="size-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* ===== LANGUAGES ===== */}
        <Section id="sprachen" className="bg-muted/40">
          <SectionHeading>
            Wir sprechen Ihre Sprache
          </SectionHeading>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid sm:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto"
          >
            {LANGUAGES.map((lang) => (
              <motion.div key={lang.name} variants={fadeUp}>
                <Card className="h-full text-center border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6 lg:p-8 flex flex-col items-center">
                    <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                      <Globe className="size-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {lang.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {lang.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* ===== CTA ===== */}
        <section className="py-16 md:py-24 px-4 sm:px-6 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/90 -z-0" />
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl -z-0" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-3xl -z-0" />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
            >
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground tracking-tight"
              >
                Termin vereinbaren
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-4 text-lg text-primary-foreground/80 max-w-xl mx-auto"
              >
                Ihr Weg zu einem gesunden und strahlenden Laecheln beginnt hier.
                Kontaktieren Sie uns noch heute.
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-2 text-base px-8"
                  onClick={() => scrollTo('#kontakt')}
                >
                  Termin vereinbaren
                  <ChevronRight className="size-4" />
                </Button>
                <a href={PHONE_HREF}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 text-base px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  >
                    <Phone className="size-4" />
                    Jetzt anrufen
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ===== CONTACT ===== */}
        <Section id="kontakt">
          <SectionHeading>
            Kontaktieren Sie uns
          </SectionHeading>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              className="lg:col-span-2 space-y-6"
            >
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="size-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="size-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Adresse</h4>
                    <p className="text-sm text-muted-foreground">{ADDRESS}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="size-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="size-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Telefon</h4>
                    <a
                      href={PHONE_HREF}
                      className="text-sm text-primary hover:underline"
                    >
                      {PHONE}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="size-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="size-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">E-Mail</h4>
                    <a
                      href="mailto:info@dentalpraxis-luisenplatz.de"
                      className="text-sm text-primary hover:underline"
                    >
                      info@dentalpraxis-luisenplatz.de
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="size-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="size-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Sprechzeiten</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Montag - Freitag: 08:00 - 18:00</p>
                      <p>Samstag: nach Vereinbarung</p>
                      <p>Sonntag: geschlossen</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              className="lg:col-span-3"
            >
              <Card className="border-border/60">
                <CardContent className="p-6 lg:p-8">
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          placeholder="Ihr vollstaendiger Name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefon">Telefon *</Label>
                        <Input
                          id="telefon"
                          type="tel"
                          placeholder="Ihre Telefonnummer"
                          value={formData.telefon}
                          onChange={(e) =>
                            setFormData({ ...formData, telefon: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="email">E-Mail</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Ihre E-Mail-Adresse"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="behandlung">Behandlungswunsch</Label>
                        <Select
                          value={formData.behandlung}
                          onValueChange={(val) =>
                            setFormData({ ...formData, behandlung: val })
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Bitte waehlen..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="zahnreinigung">
                              Professionelle Zahnreinigung
                            </SelectItem>
                            <SelectItem value="implantate">
                              Zahnimplantate
                            </SelectItem>
                            <SelectItem value="bleaching">Bleaching</SelectItem>
                            <SelectItem value="kronen-bruecken">
                              Kronen & Bruecken
                            </SelectItem>
                            <SelectItem value="sonstiges">Sonstiges</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nachricht">Nachricht</Label>
                      <Textarea
                        id="nachricht"
                        placeholder="Beschreiben Sie kurz Ihr Anliegen..."
                        rows={4}
                        value={formData.nachricht}
                        onChange={(e) =>
                          setFormData({ ...formData, nachricht: e.target.value })
                        }
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full sm:w-auto gap-2 cta-pulse"
                      disabled={submitting}
                    >
                      <Send className="size-4" />
                      {submitting ? 'Wird gesendet...' : 'Anfrage senden'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </Section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Column 1: Clinic Info */}
            <div>
              <h3 className="font-bold text-lg mb-4">{CLINIC}</h3>
              <p className="text-sm text-background/70 leading-relaxed mb-4">
                Moderne Zahnmedizin in Darmstadt. Wir bieten Ihnen umfassende
                zahnmedizinische Versorgung mit persönlicher Betreuung in
                vertrauensvoller Atmosphaere.
              </p>
              <a href={PHONE_HREF} className="flex items-center gap-2 text-sm text-background/90 hover:text-primary-foreground transition-colors">
                <Phone className="size-4" />
                {PHONE}
              </a>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="font-semibold text-base mb-4">Schnellzugriff</h4>
              <ul className="space-y-2.5 text-sm">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-background/70 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
                <li>
                  <Separator className="my-3 bg-background/20" />
                </li>
                <li>
                  <Dialog open={impressumOpen} onOpenChange={setImpressumOpen}>
                    <DialogTrigger asChild>
                      <button className="text-background/70 hover:text-primary-foreground transition-colors">
                        Impressum
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl max-h-[85vh]">
                      <DialogHeader>
                        <DialogTitle>Impressum</DialogTitle>
                        <DialogDescription>
                          Angaben gemaess Sect. 5 TMG
                        </DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="max-h-[65vh] pr-4">
                        <ImpressumContent />
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </li>
                <li>
                  <Dialog open={datenschutzOpen} onOpenChange={setDatenschutzOpen}>
                    <DialogTrigger asChild>
                      <button className="text-background/70 hover:text-primary-foreground transition-colors">
                        Datenschutzerklaerung
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl max-h-[85vh]">
                      <DialogHeader>
                        <DialogTitle>Datenschutzerklaerung</DialogTitle>
                        <DialogDescription>
                          Informationen zum Datenschutz
                        </DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="max-h-[65vh] pr-4">
                        <DatenschutzContent />
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div>
              <h4 className="font-semibold text-base mb-4">Kontakt</h4>
              <ul className="space-y-3 text-sm text-background/70">
                <li className="flex items-start gap-2">
                  <MapPin className="size-4 shrink-0 mt-0.5" />
                  <span>{ADDRESS}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="size-4 shrink-0" />
                  <a href={PHONE_HREF} className="hover:text-primary-foreground transition-colors">
                    {PHONE}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="size-4 shrink-0" />
                  <a
                    href="mailto:info@dentalpraxis-luisenplatz.de"
                    className="hover:text-primary-foreground transition-colors"
                  >
                    info@dentalpraxis-luisenplatz.de
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="size-4 shrink-0 mt-0.5" />
                  <div>
                    <p>Mo - Fr: 08:00 - 18:00</p>
                    <p>Sa: nach Vereinbarung</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-background/50">
            <p>
              &copy; {new Date().getFullYear()} {CLINIC}. Alle Rechte vorbehalten.
            </p>
            <div className="flex items-center gap-4">
              <Dialog open={impressumOpen} onOpenChange={setImpressumOpen}>
                <DialogTrigger asChild>
                  <button className="hover:text-background/80 transition-colors">
                    Impressum
                  </button>
                </DialogTrigger>
              </Dialog>
              <Dialog open={datenschutzOpen} onOpenChange={setDatenschutzOpen}>
                <DialogTrigger asChild>
                  <button className="hover:text-background/80 transition-colors">
                    Datenschutzerklaerung
                  </button>
                </DialogTrigger>
              </Dialog>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
