'use client';

import { useState, useEffect, useRef, type FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
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
  X,
} from 'lucide-react';
import { GermanyFlag, SyriaFlag, KurdistanFlag } from '@/components/flag-icons';
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
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

/* ============================================================ */
/*  DATA                                                          */
/* ============================================================ */
const PHONE = '+49 1521 3709772';
const PHONE_HREF = 'tel:+4915213709772';
const CLINIC = 'Dentalpraxis am Luisenplatz';
const ADDRESS = 'Luisenplatz, 64283 Darmstadt, Deutschland';

const NAV_LINKS = [
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Über uns', href: '#über-uns' },
  { label: 'Bewertungen', href: '#bewertungen' },
  { label: 'Sprachen', href: '#sprachen' },
  { label: 'Kontakt', href: '#kontakt' },
];

const MAIN_SERVICES = [
  {
    icon: Sparkles,
    title: 'Professionelle Zahnreinigung',
    description:
      'Gründliche Reinigung Ihrer Zähne mit modernsten Geräten. Entfernung von Zahnstein und Verfärbungen für ein strahlendes Lächeln.',
    image: '/images/service-cleaning.png',
  },
  {
    icon: HeartPulse,
    title: 'Zahnimplantate',
    description:
      'Hochwertige Implantatlösungen für einen festen und natürlichen Zahnersatz. Modernste Technik für nachhaltige Ergebnisse.',
    image: '/images/service-implant.png',
  },
  {
    icon: Sun,
    title: 'Bleaching',
    description:
      'Professionelle Zahnaufhellung für strahlend weisse Zähne. Schonende Verfahren mit nachhaltigen Ergebnissen.',
    image: '/images/service-bleaching.png',
  },
];

const WHY_US_FEATURES = [
  {
    icon: Monitor,
    title: 'Moderne Ausstattung',
    description:
      'Neüste Diagnostik- und Behandlungstechnologien für Präzision und Komfort bei jeder Behandlung.',
  },
  {
    icon: Users,
    title: 'Individülle Betreuung',
    description:
      'Persönliche Beratung und massgeschneiderte Behandlungspläne, die auf Ihre Bedürfnisse abgestimmt sind.',
  },
  {
    icon: Award,
    title: 'Erfahrenes Team',
    description:
      'Über 10 Jahre Berufserfahrung mit fundierter Ausbildung an der LMU München und Weiterbildung in der Implantologie.',
  },
  {
    icon: Languages,
    title: 'Mehrsprachiger Service',
    description:
      'Wir sprechen Deutsch, Arabisch und Kurdisch — für eine verständliche Kommunikation ohne Sprachbarrieren.',
  },
];

const MORE_SERVICES = [
  { icon: Crown, title: 'Kronen & Brücken', description: 'Hochwertiger Zahnersatz für Funktion und Ästhetik.' },
  { icon: Heart, title: 'Zahnfleischbehandlung', description: 'Professionelle Behandlung für gesundes Zahnfleisch.' },
  { icon: Gem, title: 'Ästhetische Füllungen', description: 'Natürliche und langlebige Lösungen für beschädigte Zähne.' },
  { icon: ShieldCheck, title: 'Vorsorgeuntersuchungen', description: 'Regelmässige Kontrollen für langfristige Zahngesundheit.' },
  { icon: Smile, title: 'Zahnersatz', description: 'Individülle Lösungen für ein sicheres Lächeln.' },
  { icon: Star, title: 'Ästhetische Zahnmedizin', description: 'Moderne Verfahren für schöne und harmonische Zähne.' },
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
    text: 'Ich bin seit Jahren Patientin bei Dr. Eissa und bin sehr zufrieden. Die Praxis ist modern, das Team ist freundlich und die Behandlungen sind schmerzfrei.',
  },
  {
    name: 'Michäl R.',
    title: 'Patient seit 2021',
    text: 'Moderne Praxis, kurze Wartezeiten und hervorragende Ergebnisse. Die Beratung war ausführlich und verständlich. Sehr empfehlenswert.',
  },
  {
    name: 'Anna W.',
    title: 'Patientin seit 2020',
    text: 'Mein Implantat wurde perfekt gesetzt und sieht aus wie ein eigener Zahn. Die Nachsorge ist ebenfalls erstklassig. Ich kann die Praxis nur wärmstens empfehlen.',
  },
];

const LANGUAGES = [
  { name: 'Deutsch', description: 'Flüssige Kommunikation in allen Belangen der zahnmedizinischen Beratung und Behandlung.', Flag: GermanyFlag },
  { name: 'Arabisch', description: 'Vollständige Beratung und Behandlung in arabischer Sprache für unsere arabischsprachigen Patienten.', Flag: SyriaFlag },
  { name: 'Kurdisch', description: 'Persönliche Betreuung und Beratung auf Kurdisch, damit Sie sich völlig verstanden fühlen.', Flag: KurdistanFlag },
];

/* ============================================================ */
/*  ANIMATION HELPERS                                             */
/* ============================================================ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
} as const;
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
} as const;
const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
} as const;
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
} as const;

/* ============================================================ */
/*  ANIMATED COUNTER                                              */
/* ============================================================ */
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

/* ============================================================ */
/*  SECTION HELPERS                                               */
/* ============================================================ */
function Section({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`py-16 md:py-24 px-4 sm:px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

function SectionHeading({ children, subtitle, light = false }: { children: React.ReactNode; subtitle?: string; light?: boolean }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} className="text-center mb-12 md:mb-16">
      <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${light ? 'text-white' : 'text-foreground'}`}>{children}</h2>
      {subtitle && <p className={`mt-4 text-lg max-w-2xl mx-auto ${light ? 'text-white/80' : 'text-muted-foreground'}`}>{subtitle}</p>}
    </motion.div>
  );
}

/* ============================================================ */
/*  LEGAL CONTENT                                                 */
/* ============================================================ */
function ImpressumContent() {
  return (
    <div className="prose prose-sm max-w-none text-foreground space-y-4">
      <h3 className="text-lg font-semibold">Angaben gemäss Sect. 5 TMG</h3>
      <p><strong>Dr. Faiz Eissa</strong><br />{CLINIC}<br />Luisenplatz<br />64283 Darmstadt<br />Deutschland</p>
      <h3 className="text-lg font-semibold">Kontakt</h3>
      <p>Telefon: {PHONE}<br />E-Mail: info@dentalpraxis-luisenplatz.de</p>
      <h3 className="text-lg font-semibold">Steürnummer</h3>
      <p>Steürnummer: 0781461675</p>
      <h3 className="text-lg font-semibold">Berufsbezeichnung und berufsrechtliche Regelungen</h3>
      <p>Berufsbezeichnung: Zahnarzt<br />Zuständige Kammer: Zähneärztekammer Hessen<br />Verliehen in: Deutschland<br />Es gelten folgende berufsrechtliche Regelungen:<br />- Zahnheilkundegesetz (ZHG)<br />- Gebührenordnung für Zahnarzte (GOZ)</p>
      <h3 className="text-lg font-semibold">Ausbildung</h3>
      <p>Studium und Approbation an der LMU München<br />Anerkennung der Diplomarbeit in der Schweiz Bern<br />Bewilligung aus Kanton Luzern<br />Curriculum der Implantologie in Mainz</p>
      <h3 className="text-lg font-semibold">Verantwortlich für den Inhalt nach Sect. 55 Abs. 2 RStV</h3>
      <p>Dr. Faiz Eissa<br />Luisenplatz, 64283 Darmstadt</p>
      <h3 className="text-lg font-semibold">Haftungsausschluss</h3>
      <h4 className="text-base font-semibold">Haftung für Inhalte</h4>
      <p>Die Inhalte unserer Seiten wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäss Sect. 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.</p>
      <h4 className="text-base font-semibold">Haftung für Links</h4>
      <p>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.</p>
      <h3 className="text-lg font-semibold">Urheberrecht</h3>
      <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.</p>
      <h3 className="text-lg font-semibold">Streitschlichtung</h3>
      <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
    </div>
  );
}

function DatenschutzContent() {
  return (
    <div className="prose prose-sm max-w-none text-foreground space-y-4">
      <h3 className="text-lg font-semibold">1. Datenschutz auf einen Blick</h3>
      <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p>
      <h3 className="text-lg font-semibold">2. Verantwortliche Stelle</h3>
      <p>Dr. Faiz Eissa<br />{CLINIC}<br />Luisenplatz<br />64283 Darmstadt<br />Telefon: {PHONE}<br />E-Mail: info@dentalpraxis-luisenplatz.de</p>
      <h3 className="text-lg font-semibold">3. Hosting</h3>
      <p>Diese Website wird bei einem professionellen Hosting-Provider gehostet. Die auf dieser Website verarbeiteten Daten werden auf den Servern des Hosters gespeichert.</p>
      <h3 className="text-lg font-semibold">4. SSL-Verschlüsselung</h3>
      <p>Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL-Verschlüsselung.</p>
      <h3 className="text-lg font-semibold">5. Kontaktformular</h3>
      <p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
      <h3 className="text-lg font-semibold">6. Server-Log-Dateien</h3>
      <p>Der Provider der Seiten erhebt und speichert automatisch Informationen in Server-Log-Dateien: Browsertyp, Betriebssystem, Referrer URL, Hostname, Uhrzeit der Serveranfrage, IP-Adresse.</p>
      <h3 className="text-lg font-semibold">7. Google Analytics</h3>
      <p><em>Hinweis: Google Analytics ist derzeit nicht aktiv auf dieser Website.</em></p>
      <h3 className="text-lg font-semibold">8. Ihre Rechte</h3>
      <p>Sie haben jederzeit das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), Widerspruch (Art. 21 DSGVO) und Datenübertragbarkeit (Art. 20 DSGVO).</p>
      <h3 className="text-lg font-semibold">9. Cookies</h3>
      <p>Diese Website verwendet keine Tracking-Cookies. Es werden lediglich technisch notwendige Cookies eingesetzt.</p>
      <h3 className="text-lg font-semibold">10. Aufbewahrungsdaür</h3>
      <p>Personenbezogene Daten werden gelöscht, sobald der Zweck der Speicherung entfällt.</p>
      <h3 className="text-lg font-semibold">11. Fragen zum Datenschutz</h3>
      <p>Telefon: {PHONE}<br />E-Mail: info@dentalpraxis-luisenplatz.de</p>
    </div>
  );
}

/* ============================================================ */
/*  MAIN PAGE                                                     */
/* ============================================================ */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [impressumOpen, setImpressumOpen] = useState(false);
  const [datenschutzOpen, setDatenschutzOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', telefon: '', email: '', nachricht: '', behandlung: '' });
  const [sent, setSent] = useState(false);

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

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    const behandlungMap: Record<string, string> = {
      zahnreinigung: 'Professionelle Zahnreinigung',
      implantate: 'Zahnimplantate',
      bleaching: 'Bleaching',
      kronen: 'Kronen & Brücken',
      zahnfleisch: 'Zahnfleischbehandlung',
      sonstiges: 'Sonstiges',
    };

    const lines = [
      'Neü Terminanfrage von der Website:',
      `Name: ${formData.name}`,
      `Telefon: ${formData.telefon}`,
      formData.email ? `E-Mail: ${formData.email}` : undefined,
      formData.behandlung ? `Behandlungswunsch: ${behandlungMap[formData.behandlung] || formData.behandlung}` : undefined,
      formData.nachricht ? `Nachricht: ${formData.nachricht}` : undefined,
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join('\n'));
    const phone = '4915213709772';
    const url = `https://wa.me/${phone}?text=${text}`;

    setSent(true);
    window.open(url, '_blank');
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* ==================== NAVBAR ==================== */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16 md:h-20">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2.5">
            <Image src="/images/logo.png" alt={CLINIC} width={44} height={44} className="rounded-lg" />
            <span className={`font-bold text-sm sm:text-base md:text-lg tracking-tight text-left ${scrolled ? 'text-primary' : 'text-white'}`}>{CLINIC}</span>
          </button>
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button key={link.href} onClick={() => scrollTo(link.href)} className={`text-sm font-medium transition-colors ${scrolled ? 'text-foreground/70 hover:text-primary' : 'text-white/80 hover:text-white'}`}>
                {link.label}
              </button>
            ))}
            <a href={PHONE_HREF}>
              <Button size="sm" className="gap-2 bg-cta hover:bg-cta/90 text-cta-foreground cta-pulse">
                <Phone className="size-4" />
                <span className="hidden xl:inline">{PHONE}</span>
                <span className="xl:hidden">Anrufen</span>
              </Button>
            </a>
          </div>
          {/* Mobile */}
          <div className="flex items-center gap-3 lg:hidden">
            <a href={PHONE_HREF}>
              <Button variant="outline" size="icon" className="size-9 border-primary text-primary">
                <Phone className="size-4" />
              </Button>
            </a>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="size-9 text-primary">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2 text-primary">
                  <Image src="/images/logo.png" alt={CLINIC} width={32} height={32} className="rounded-md" />
                  {CLINIC}
                </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2 mt-4">
                  {NAV_LINKS.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <button onClick={() => scrollTo(link.href)} className="flex items-center gap-2 rounded-md px-3 py-3 text-left text-base font-medium hover:bg-primary/10 transition-colors">
                        <ChevronRight className="size-4 text-primary" />{link.label}
                      </button>
                    </SheetClose>
                  ))}
                  <Separator className="my-2" />
                  <a href={PHONE_HREF} className="mt-2">
                    <Button className="w-full gap-2 bg-cta hover:bg-cta/90 text-cta-foreground">
                      <Phone className="size-4" />{PHONE}
                    </Button>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* ==================== HERO ==================== */}
        <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'linear-gradient(to right, rgba(30,70,151,0.85), rgba(30,70,151,0.70) 50%, rgba(30,70,151,0.50))' }}>
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <Image src="/images/hero-clinic.png" alt="Moderne Zahnklinik Darmstadt" fill className="object-cover opacity-40" priority />
          </div>

          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-20 pb-16 relative z-10">
            <div className="max-w-2xl">
              <motion.div initial="hidden" animate="visible" variants={stagger}>
                <motion.div variants={fadeUp}>
                  <Badge className="mb-6 px-4 py-1.5 text-sm font-medium bg-white/20 text-white border-white/30 hover:bg-white/30">
                    <CheckCircle2 className="size-4 mr-2" />
                    Ihr Zahnarzt in Darmstadt
                  </Badge>
                </motion.div>

                <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                  Ihr Lächeln verdient{' '}
                  <span className="text-white/90">die beste Pflege</span>
                </motion.h1>

                <motion.p variants={fadeUp} className="mt-6 text-lg sm:text-xl text-white/85 max-w-xl leading-relaxed">
                  Willkommen in der {CLINIC}. Moderne Zahnmedizin, persönliche Betreuung und ein mehrsprachiges Team — alles unter einem Dach in Darmstadt.
                </motion.p>

                <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="gap-2 text-base px-8 bg-cta text-white hover:bg-cta/90 font-semibold cta-pulse" onClick={() => scrollTo('#kontakt')}>
                    Termin vereinbaren
                    <ChevronRight className="size-4" />
                  </Button>
                  <a href={PHONE_HREF}>
                    <Button size="lg" variant="outline" className="gap-2 text-base px-8 border-white/60 bg-white/10 text-white hover:bg-white hover:text-primary font-semibold backdrop-blur-sm transition-colors">
                      <Phone className="size-4" />Jetzt anrufen
                    </Button>
                  </a>
                </motion.div>

                <motion.div variants={fadeUp} className="mt-12 flex flex-wrap gap-6 text-sm text-white/80">
                  <div className="flex items-center gap-2"><Award className="size-5" /><span>Über 10 Jahre Erfahrung</span></div>
                  <div className="flex items-center gap-2"><Monitor className="size-5" /><span>Modernste Technik</span></div>
                  <div className="flex items-center gap-2"><Languages className="size-5" /><span>Mehrsprachiges Team</span></div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== MAIN SERVICES ==================== */}
        <Section id="leistungen" className="bg-white">
          <SectionHeading>Unsere zahnmedizinischen Leistungen</SectionHeading>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {MAIN_SERVICES.map((service) => (
              <motion.div key={service.title} variants={fadeUp}>
                <Card className="group h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="relative h-52 overflow-hidden">
                    <Image src={service.image} alt={service.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="size-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
                        <service.icon className="size-6 text-primary" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                    <button onClick={() => scrollTo('#kontakt')} className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:gap-2 transition-all">
                      Termin vereinbaren <ChevronRight className="size-4" />
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* ==================== WHY US ==================== */}
        <Section id="über-uns" className="bg-gradient-to-br from-primary/8 via-primary/4 to-[#f0f4ff]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <Badge className="mb-4 px-3 py-1 bg-primary/10 text-primary border-primary/20 mx-auto block w-fit">Über uns</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
                Ihr Partner für moderne Zahnmedizin in Darmstadt
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-3xl mx-auto">
                Bei {CLINIC} verbinden wir moderne Technologie, individülle Betreuung und langjährige Erfahrung, um Ihnen die bestmögliche Behandlung in einer angenehmen Atmosphäre zu bieten.
              </p>
            </motion.div>

            {/* Doctor card */}
            <motion.div variants={fadeUp} className="max-w-2xl mx-auto mb-10">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6">
                <div className="size-20 md:size-24 rounded-full bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
                  <Image src="/images/logo.png" alt={CLINIC} width={80} height={80} className="object-cover" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-bold text-foreground mb-1">Dr. Faiz Eissa</h3>
                  <p className="text-primary font-medium text-sm mb-2">Zahnarzt / Implantologe</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Studium und Approbation an der LMU München {'\u2022'} Anerkennung in Bern, Schweiz {'\u2022'} Curriculum der Implantologie in Mainz
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Features grid */}
            <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              {WHY_US_FEATURES.map((feat) => (
                <motion.div key={feat.title} variants={fadeUp} className="text-center bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <feat.icon className="size-7 text-primary" />
                  </div>
                  <h4 className="font-bold text-foreground mb-1.5">{feat.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feat.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Section>

        {/* ==================== STATS ==================== */}
        <section className="relative py-16 md:py-20 overflow-hidden" style={{ background: 'linear-gradient(to right, rgba(30,70,151,0.80), rgba(30,70,151,0.75))' }}>
          <div className="absolute inset-0 z-0">
            <Image src="/images/patients-happy.jpg" alt="Zufriedene Patienten" fill className="object-cover opacity-30" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {STATS.map((stat) => (
                <motion.div key={stat.label} variants={fadeUp} className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-white/80 text-sm md:text-base font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ==================== MORE SERVICES ==================== */}
        <Section className="bg-muted/30">
          <SectionHeading> Weitere zahnmedizinische Leistungen</SectionHeading>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MORE_SERVICES.map((service) => (
              <motion.div key={service.title} variants={fadeUp}>
                <div className="group flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm hover:shadow-md border border-transparent hover:border-primary/20 transition-all duration-300">
                  <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <service.icon className="size-6 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* ==================== TESTIMONIALS ==================== */}
        <Section id="bewertungen" className="bg-white">
          <SectionHeading>Was unsere Patienten sagen</SectionHeading>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {TESTIMONIALS.map((t) => (
              <motion.div key={t.name} variants={fadeUp}>
                <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-primary/5 to-white">
                  <CardContent className="p-6 lg:p-8 flex flex-col">
                    <Quote className="size-8 text-primary/30 mb-4" />
                    <p className="text-foreground/80 leading-relaxed flex-1 mb-6">&ldquo;{t.text}&rdquo;</p>
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">{t.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* ==================== LANGUAGES ==================== */}
        <Section id="sprachen" className="bg-gradient-to-b from-primary/6 to-transparent">
          <SectionHeading>Wir sprechen Ihre Sprache</SectionHeading>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto -mt-8 mb-12">Für eine angenehme und verständliche Kommunikation bieten wir Beratungen in mehreren Sprachen an.</p>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {LANGUAGES.map((lang) => (
              <motion.div key={lang.name} variants={fadeUp}>
                <div className="text-center bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow border border-primary/10 hover:border-primary/30">
                  <div className="mx-auto mb-4 flex justify-center">
                    <div className="rounded-full overflow-hidden shadow-md border-2 border-primary/10" style={{ width: 64, height: 42 }}>
                      <lang.Flag className="w-full h-full" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{lang.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{lang.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* ==================== CTA SECTION ==================== */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <Image src="/images/hero-clinic.png" alt="" fill className="object-cover opacity-30" />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/90 via-primary/85 to-[#2956B2]/90" />
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 relative">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp}>
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">Termin vereinbaren</h2>
                <p className="text-white/85 text-lg md:text-xl mb-10">Ihr Weg zu einem gesunden und strahlenden Lächeln beginnt hier. Vereinbaren Sie noch heute Ihren Termin.</p>
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2 text-base px-10 bg-cta text-white hover:bg-cta/90 font-semibold shadow-lg" onClick={() => scrollTo('#kontakt')}>
                  Termin vereinbaren <ChevronRight className="size-4" />
                </Button>
                <a href={PHONE_HREF}>
                  <Button size="lg" variant="outline" className="gap-2 text-base px-10 border-white/50 text-white hover:bg-white/10 hover:text-white font-semibold">
                    <Phone className="size-4" />Jetzt anrufen
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ==================== CONTACT ==================== */}
        <Section id="kontakt" className="bg-muted/30">
          <SectionHeading>Kontaktieren Sie uns</SectionHeading>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Contact Info */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="space-y-6">
              <motion.div variants={fadeUp}>
                <h3 className="text-2xl font-bold text-foreground mb-2">{CLINIC}</h3>
                <p className="text-muted-foreground leading-relaxed">Vereinbaren Sie noch heute Ihren Termin und lassen Sie sich von unserem erfahrenen Team persönlich beraten.</p>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-4">
                <div className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><MapPin className="size-5 text-primary" /></div>
                  <div><h4 className="font-semibold text-foreground text-sm">Adresse</h4><p className="text-sm text-muted-foreground">{ADDRESS}</p></div>
                </div>
                <div className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Phone className="size-5 text-primary" /></div>
                  <div><h4 className="font-semibold text-foreground text-sm">Telefon</h4><a href={PHONE_HREF} className="text-sm text-primary hover:underline">{PHONE}</a></div>
                </div>
                <div className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Mail className="size-5 text-primary" /></div>
                  <div><h4 className="font-semibold text-foreground text-sm">E-Mail</h4><a href="mailto:info@dentalpraxis-luisenplatz.de" className="text-sm text-primary hover:underline">info@dentalpraxis-luisenplatz.de</a></div>
                </div>
                <div className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Clock className="size-5 text-primary" /></div>
                  <div><h4 className="font-semibold text-foreground text-sm">Sprechzeiten</h4><p className="text-sm text-muted-foreground">Mo-Fr: 08:00 - 18:00<br />Sa: 09:00 - 13:00</p></div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={scaleIn}>
              <Card className="shadow-lg border-0">
                <CardContent className="p-6 lg:p-8">
                  <h3 className="text-xl font-bold text-foreground mb-6">Termin anfragen</h3>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Ihr Name" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="telefon">Telefon *</Label>
                      <Input id="telefon" type="tel" required value={formData.telefon} onChange={(e) => setFormData({ ...formData, telefon: e.target.value })} placeholder="Ihre Telefonnummer" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="email">E-Mail</Label>
                      <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Ihre E-Mail-Adresse" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="behandlung">Behandlungswunsch</Label>
                      <Select value={formData.behandlung} onValueChange={(v) => setFormData({ ...formData, behandlung: v })}>
                        <SelectTrigger className="mt-1"><SelectValue placeholder="Bitte wählen..." /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="zahnreinigung">Professionelle Zahnreinigung</SelectItem>
                          <SelectItem value="implantate">Zahnimplantate</SelectItem>
                          <SelectItem value="bleaching">Bleaching</SelectItem>
                          <SelectItem value="kronen">Kronen & Brücken</SelectItem>
                          <SelectItem value="zahnfleisch">Zahnfleischbehandlung</SelectItem>
                          <SelectItem value="sonstiges">Sonstiges</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="nachricht">Nachricht</Label>
                      <Textarea id="nachricht" value={formData.nachricht} onChange={(e) => setFormData({ ...formData, nachricht: e.target.value })} placeholder="Ihre Nachricht..." rows={4} className="mt-1" />
                    </div>
                    <Button type="submit" disabled={sent} className="w-full gap-2 bg-cta hover:bg-cta/90 text-white font-semibold">
                      {sent ? <><CheckCircle2 className="size-4" />WhatsApp wird geöffnet</> : <><Send className="size-4" />Anfrage senden</>}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </Section>
      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Col 1 */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <Image src="/images/logo.png" alt={CLINIC} width={36} height={36} className="rounded-md" />
                <h3 className="text-lg font-bold text-white">{CLINIC}</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-4">Moderne Zahnmedizin in Darmstadt für gesunde Zähne, ästhetische Ergebnisse und langfristige Zahngesundheit.</p>
              <a href={PHONE_HREF} className="inline-flex items-center gap-2 text-cta font-semibold text-sm hover:underline">
                <Phone className="size-4" />{PHONE}
              </a>
            </div>
            {/* Col 2 */}
            <div>
              <h4 className="font-bold mb-4 text-white/90">Schnellzugriff</h4>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}><button onClick={() => scrollTo(link.href)} className="text-sm text-white/60 hover:text-white transition-colors">{link.label}</button></li>
                ))}
                <li><button onClick={() => setImpressumOpen(true)} className="text-sm text-white/60 hover:text-white transition-colors">Impressum</button></li>
                <li><button onClick={() => setDatenschutzOpen(true)} className="text-sm text-white/60 hover:text-white transition-colors">Datenschutzerklärung</button></li>
              </ul>
            </div>
            {/* Col 3 */}
            <div>
              <h4 className="font-bold mb-4 text-white/90">Kontakt</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li className="flex items-start gap-2"><MapPin className="size-4 shrink-0 mt-0.5" />{ADDRESS}</li>
                <li className="flex items-center gap-2"><Phone className="size-4 shrink-0" /><a href={PHONE_HREF} className="hover:text-white">{PHONE}</a></li>
                <li className="flex items-center gap-2"><Mail className="size-4 shrink-0" /><a href="mailto:info@dentalpraxis-luisenplatz.de" className="hover:text-white">info@dentalpraxis-luisenplatz.de</a></li>
              </ul>
            </div>
          </div>

          <Separator className="my-8 bg-white/10" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <p>&copy; {new Date().getFullYear()} {CLINIC}. Alle Rechte vorbehalten.</p>
            <div className="flex gap-4">
              <button onClick={() => setImpressumOpen(true)} className="hover:text-white/60 transition-colors">Impressum</button>
              <button onClick={() => setDatenschutzOpen(true)} className="hover:text-white/60 transition-colors">Datenschutzerklärung</button>
            </div>
          </div>
        </div>
      </footer>

      {/* ==================== WHATSAPP FLOATING BUTTON ==================== */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={`https://wa.me/${PHONE.replace(/\D/g, '')}?text=Hallo%20Dentalpraxis%20am%20Luisenplatz%2C%20ich%20moechte%20einen%20Termin%20vereinbaren.%0A%0AMeine%20Daten%3A%0AName%3A%20%0ATelefon%3A%20${encodeURIComponent(PHONE)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Kontakt aufnehmen"
          className="group relative flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 hover:bg-[#128C7E] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 whatsapp-float"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-7 group-hover:scale-110 transition-transform"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M1.5 4.5h21v15h-21v-15Zm2.009 2.955 L4.5 16.5h15l.991-9.045H3.509ZM5 7v10h14V7H5Z" clipRule="evenodd" opacity="0.3"/>
            <path d="M13.41 12.051a1 1 0 0 1-1.004-.997L12.406 9.5a1 1 0 1 1 2 0v1.554a1 1 0 0 1-.996.997Zm3.586-3.543a1 1 0 0 1 1.408.287L16.5 9.6v6.4a1 1 0 0 1-1.994.055L14.5 13.5v-6.4l-1.5 1.5a1 1 0 0 1-1.354-1.487l2-1.833a1 1 0 0 1 1.354 0Z" />
          </svg>
        </a>
      </div>

      {/* ==================== LEGAL MODALS ==================== */}
      <Dialog open={impressumOpen} onOpenChange={setImpressumOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh]">
          <DialogHeader>
            <DialogTitle>Impressum</DialogTitle>
            <DialogDescription>Angaben gemäss Sect. 5 TMG</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4"><ImpressumContent /></ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={datenschutzOpen} onOpenChange={setDatenschutzOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh]">
          <DialogHeader>
            <DialogTitle>Datenschutzerklärung</DialogTitle>
            <DialogDescription>Informationen zum Datenschutz</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4"><DatenschutzContent /></ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
