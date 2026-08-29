import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Check,
  Coffee,
  Handshake,
  House,
  ImageSquare,
  InstagramLogo,
  MapPin,
  Phone,
  ShieldCheck,
  UsersThree,
} from "@phosphor-icons/react";
import AdminPage from "./Admin";
import "./index.css";
import { hexToRgbChannels, useSiteContent } from "./siteContent";

gsap.registerPlugin(ScrollTrigger);

const whatsappLink = (base, message) =>
  `${base}?text=${encodeURIComponent(message)}`;

const revealEase = [0.16, 1, 0.3, 1];

function Reveal({ children, className = "", delay = 0, amount = 0.22 }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, delay, ease: revealEase }}
    >
      {children}
    </motion.div>
  );
}

function ImagePlaceholder({ src, alt, className = "", eager = false }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`image-fallback ${className}`}
        data-placeholder="true"
        role="img"
        aria-label={`${alt}. Imagem temporária`}
      >
        <ImageSquare size={34} weight="light" aria-hidden="true" />
        <span>Imagem temporária</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      data-placeholder="true"
      loading={eager ? "eager" : "lazy"}
      onError={() => setFailed(true)}
    />
  );
}

function ArrowLink({ href, children, inverted = false, external = false }) {
  return (
    <motion.a
      href={href}
      className={`inline-flex min-h-12 items-center gap-3 border px-4 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust active:scale-[0.98] ${
        inverted
          ? "border-ink bg-ink text-paper hover:bg-rust hover:text-paper"
          : "border-paper/35 text-paper hover:border-rust hover:bg-rust"
      }`}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      <span>{children}</span>
      <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
    </motion.a>
  );
}

function MarketCounter({ value }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return undefined;

    const element = ref.current;
    const counter = { value: 0 };
    const context = gsap.context(() => {
      gsap.to(counter, {
        value,
        duration: 1.35,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 82%",
          once: true,
        },
        onUpdate: () => {
          element.textContent = String(Math.round(counter.value));
        },
      });
    }, element);

    return () => context.revert();
  }, [reduce, value]);

  return <span ref={ref}>{value}</span>;
}

function SectionTitle({ children, className = "", id }) {
  return (
    <h2
      id={id}
      className={`font-display text-4xl font-semibold leading-[0.95] tracking-tighter2 sm:text-5xl lg:text-7xl ${className}`}
    >
      {children}
    </h2>
  );
}

function Header({ content }) {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-30 border-b border-paper/10 bg-ink/95">
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 lg:px-10">
        <a
          href="#topo"
          className="flex items-center gap-3 text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust"
          aria-label="Lobo Corretora, voltar ao início"
        >
          <span className="font-display text-[1.45rem] font-semibold tracking-tight">
            {content.brand.name}
          </span>
          <span className="border-l border-paper/25 pl-3 text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-paper/60">
            {content.brand.descriptor}
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {content.navigation.map((item) => <a key={item.href} className="nav-link" href={item.href}>{item.label}</a>)}
        </nav>

        <a
          href={content.contact.whatsapp}
          className="inline-flex min-h-10 items-center gap-2 border border-rust bg-rust px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-paper transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust active:translate-y-px sm:px-4"
        >
          <Phone size={15} weight="bold" aria-hidden="true" />
          <span className="hidden sm:inline">{content.hero.primaryCta}</span>
          <span className="sm:hidden">WhatsApp</span>
        </a>
      </div>
    </header>
  );
}

function Hero({ content }) {
  return (
    <section id="topo" className="min-h-[100dvh] bg-ink pt-[72px] text-paper">
      <div className="mx-auto grid min-h-[calc(100dvh-72px)] max-w-[1400px] grid-cols-1 gap-10 px-5 pb-8 pt-14 sm:pt-16 lg:grid-cols-[1.18fr_0.82fr] lg:items-center lg:gap-12 lg:px-10 lg:pb-10 lg:pt-12">
        <motion.div
          className="flex max-w-3xl flex-col justify-center"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: revealEase }}
        >
          <p className="mb-6 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-paper/55">
            {content.hero.eyebrow}
          </p>
          <h1 className="max-w-4xl font-display text-[clamp(3.2rem,4.4vw,5.6rem)] font-semibold leading-[0.88] tracking-[-0.025em]">
            {content.hero.titleLines.map((line, index) => <span key={`${line}-${index}`} className={`block ${index === content.hero.titleLines.length - 1 ? "text-rust" : ""}`}>{line}</span>)}
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-paper/68 sm:text-lg">
            {content.hero.description}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <ArrowLink href={content.contact.whatsapp}>{content.hero.primaryCta}</ArrowLink>
            <a
              href="#seguros"
              className="inline-flex min-h-12 items-center gap-2 px-1 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-paper/70 transition-colors hover:text-rust focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust"
            >
              {content.hero.secondaryCta} <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        <Reveal className="lg:justify-self-end" delay={0.15} amount={0.1}>
          <figure className="hero-visual relative ml-auto w-full max-w-[560px]">
            <ImagePlaceholder
              src={content.hero.image}
              alt={content.hero.imageAlt}
              className="aspect-[0.84] w-full object-cover object-center"
              eager
            />
            <figcaption className="mt-4 flex items-center justify-between border-t border-paper/20 pt-3 text-[0.67rem] uppercase tracking-[0.18em] text-paper/48">
              <span>{content.hero.imageLabel}</span>
              <a className="transition-colors hover:text-rust" href={content.contact.instagram} target="_blank" rel="noreferrer">{content.hero.instagramLabel}</a>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

function About({ content }) {
  return (
    <section id="sobre" className="scroll-mt-20 bg-paper text-ink">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-5 py-20 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-10 lg:py-32">
        <Reveal>
          <div className="flex items-start gap-4">
            <span className="mt-3 h-3 w-3 shrink-0 bg-rust" aria-hidden="true" />
            <div>
              <p className="font-display text-[clamp(6rem,16vw,12rem)] font-semibold leading-[0.72] tracking-tighter2 text-rust">
                <MarketCounter value={Number(content.about.years)} />
              </p>
              <p className="mt-7 max-w-[13rem] text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ink/55">
                {content.about.yearsLabel}
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionTitle className="max-w-3xl">{content.about.title}</SectionTitle>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/65">
              {content.about.description}
            </p>
          </Reveal>

          <Reveal className="mt-14 grid grid-cols-1 border-t border-ink/20 sm:grid-cols-3" delay={0.12}>
            {content.about.stats.map((stat, index) => (
              <div key={`${stat.value}-${index}`} className="stat-block">
                <p className="font-display text-4xl font-semibold leading-none tracking-tight tabular-nums" data-placeholder={stat.placeholder || undefined}>{stat.value}</p>
                <p className="mt-3 max-w-[10rem] text-sm leading-relaxed text-ink/60">{stat.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PillarCard({ id, className, children }) {
  return (
    <motion.article
      id={id}
      className={`pillar-card relative overflow-hidden border border-paper/15 ${className}`}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      {children}
    </motion.article>
  );
}

function Pillars({ content }) {
  const { insurance, property, coffee } = content.pillars;
  return (
    <section className="scroll-mt-20 bg-ink text-paper" aria-labelledby="pilares-title">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:py-24 lg:px-10 lg:py-32">
        <Reveal>
          <SectionTitle id="pilares-title" className="max-w-3xl">{content.pillars.title}</SectionTitle>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/62">
            {content.pillars.description}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-[1.35fr_0.85fr] lg:grid-rows-2 lg:gap-5">
          <PillarCard id="seguros" className="row-span-2 min-h-[590px] bg-inkSoft p-6 sm:p-8 lg:min-h-[720px]">
            <ImagePlaceholder
              src={insurance.image}
              alt={insurance.imageAlt}
              className="absolute inset-0 h-full w-full object-cover opacity-38"
            />
            <div className="relative flex h-full min-h-[538px] flex-col justify-between lg:min-h-[668px]">
              <div className="flex items-center justify-between text-paper/72">
                <ShieldCheck size={42} weight="light" aria-hidden="true" />
                <span className="text-[0.68rem] font-bold uppercase tracking-[0.18em]">{insurance.badge}</span>
              </div>
              <div className="max-w-xl">
                <h3 className="font-display text-5xl font-semibold leading-[0.9] tracking-tighter2 sm:text-7xl">{insurance.title}</h3>
                <p className="mt-6 max-w-md text-base leading-relaxed text-paper/72">
                  {insurance.description}
                </p>
                <div className="mt-7 grid max-w-sm grid-cols-2 gap-x-6 gap-y-3 border-t border-paper/25 pt-4 text-sm text-paper/75">
                  {insurance.items.map((item) => (
                    <span key={item} className="flex items-center gap-2">
                      <Check size={16} weight="bold" className="text-rust" aria-hidden="true" />
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-8">
                  <ArrowLink href={whatsappLink(content.contact.whatsapp, insurance.message)}>{insurance.cta}</ArrowLink>
                </div>
              </div>
            </div>
          </PillarCard>

          <PillarCard id="imoveis" className="min-h-[350px] bg-paper p-6 text-ink sm:p-8">
            <ImagePlaceholder
              src={property.image}
              alt={property.imageAlt}
              className="absolute inset-0 h-full w-full object-cover opacity-24"
            />
            <div className="relative flex h-full min-h-[298px] flex-col justify-between">
              <House size={38} weight="light" aria-hidden="true" />
              <div>
                <h3 className="font-display text-5xl font-semibold leading-[0.9] tracking-tighter2">{property.title}</h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/62">
                  {property.description}
                </p>
                <div className="mt-6">
                  <motion.a
                    href={whatsappLink(content.contact.whatsapp, property.message)}
                    className="inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:text-rust focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {property.cta} <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
                  </motion.a>
                </div>
              </div>
            </div>
          </PillarCard>

          <PillarCard id="cafe" className="min-h-[350px] bg-moss p-6 text-paper sm:p-8">
            <ImagePlaceholder
              src={coffee.image}
              alt={coffee.imageAlt}
              className="absolute inset-0 h-full w-full object-cover opacity-22 mix-blend-multiply"
            />
            <div className="relative flex h-full min-h-[298px] flex-col justify-between">
              <Coffee size={38} weight="light" aria-hidden="true" />
              <div>
                <h3 className="font-display text-5xl font-semibold leading-[0.9] tracking-tighter2">{coffee.title}</h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/72">
                  {coffee.description}
                </p>
                <div className="mt-6">
                  <motion.a
                    href={content.contact.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-paper transition-colors hover:text-rust focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {coffee.cta} <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
                  </motion.a>
                </div>
              </div>
            </div>
          </PillarCard>
        </div>
      </div>
    </section>
  );
}

const differenceIcons = {
  shield: ShieldCheck,
  handshake: Handshake,
  users: UsersThree,
  map: MapPin,
};

function Differences({ content }) {
  return (
    <section id="diferenciais" className="scroll-mt-20 bg-paper text-ink" aria-labelledby="differences-title">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:py-24 lg:px-10 lg:py-32">
        <Reveal>
          <SectionTitle id="differences-title" className="max-w-4xl">{content.differences.title}</SectionTitle>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-10 border-t border-ink/20 pt-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {content.differences.items.map(({ icon, title, text }, index) => {
            const Icon = differenceIcons[icon] || ShieldCheck;
            return (
            <Reveal key={title} delay={index * 0.08}>
              <article className="border-b border-ink/20 pb-8 pt-8 lg:min-h-[240px] lg:border-b-0 lg:border-r lg:pr-6">
                <Icon size={32} weight="light" className="text-rust" aria-hidden="true" />
                <h3 className="mt-8 font-display text-3xl font-semibold leading-none tracking-tight">{title}</h3>
                <p className="mt-4 max-w-[18rem] text-sm leading-relaxed text-ink/62">{text}</p>
              </article>
            </Reveal>
          );})}
        </div>
      </div>
    </section>
  );
}

function Testimonials({ content }) {
  const [featured, ...secondary] = content.testimonials.items;
  return (
    <section id="depoimentos" className="scroll-mt-20 bg-ink text-paper" aria-labelledby="testimonials-title">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:py-24 lg:px-10 lg:py-32">
        <Reveal>
          <SectionTitle id="testimonials-title" className="max-w-3xl">{content.testimonials.title}</SectionTitle>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-paper/60">
            {content.testimonials.description}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className="flex min-h-[370px] flex-col justify-between border border-paper/18 bg-inkSoft p-7 sm:p-10" delay={0.1}>
            <span className="font-display text-7xl leading-none text-rust" aria-hidden="true">“</span>
            <div>
              {featured ? <>
                <blockquote className="max-w-2xl font-display text-4xl font-semibold leading-[0.98] tracking-tight sm:text-5xl">“{featured.quote}”</blockquote>
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-paper/48">{featured.author} <span className="mx-2 text-rust">|</span> {featured.role}</p>
              </> : <p className="text-paper/55">Nenhum depoimento cadastrado.</p>}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5">
            {secondary.map((item, index) => (
              <Reveal key={item.role} className="border border-paper/18 p-7 sm:p-8" delay={0.18 + index * 0.1}>
                <blockquote className="max-w-md font-display text-3xl font-semibold leading-[0.98] tracking-tight">
                  “{item.quote}”
                </blockquote>
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-paper/48">
                  {item.author} <span className="mx-2 text-rust">|</span> {item.role}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCta({ content }) {
  return (
    <section id="contato" className="scroll-mt-20 bg-rust text-paper" aria-labelledby="cta-title">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-10 px-5 py-20 sm:py-24 lg:flex-row lg:items-end lg:px-10 lg:py-28">
        <Reveal>
          <SectionTitle id="cta-title" className="max-w-3xl">{content.finalCta.title}</SectionTitle>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/80">
            {content.finalCta.description}
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <ArrowLink href={content.contact.whatsapp} inverted>{content.finalCta.button}</ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}

function Footer({ content }) {
  return (
    <footer className="bg-ink text-paper" aria-label="Rodapé">
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:py-14 lg:px-10">
        <div className="grid grid-cols-1 gap-12 border-b border-paper/15 pb-12 md:grid-cols-[1fr_auto_auto] md:gap-16">
          <div>
            <p className="font-display text-4xl font-semibold tracking-tighter2">{content.brand.fullName}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/55">
              {content.footer.description}
            </p>
          </div>
          <div>
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-paper/42">{content.footer.contactTitle}</p>
            <a className="footer-link mt-4 inline-flex items-center gap-2" href={content.contact.whatsapp}>
              <Phone size={17} weight="bold" aria-hidden="true" /> WhatsApp
            </a>
            <p className="mt-3 text-sm text-paper/48" data-placeholder="true">{content.contact.address}</p>
          </div>
          <div>
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-paper/42">{content.footer.networksTitle}</p>
            <a className="footer-link mt-4 inline-flex items-center gap-2" href={content.contact.instagram} target="_blank" rel="noreferrer">
              <InstagramLogo size={17} weight="bold" aria-hidden="true" /> Instagram
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-[0.66rem] uppercase tracking-[0.16em] text-paper/35 sm:flex-row sm:items-center sm:justify-between">
          <span>{content.brand.person}</span>
          <span>{content.brand.fullName}</span>
        </div>
      </div>
    </footer>
  );
}

function StickyWhatsApp({ content }) {
  return (
    <a
      href={content.contact.whatsapp}
      className="fixed bottom-4 left-4 right-4 z-20 flex min-h-14 items-center justify-center gap-3 bg-rust px-5 py-4 text-sm font-bold uppercase tracking-[0.15em] text-paper shadow-paper transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust active:translate-y-px md:hidden"
      aria-label="Falar no WhatsApp com Rodrigo Lobo"
    >
      <Phone size={20} weight="bold" aria-hidden="true" />
      {content.hero.primaryCta}
    </a>
  );
}

function App() {
  const content = useSiteContent();

  useEffect(() => {
    document.title = content.seo.title;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", content.seo.description);
  }, [content.seo]);

  const themeStyle = Object.fromEntries(
    Object.entries(content.theme).map(([key, value]) => [`--color-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`, hexToRgbChannels(value)]),
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink" style={themeStyle}>
      <Header content={content} />
      <main>
        <Hero content={content} />
        <About content={content} />
        <Pillars content={content} />
        <Differences content={content} />
        <Testimonials content={content} />
        <FinalCta content={content} />
      </main>
      <Footer content={content} />
      <StickyWhatsApp content={content} />
    </div>
  );
}

const isAdminRoute = window.location.pathname.replace(/\/+$/, "") === "/admin";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {isAdminRoute ? <AdminPage /> : <App />}
  </React.StrictMode>,
);
