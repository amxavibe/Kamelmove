import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Truck, Package, Users, Phone, Mail,
  CheckCircle, Star, Menu, X, Clock,
  ArrowRight, ChevronDown, ChevronUp, MapPin, Shield
} from 'lucide-react';

const WHATSAPP_NUMBER = '212601131360';

const IMAGES = {
  hero: '/Shipping_internationally_from_the_UK__1774898826429.jpeg',
  heroFade: '/hero-fade-bg.jpeg',
  service1: '/pack-move-truck.jpeg',
  service2: '/pack-move-service.jpeg',
  service3: '/c9e04fce-4147-444c-b566-ca19a7158c5c_1774898693515.jpeg',
  process: '/efb5cf1b-b19a-4c22-983d-648421bad11b_1774898693501.jpeg',
  logo: '/kamelmove-logo.png',
};

const services = [
  {
    title: 'Transport Seul',
    description: 'Vous emballez, nous transportons. Idéal pour les petits déménagements.',
    features: ['Camion adapté au volume', 'Chauffeur professionnel', 'Livraison soignée'],
    image: IMAGES.service1,
    icon: Truck,
  },
  {
    title: 'Pack & Move',
    description: 'Nous emballons et transportons vos biens avec soin et professionnalisme.',
    features: ['Fourniture de cartons', 'Protection du mobilier', 'Démontage/remontage'],
    image: IMAGES.service2,
    icon: Package,
    popular: true,
  },
  {
    title: 'Service Complet',
    description: 'La solution tout inclus avec équipe de déménageurs qualifiés.',
    features: ['Équipe de déménageurs', 'Packaging complet', 'Manutention lourde'],
    image: IMAGES.service3,
    icon: Users,
  },
];

const steps = [
  { num: '01', title: 'Demande de devis', desc: 'Remplissez notre formulaire en ligne ou appelez-nous.' },
  { num: '02', title: 'Visite & Estimation', desc: 'Nous venons évaluer le volume de votre déménagement.' },
  { num: '03', title: 'Préparation', desc: 'Notre équipe emballe et protège vos affaires.' },
  { num: '04', title: 'Livraison', desc: 'Transport sécurisé et installation dans votre nouveau logement.' },
];

const testimonials = [
  {
    name: 'Amal Benali',
    city: 'Casablanca',
    text: 'Équipe ponctuelle, soigneuse et sympathique. Prix respecté à la lettre. Je recommande vivement!',
    rating: 5,
  },
  {
    name: 'Youssef Alami',
    city: 'Rabat',
    text: 'Le packing était impeccable. Rien de cassé, tout parfaitement étiqueté. Service de qualité.',
    rating: 5,
  },
  {
    name: 'Sara Ouahbi',
    city: 'Marrakech',
    text: "Déménagement de notre bureau en un seul week-end. Zéro interruption d'activité. Merci!",
    rating: 5,
  },
];

const faqs = [
  {
    q: 'Quels sont les délais pour réserver un déménagement ?',
    a: "Nous recommandons de réserver au moins 1 à 2 semaines à l'avance, surtout en fin de mois et pendant les week-ends qui sont nos périodes les plus demandées.",
  },
  {
    q: 'Est-ce que vous fournissez les cartons et matériel d\'emballage ?',
    a: 'Oui, nous fournissons tous les matériels nécessaires : cartons de différentes tailles, papier bulle, film protecteur, ruban adhésif, et couvertures de protection pour le mobilier.',
  },
  {
    q: 'Mon mobilier est-il protégé pendant le transport ?',
    a: 'Absolument ! Nous utilisons des couvertures de protection, du film à bulles et des sangles de fixation pour garantir la sécurité de vos affaires tout au long du transport.',
  },
  {
    q: 'Comment est calculé le prix du déménagement ?',
    a: 'Le prix dépend de plusieurs facteurs : le volume à déplacer, la distance entre les deux adresses, le niveau de service choisi, et les accès (étage, ascenseur, etc.).',
  },
  {
    q: 'Intervenez-vous en dehors des grandes villes ?',
    a: "Oui, nous couvrons l'ensemble du territoire marocain, y compris les zones rurales. Nous trouvons une solution adaptée à vos besoins partout.",
  },
];

const cities = ['Casablanca', 'Marrakech', 'Rabat', 'Tanger', 'Fès', 'Agadir', 'Meknès', 'Oujda', 'Laâyoune', 'Tétouan'];

const NAV_LINKS: [string, string][] = [
  ['services', 'Services'],
  ['processus', 'Processus'],
  ['villes', 'Couverture'],
  ['avis', 'Avis'],
  ['faq', 'FAQ'],
  ['contact', 'Contact'],
];

function useScrollAnimation() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.animate-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    villeDepart: '', villeArrivee: '', date: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useScrollAnimation();

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Bonjour Kamelmove! 👋\n\nJe souhaite un devis pour mon déménagement:\n\n` +
      `👤 Nom: ${form.name}\n` +
      `📧 Email: ${form.email}\n` +
      `📞 Téléphone: ${form.phone || 'Non renseigné'}\n` +
      `🏙️ Ville de départ: ${form.villeDepart}\n` +
      `🏙️ Ville d'arrivée: ${form.villeArrivee}\n` +
      `📅 Date souhaitée: ${form.date || 'Non renseignée'}\n` +
      `📝 Détails: ${form.message}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    setSubmitted(true);
  };

  const updateForm = useCallback(<K extends keyof typeof form>(key: K, val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── NAVBAR ── */}
      <header>
        <nav
          className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm"
          aria-label="Navigation principale"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              <button
                className="flex items-center gap-2"
                onClick={() => scrollTo('hero')}
                aria-label="Retour en haut de page"
              >
                <img
                  src={IMAGES.logo}
                  alt="Logo Kamelmove"
                  className="h-14 w-14 object-contain"
                  width="56"
                  height="56"
                />
                <span
                  className="font-bold text-xl text-gray-900"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Kamelmove
                </span>
              </button>

              <div className="hidden lg:flex items-center gap-8" role="menubar">
                {NAV_LINKS.map(([id, label]) => (
                  <button
                    key={id}
                    role="menuitem"
                    onClick={() => scrollTo(id)}
                    className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm"
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="hidden lg:block">
                <button
                  onClick={() => scrollTo('contact')}
                  className="text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-all hover:opacity-90 shadow-md"
                  style={{ background: 'linear-gradient(135deg, #4A90C8, #2B6CA3)' }}
                  aria-label="Obtenir un devis gratuit"
                >
                  Obtenir un devis
                </button>
              </div>

              <button
                className="lg:hidden p-2 text-gray-600"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              >
                {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            className={`lg:hidden bg-white border-t border-gray-100 px-4 overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-80 py-4' : 'max-h-0'}`}
            aria-hidden={!menuOpen}
          >
            <div className="space-y-1">
              {NAV_LINKS.map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="block w-full text-left py-2.5 px-2 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* ── HERO ── */}
      <section
        id="hero"
        className="pt-16 lg:pt-20 min-h-screen flex items-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a4a6e 0%, #2B6CA3 40%, #4A90C8 70%, #6aaddb 100%)' }}
        aria-label="Section héro"
      >
        {/* Moroccan geometric pattern */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='none' stroke='%23D4A574' stroke-width='1'%3E%3Cpolygon points='60,5 72,35 105,35 80,55 90,85 60,65 30,85 40,55 15,35 48,35' opacity='0.8'/%3E%3Crect x='20' y='20' width='80' height='80' rx='2' opacity='0.3'/%3E%3Ccircle cx='60' cy='60' r='25' opacity='0.2'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px',
          }}
        />

        {/* Arch decorations */}
        <div
          className="absolute top-0 left-0 w-64 h-64 opacity-15 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cpath d='M0,200 Q100,0 200,200' fill='none' stroke='%23D4A574' stroke-width='2'/%3E%3Cpath d='M20,200 Q100,20 180,200' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3Ccircle cx='100' cy='80' r='15' fill='none' stroke='%23D4A574' stroke-width='1.5'/%3E%3C/svg%3E")`,
          }}
        />
        <div
          className="absolute top-0 right-0 w-64 h-64 opacity-15 pointer-events-none"
          aria-hidden="true"
          style={{
            transform: 'scaleX(-1)',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cpath d='M0,200 Q100,0 200,200' fill='none' stroke='%23D4A574' stroke-width='2'/%3E%3Cpath d='M20,200 Q100,20 180,200' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3Ccircle cx='100' cy='80' r='15' fill='none' stroke='%23D4A574' stroke-width='1.5'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Hero fade image */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, transparent 30%, rgba(0,0,0,0.6) 60%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 30%, rgba(0,0,0,0.6) 60%, black 100%)',
          }}
        >
          <img
            src={IMAGES.heroFade}
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center bottom' }}
            fetchPriority="high"
          />
        </div>

        {/* Sand dune bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 opacity-20 pointer-events-none"
          aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse 120% 100% at 50% 100%, #D4A574 0%, transparent 70%)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center w-full">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full mb-6">
              <span className="text-yellow-300 font-semibold text-sm">🌟 +600 déménagements réalisés</span>
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-white uppercase leading-none tracking-tight mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Déménagez<br />
              <span style={{ color: '#D4A574' }}>Sans Stress.</span>
            </h1>

            <p className="text-white/90 text-lg lg:text-xl mb-8 max-w-lg leading-relaxed">
              Déménagement maison &amp; bureau partout au Maroc. Devis rapide, équipe soigneuse et professionnelle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={() => scrollTo('contact')}
                className="flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 shadow-lg active:scale-95"
                style={{ background: '#D4A574', color: '#1a1a1a' }}
                aria-label="Demander un devis gratuit"
              >
                Devis Gratuit <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={() => scrollTo('services')}
                className="flex items-center justify-center gap-2 border-2 border-white/60 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all hover:bg-white/10"
                aria-label="Voir nos services"
              >
                Nos Services
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                { icon: <Clock className="h-4 w-4" aria-hidden="true" />, text: 'Service 7j/7' },
                { icon: <Shield className="h-4 w-4" aria-hidden="true" />, text: 'Équipe qualifiée' },
                { icon: <CheckCircle className="h-4 w-4" aria-hidden="true" />, text: 'Devis gratuit en 2h' },
              ].map(({ icon, text }) => (
                <span
                  key={text}
                  className="flex items-center gap-2 bg-white/15 backdrop-blur border border-white/25 px-4 py-2 rounded-full text-white text-sm font-medium"
                >
                  {icon} {text}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ height: '480px' }}>
              <img
                src={IMAGES.hero}
                alt="Camion de déménagement professionnel Kamelmove"
                className="w-full h-full object-cover"
                fetchPriority="high"
                width="640"
                height="480"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(26,74,110,0.4) 0%, transparent 60%)' }}
                aria-hidden="true"
              />
            </div>
            {/* Floating stats card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ background: '#4A90C8' }}>
                  <Truck className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-bold text-2xl text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>600+</div>
                  <div className="text-gray-500 text-sm">Déménagements réussis</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-12 px-4" style={{ background: '#D4A574' }} aria-label="Chiffres clés">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: '600+', label: 'Déménagements' },
            { val: '15+', label: 'Villes couvertes' },
            { val: '98%', label: 'Satisfaction client' },
            { val: '7j/7', label: 'Disponibilité' },
          ].map(({ val, label }) => (
            <div key={label}>
              <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {val}
              </div>
              <div className="text-white/80 text-sm font-medium">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50" aria-labelledby="services-title">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 animate-on-scroll">
            <h2
              id="services-title"
              className="text-4xl lg:text-5xl font-black text-gray-900 uppercase mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Trois Options.
            </h2>
            <p className="text-xl font-black uppercase" style={{ color: '#4A90C8', fontFamily: "'Montserrat', sans-serif" }}>
              Un Seul Objectif: Votre Satisfaction.
            </p>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Choisissez la formule qui correspond à vos besoins et à votre budget.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 stagger-children">
            {services.map((s) => (
              <article
                key={s.title}
                className="animate-on-scroll bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                style={s.popular ? { border: '4px solid #4A90C8' } : {}}
                aria-label={`Service: ${s.title}`}
              >
                {s.popular && (
                  <div className="text-white text-center py-2.5 font-bold text-sm tracking-wider" style={{ background: '#4A90C8' }}>
                    ⭐ PLUS POPULAIRE
                  </div>
                )}
                <div className="aspect-video overflow-hidden">
                  <img
                    src={s.image}
                    alt={`Service ${s.title} – déménagement professionnel`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="225"
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-xl flex items-center justify-center text-white" style={{ background: '#4A90C8' }}>
                      <s.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-gray-500 mb-5 text-sm leading-relaxed">{s.description}</p>
                  <ul className="space-y-2.5 mb-6" aria-label={`Inclus dans ${s.title}`}>
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: '#4A90C8' }} aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-gray-100">
                    <button
                      onClick={() => scrollTo('contact')}
                      className="w-full text-white px-4 py-3 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80 active:opacity-70"
                      style={{ background: '#D4A574' }}
                      aria-label={`Demander un devis pour ${s.title}`}
                    >
                      Demander un devis
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="processus" className="py-20 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="processus-title">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-on-scroll">
            <h2
              id="processus-title"
              className="text-4xl lg:text-5xl font-black text-gray-900 uppercase mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Comment ça marche ?
            </h2>
            <p className="text-gray-500 mb-10">Un processus simple, transparent et sans surprise.</p>

            <ol className="space-y-8">
              {steps.map((step, i) => (
                <li key={step.num} className="flex gap-5">
                  <div
                    className="flex-shrink-0 h-14 w-14 rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-md"
                    style={{ background: i % 2 === 0 ? '#4A90C8' : '#D4A574', fontFamily: "'Montserrat', sans-serif" }}
                    aria-hidden="true"
                  >
                    {step.num}
                  </div>
                  <div className="pt-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <button
              onClick={() => scrollTo('contact')}
              className="mt-10 flex items-center gap-2 text-white font-bold px-8 py-4 rounded-full transition-all hover:opacity-90 shadow-lg active:scale-95"
              style={{ background: 'linear-gradient(135deg, #4A90C8, #2B6CA3)' }}
              aria-label="Commencer votre déménagement"
            >
              Commencer maintenant <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="animate-on-scroll relative rounded-3xl overflow-hidden shadow-2xl h-96 lg:h-auto lg:aspect-square">
            <img
              src={IMAGES.process}
              alt="Équipe Kamelmove préparant un déménagement"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              width="640"
              height="640"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top right, rgba(74,144,200,0.3), transparent)' }}
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      {/* ── CITIES ── */}
      <section
        id="villes"
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ background: 'linear-gradient(135deg, #f0f7ff, #e8f4fd)' }}
        aria-labelledby="villes-title"
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-on-scroll">
            <h2
              id="villes-title"
              className="text-4xl lg:text-5xl font-black text-gray-900 uppercase mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Couverture
            </h2>
            <p className="text-xl font-bold uppercase mb-3" style={{ color: '#4A90C8', fontFamily: "'Montserrat', sans-serif" }}>
              Tout le Maroc
            </p>
            <p className="text-gray-500 mb-12 max-w-lg mx-auto">
              Nous intervenons dans toutes les grandes villes marocaines et les zones rurales.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-on-scroll stagger-children">
            {cities.map((city) => (
              <span
                key={city}
                className="flex items-center gap-2 bg-white border-2 px-5 py-3 rounded-full font-semibold text-gray-700 shadow-sm hover:shadow-md transition-shadow"
                style={{ borderColor: '#4A90C8' }}
              >
                <MapPin className="h-4 w-4" style={{ color: '#4A90C8' }} aria-hidden="true" />
                {city}
              </span>
            ))}
          </div>

          <div className="animate-on-scroll bg-white rounded-3xl p-8 shadow-lg inline-flex items-center gap-4">
            <Phone className="h-8 w-8" style={{ color: '#4A90C8' }} aria-hidden="true" />
            <div className="text-left">
              <div className="text-sm text-gray-500">Vous ne voyez pas votre ville ?</div>
              <div className="font-bold text-gray-900">
                Appelez-nous au{' '}
                <a href="tel:+212601131360" style={{ color: '#4A90C8' }}>+212 601 131 360</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="avis" className="py-20 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="avis-title">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 animate-on-scroll">
            <h2
              id="avis-title"
              className="text-4xl lg:text-5xl font-black text-gray-900 uppercase mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Ils nous font confiance
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Des centaines de familles et entreprises satisfaites à travers le Maroc.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 stagger-children">
            {testimonials.map((t) => (
              <article
                key={t.name}
                className="animate-on-scroll bg-gray-50 rounded-3xl p-7 hover:shadow-lg transition-shadow"
                aria-label={`Avis de ${t.name}`}
              >
                <div className="flex gap-1 mb-4" aria-label={`Note: ${t.rating} étoiles sur 5`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" style={{ color: '#D4A574' }} aria-hidden="true" />
                  ))}
                </div>
                <blockquote>
                  <p className="text-gray-700 leading-relaxed mb-6 italic">"{t.text}"</p>
                  <footer className="flex items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                      style={{ background: '#4A90C8' }}
                      aria-hidden="true"
                    >
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                      <div className="text-gray-400 text-xs flex items-center gap-1">
                        <MapPin className="h-3 w-3" aria-hidden="true" />{t.city}
                      </div>
                    </div>
                  </footer>
                </blockquote>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50" aria-labelledby="faq-title">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14 animate-on-scroll">
            <h2
              id="faq-title"
              className="text-4xl font-black text-gray-900 uppercase mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Questions fréquentes
            </h2>
            <p className="text-gray-500">Tout ce que vous devez savoir avant votre déménagement.</p>
          </div>

          <div className="space-y-4 animate-on-scroll" role="list">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm" role="listitem">
                <button
                  className="w-full flex items-center justify-between p-6 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span>{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="h-5 w-5 flex-shrink-0" style={{ color: '#4A90C8' }} aria-hidden="true" />
                    : <ChevronDown className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  }
                </button>
                <div
                  id={`faq-answer-${i}`}
                  className={`faq-answer ${openFaq === i ? 'open' : ''}`}
                  role="region"
                >
                  <div className="faq-answer-inner">
                    <p className="px-6 pb-6 text-gray-600 leading-relaxed text-sm border-t border-gray-50">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ background: 'linear-gradient(135deg, #1a4a6e, #4A90C8)' }}
        aria-labelledby="contact-title"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-on-scroll">
            <h2
              id="contact-title"
              className="text-4xl lg:text-5xl font-black text-white uppercase mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Prêt à déménager ?
            </h2>
            <p className="text-white/80 text-lg">Demandez votre devis gratuit. Réponse en moins de 2h.</p>
          </div>

          {submitted ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-2xl animate-on-scroll visible">
              <CheckCircle className="h-16 w-16 mx-auto mb-4" style={{ color: '#4A90C8' }} aria-hidden="true" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Message envoyé !
              </h3>
              <p className="text-gray-500">Notre équipe vous contactera dans les 2 heures. Merci de votre confiance.</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl animate-on-scroll">
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="form-name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Votre nom <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="form-name"
                      required
                      type="text"
                      placeholder="Mohammed Alami"
                      autoComplete="name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-gray-900"
                      style={{ '--tw-ring-color': '#4A90C8' } as React.CSSProperties}
                      value={form.name}
                      onChange={e => updateForm('name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="form-email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="form-email"
                      required
                      type="email"
                      placeholder="exemple@email.com"
                      autoComplete="email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                      style={{ '--tw-ring-color': '#4A90C8' } as React.CSSProperties}
                      value={form.email}
                      onChange={e => updateForm('email', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="form-phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    id="form-phone"
                    type="tel"
                    placeholder="+212 601 131 360"
                    autoComplete="tel"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': '#4A90C8' } as React.CSSProperties}
                    value={form.phone}
                    onChange={e => updateForm('phone', e.target.value)}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="form-depart" className="block text-sm font-semibold text-gray-700 mb-2">
                      Ville de départ <span aria-hidden="true">*</span>
                    </label>
                    <select
                      id="form-depart"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 bg-white text-gray-900 appearance-none cursor-pointer"
                      style={{ '--tw-ring-color': '#4A90C8' } as React.CSSProperties}
                      value={form.villeDepart}
                      onChange={e => updateForm('villeDepart', e.target.value)}
                    >
                      <option value="">Choisir une ville...</option>
                      {cities.map(c => <option key={c} value={c}>{c}</option>)}
                      <option value="Autre">Autre ville</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="form-arrivee" className="block text-sm font-semibold text-gray-700 mb-2">
                      Ville d'arrivée <span aria-hidden="true">*</span>
                    </label>
                    <select
                      id="form-arrivee"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 bg-white text-gray-900 appearance-none cursor-pointer"
                      style={{ '--tw-ring-color': '#4A90C8' } as React.CSSProperties}
                      value={form.villeArrivee}
                      onChange={e => updateForm('villeArrivee', e.target.value)}
                    >
                      <option value="">Choisir une ville...</option>
                      {cities.map(c => <option key={c} value={c}>{c}</option>)}
                      <option value="Autre">Autre ville</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="form-date" className="block text-sm font-semibold text-gray-700 mb-2">
                    📅 Date souhaitée du déménagement
                  </label>
                  <input
                    id="form-date"
                    type="date"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-gray-900"
                    style={{ '--tw-ring-color': '#4A90C8' } as React.CSSProperties}
                    value={form.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => updateForm('date', e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="form-message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Détails du déménagement <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="form-message"
                    required
                    rows={4}
                    placeholder="Volume approximatif, étage, ascenseur disponible, autres détails..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 resize-none"
                    style={{ '--tw-ring-color': '#4A90C8' } as React.CSSProperties}
                    value={form.message}
                    onChange={e => updateForm('message', e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white font-bold py-4 rounded-xl text-lg transition-all hover:opacity-90 shadow-lg active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #4A90C8, #2B6CA3)' }}
                >
                  📲 Envoyer via WhatsApp
                </button>
              </form>
            </div>
          )}

          {/* Contact info */}
          <address className="flex flex-col sm:flex-row justify-center gap-8 mt-10 text-white/80 text-sm not-italic">
            <a href="tel:+212601131360" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="h-4 w-4" aria-hidden="true" /> +212 601 131 360
            </a>
            <a href="mailto:contact@kamelmove.ma" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="h-4 w-4" aria-hidden="true" /> contact@kamelmove.ma
            </a>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" aria-hidden="true" /> Lun–Dim: 9h–18h
            </div>
          </address>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-4 text-center" style={{ background: '#1a1a1a' }}>
        <div className="flex items-center justify-center gap-2 mb-4">
          <img
            src={IMAGES.logo}
            alt="Logo Kamelmove"
            className="h-8 w-8 object-contain"
            loading="lazy"
            width="32"
            height="32"
          />
          <span className="font-bold text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>Kamelmove</span>
        </div>

        <nav className="flex items-center justify-center gap-5 mb-5" aria-label="Réseaux sociaux">
          <a
            href="https://instagram.com/kamelmove"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Kamelmove sur Instagram"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a
            href="https://facebook.com/kamelmovema"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Kamelmove sur Facebook"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a
            href="https://tiktok.com/@kamelmovema"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Kamelmove sur TikTok"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
            </svg>
          </a>
        </nav>

        <p className="text-gray-500 text-sm">
          © 2025 Kamelmove. Tous droits réservés. · Déménagement professionnel au Maroc.
        </p>
      </footer>
    </div>
  );
}
