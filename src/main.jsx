import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Buildings,
  Car,
  Check,
  Clock,
  EnvelopeSimple,
  Gear,
  Handshake,
  Heartbeat,
  House,
  InstagramLogo,
  Key,
  MapPin,
  Phone,
  ShieldCheck,
  WhatsappLogo,
} from "@phosphor-icons/react";
import "./index.css";
import { hexToRgbChannels, useSiteContent } from "./siteContent";

gsap.registerPlugin(ScrollTrigger);

const AdminPage = React.lazy(() => import("./Admin"));

const whatsappLink = (base, message) =>
  message ? `${base}?text=${encodeURIComponent(message)}` : base;

const revealEase = [0.16, 1, 0.3, 1];

const productIcons = {
  car: Car,
  house: House,
  health: Heartbeat,
  building: Buildings,
  gear: Gear,
  key: Key,
};

const differenceIcons = {
  shield: ShieldCheck,
  clock: Clock,
  handshake: Handshake,
  map: MapPin,
};

function Reveal({ children, className = "", delay = 0, amount = 0.2 }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.65, delay, ease: revealEase }}
    >
      {children}
    </motion.div>
  );
}

function ArrowLink({ href, children, tone = "accent", external = false }) {
  const tones = {
    accent: "border-accent bg-accent text-paper hover:bg-accentDark",
    ink: "border-ink bg-ink text-paper hover:bg-accent",
    outline: "border-paper/35 text-paper hover:border-accent hover:bg-accent",
  };

  return (
    <motion.a
      href={href}
      className={`inline-flex min-h-12 items-center gap-3 border px-5 py-3 text-[0.72rem] font-bold uppercase tracking-[0.16em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${tones[tone]}`}
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
        duration: 1.3,
        ease: "power2.out",
        scrollTrigger: { trigger: element, start: "top 82%", once: true },
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
      className={`font-display text-4xl font-bold leading-[0.95] tracking-tighter2 sm:text-5xl lg:text-6xl ${className}`}
    >
      {children}
    </h2>
  );
}

function Header({ content }) {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-30 border-b border-paper/10">
      <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-5 lg:px-10">
        <a
          href="#topo"
          className="flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          aria-label={`${content.brand.fullName}, voltar ao início`}
        >
          <img
            src={content.brand.logoLight}
            alt={content.brand.fullName}
            className="h-9 w-auto sm:h-10"
            width="1015"
            height="341"
          />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {content.navigation.map((item) => (
            <a key={item.href} className="nav-link" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={whatsappLink(content.contact.whatsapp, content.hero.message)}
          className="inline-flex min-h-10 items-center gap-2 border border-accent bg-accent px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-paper transition-colors hover:bg-accentDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:px-4"
        >
          <WhatsappLogo size={16} weight="bold" aria-hidden="true" />
          <span className="hidden sm:inline">{content.hero.primaryCta}</span>
          <span className="sm:hidden">WhatsApp</span>
        </a>
      </div>
    </header>
  );
}

function Hero({ content }) {
  const reduce = useReducedMotion();

  return (
    <section id="topo" className="hero-section relative min-h-[100svh] overflow-hidden bg-ink pt-[76px] text-paper">
      <motion.div
          className="hero-cover absolute inset-x-0 bottom-0 top-[76px] overflow-hidden"
          initial={reduce ? false : { opacity: 0, scale: 1.025 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.15, delay: 0.08, ease: revealEase }}
        >
          <img
            src={content.hero.image}
            alt={content.hero.imageAlt}
            className="absolute inset-0 h-full w-full object-cover object-[62%_center] lg:object-center"
            width="1536"
            height="1024"
            fetchpriority="high"
            data-placeholder="true"
          />
          <div className="hero-cover-tint absolute inset-0" aria-hidden="true" />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-76px)] max-w-[1600px] items-end px-4 pb-4 pt-24 sm:px-8 sm:pb-8 lg:px-10 lg:pb-10 xl:px-20">
        <motion.div
          className="hero-copy w-full max-w-[43rem] px-6 pb-20 pt-6 sm:p-8 lg:p-10"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.18, ease: revealEase }}
        >
          <p className="mb-5 flex items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-paper/65">
            <span className="h-px w-8 shrink-0 bg-accent" aria-hidden="true" />
            {content.hero.eyebrow}
          </p>
          <h1 className="text-balance font-display text-[clamp(3.1rem,7vw,5.8rem)] font-extrabold leading-[0.87] tracking-[-0.055em]">
            {content.hero.titleLines.map((line, index) => (
              <span key={`${line}-${index}`} className={`block ${index === 1 ? "text-accent" : ""}`}>
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-5 max-w-[31rem] text-pretty text-sm leading-relaxed text-paper/78 sm:text-base">
            {content.hero.description}
          </p>
          <div className="mt-7 hidden sm:block">
            <ArrowLink href={whatsappLink(content.contact.whatsapp, content.hero.message)}>
              {content.hero.primaryCta}
            </ArrowLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Insurers({ content }) {
  return (
    <section id="seguradoras" className="scroll-mt-20 border-y border-paper/10 bg-inkSoft text-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-20">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {content.insurers.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-paper/60">{content.insurers.description}</p>
        </Reveal>

        <Reveal className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7" delay={0.1}>
          {content.insurers.items.map((name) => (
            <span key={name} className="insurer-mark">
              {name}
            </span>
          ))}
        </Reveal>

        {content.insurers.note && (
          <p className="mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-paper/40">
            {content.insurers.note}
          </p>
        )}
      </div>
    </section>
  );
}

function Products({ content }) {
  const { items } = content.products;
  const reduce = useReducedMotion();

  return (
    <section id="seguros" className="scroll-mt-20 bg-paper text-ink" aria-labelledby="seguros-title">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:py-24 lg:px-10 lg:py-28">
        <Reveal className="max-w-3xl">
          <SectionTitle id="seguros-title">{content.products.title}</SectionTitle>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/65">
            {content.products.description}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((product, index) => {
            const Icon = productIcons[product.icon] || ShieldCheck;
            const featured = Boolean(product.featured);

            return (
              <Reveal
                key={product.title}
                delay={Math.min(index, 3) * 0.07}
                className={featured ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""}
              >
                <motion.article
                  className={`product-card flex h-full flex-col justify-between border p-6 sm:p-7 ${
                    featured ? "border-ink bg-ink text-paper" : "border-ink/18 bg-paperDeep/45"
                  }`}
                  whileHover={reduce ? undefined : { y: -5 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <Icon
                        size={34}
                        weight="light"
                        className={featured ? "text-accent" : "text-ink/70"}
                        aria-hidden="true"
                      />
                      <span
                        className={`text-[0.6rem] font-bold uppercase tracking-[0.18em] ${
                          featured ? "text-paper/50" : "text-ink/35"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3
                      className={`mt-8 font-display font-bold leading-[0.95] tracking-tighter2 ${
                        featured ? "text-4xl sm:text-5xl" : "text-3xl"
                      }`}
                    >
                      {product.title}
                    </h3>
                    <p
                      className={`mt-4 max-w-md text-sm leading-relaxed ${
                        featured ? "text-paper/70" : "text-ink/62"
                      }`}
                    >
                      {product.description}
                    </p>
                    <ul
                      className={`mt-6 grid grid-cols-1 gap-x-6 gap-y-2 border-t pt-5 text-sm sm:grid-cols-2 ${
                        featured ? "border-paper/20 text-paper/75" : "border-ink/15 text-ink/70"
                      }`}
                    >
                      {product.items.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <Check size={15} weight="bold" className="shrink-0 text-accent" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <motion.a
                      href={whatsappLink(content.contact.whatsapp, product.message)}
                      className={`inline-flex min-h-11 items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                        featured ? "text-paper" : "text-ink"
                      }`}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {content.products.ctaLabel}
                      <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                    </motion.a>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function About({ content }) {
  return (
    <section id="empresa" className="scroll-mt-20 bg-paperDeep text-ink">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-5 py-20 sm:py-24 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="flex items-start gap-4">
            <span className="mt-3 h-3 w-3 shrink-0 bg-accent" aria-hidden="true" />
            <div>
              <p className="font-display text-[clamp(5.5rem,15vw,11rem)] font-extrabold leading-[0.72] tracking-tighter2 text-ink">
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
            <SectionTitle className="max-w-2xl">{content.about.title}</SectionTitle>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink/68">
              {content.about.description}
            </p>
            <p className="mt-6 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-accent">
              {content.about.signature}
            </p>
          </Reveal>

          <Reveal className="mt-14 grid grid-cols-1 border-t border-ink/18 sm:grid-cols-3" delay={0.12}>
            {content.about.stats.map((stat, index) => (
              <div key={`${stat.value}-${index}`} className="stat-block">
                <p
                  className="font-display text-3xl font-bold leading-none tracking-tight tabular-nums"
                  data-placeholder={stat.placeholder || undefined}
                >
                  {stat.value}
                </p>
                <p className="mt-3 max-w-[12rem] text-sm leading-relaxed text-ink/60">{stat.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Differences({ content }) {
  return (
    <section id="diferenciais" className="scroll-mt-20 bg-ink text-paper" aria-labelledby="differences-title">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <SectionTitle id="differences-title" className="max-w-3xl">
            {content.differences.title}
          </SectionTitle>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-10 border-t border-paper/18 pt-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {content.differences.items.map(({ icon, title, text }, index) => {
            const Icon = differenceIcons[icon] || ShieldCheck;
            return (
              <Reveal key={title} delay={index * 0.08}>
                <article className="border-b border-paper/15 pb-8 pt-8 lg:min-h-[240px] lg:border-b-0 lg:border-r lg:pr-6">
                  <Icon size={30} weight="light" className="text-accent" aria-hidden="true" />
                  <h3 className="mt-8 font-display text-2xl font-bold leading-none tracking-tight">{title}</h3>
                  <p className="mt-4 max-w-[18rem] text-sm leading-relaxed text-paper/62">{text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Testimonials({ content }) {
  const [featured, ...secondary] = content.testimonials.items;

  return (
    <section id="depoimentos" className="scroll-mt-20 bg-paper text-ink" aria-labelledby="testimonials-title">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <SectionTitle id="testimonials-title" className="max-w-3xl">
            {content.testimonials.title}
          </SectionTitle>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/60">
            {content.testimonials.description}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal className="flex min-h-[340px] flex-col justify-between border border-ink/18 bg-paperDeep/45 p-7 sm:p-9" delay={0.1}>
            <span className="font-display text-6xl leading-none text-accent" aria-hidden="true">
              “
            </span>
            <div>
              {featured ? (
                <>
                  <blockquote className="max-w-2xl font-display text-3xl font-bold leading-[1] tracking-tight sm:text-4xl">
                    “{featured.quote}”
                  </blockquote>
                  <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-ink/45">
                    {featured.author} <span className="mx-2 text-accent">|</span> {featured.role}
                  </p>
                </>
              ) : (
                <p className="text-ink/55">Nenhum depoimento cadastrado.</p>
              )}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-4">
            {secondary.map((item, index) => (
              <Reveal
                key={`${item.role}-${index}`}
                className="border border-ink/18 p-7 sm:p-8"
                delay={0.18 + index * 0.1}
              >
                <blockquote className="max-w-md font-display text-2xl font-bold leading-[1.05] tracking-tight">
                  “{item.quote}”
                </blockquote>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-ink/45">
                  {item.author} <span className="mx-2 text-accent">|</span> {item.role}
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
    <section id="contato" className="scroll-mt-20 bg-accent text-paper" aria-labelledby="cta-title">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-5 py-20 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:px-10 lg:py-24">
        <Reveal>
          <SectionTitle id="cta-title" className="max-w-2xl">
            {content.finalCta.title}
          </SectionTitle>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/85">
            {content.finalCta.description}
          </p>
          <div className="mt-9">
            <ArrowLink href={whatsappLink(content.contact.whatsapp, content.finalCta.message)} tone="ink">
              {content.finalCta.button}
            </ArrowLink>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <ul className="space-y-4 border-t border-paper/30 pt-8 text-sm">
            {content.contact.phones.map((phone) => (
              <li key={phone} className="flex items-center gap-3">
                <Phone size={17} weight="bold" aria-hidden="true" />
                <a className="hover:underline" href={`tel:+55${phone.replace(/\D/g, "")}`}>
                  {phone}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-3">
              <EnvelopeSimple size={17} weight="bold" aria-hidden="true" />
              <a className="hover:underline" href={`mailto:${content.contact.email}`}>
                {content.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={17} weight="bold" className="mt-0.5 shrink-0" aria-hidden="true" />
              <span>{content.contact.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock size={17} weight="bold" className="mt-0.5 shrink-0" aria-hidden="true" />
              <span>{content.contact.hours}</span>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function Footer({ content }) {
  return (
    <footer className="bg-ink pb-24 text-paper md:pb-0" aria-label="Rodapé">
      <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-10">
        <div className="grid grid-cols-1 gap-12 border-b border-paper/15 pb-12 md:grid-cols-[1.2fr_auto_auto_auto] md:gap-14">
          <div>
            <img
              src={content.brand.logoLight}
              alt={content.brand.fullName}
              className="h-11 w-auto"
              width="1015"
              height="341"
              loading="lazy"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/55">{content.footer.description}</p>
          </div>
          <div>
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-paper/42">
              {content.footer.contactTitle}
            </p>
            <a
              className="footer-link mt-4 inline-flex items-center gap-2"
              href={whatsappLink(content.contact.whatsapp, content.finalCta.message)}
            >
              <WhatsappLogo size={17} weight="bold" aria-hidden="true" /> WhatsApp
            </a>
            <a className="footer-link mt-3 flex items-center gap-2" href={`mailto:${content.contact.email}`}>
              <EnvelopeSimple size={17} weight="bold" aria-hidden="true" /> E-mail
            </a>
          </div>
          <div>
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-paper/42">
              {content.footer.officeTitle}
            </p>
            <p className="mt-4 max-w-[15rem] text-sm leading-relaxed text-paper/55">{content.contact.address}</p>
            <p className="mt-3 max-w-[15rem] text-sm leading-relaxed text-paper/55">{content.contact.hours}</p>
          </div>
          <div>
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-paper/42">
              {content.footer.networksTitle}
            </p>
            <a
              className="footer-link mt-4 inline-flex items-center gap-2"
              href={content.contact.instagram}
              target="_blank"
              rel="noreferrer"
            >
              <InstagramLogo size={17} weight="bold" aria-hidden="true" /> {content.contact.instagramLabel}
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
      href={whatsappLink(content.contact.whatsapp, content.finalCta.message)}
      className="fixed bottom-4 left-4 right-4 z-20 flex min-h-14 items-center justify-center gap-3 bg-accent px-5 py-4 text-sm font-bold uppercase tracking-[0.15em] text-paper shadow-card transition-colors hover:bg-accentDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:hidden"
      aria-label="Pedir cotação no WhatsApp"
    >
      <WhatsappLogo size={20} weight="bold" aria-hidden="true" />
      {content.finalCta.button}
    </a>
  );
}

function App() {
  const content = useSiteContent();
  const hasPublishedTestimonials = content.testimonials.items.some(
    (item) => item.author.trim().toLowerCase() !== "texto provisório",
  );

  useEffect(() => {
    document.title = content.seo.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", content.seo.description);
  }, [content.seo]);

  const themeStyle = Object.fromEntries(
    Object.entries(content.theme).map(([key, value]) => [
      `--color-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`,
      hexToRgbChannels(value),
    ]),
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink" style={themeStyle}>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header content={content} />
      <main id="conteudo">
        <Hero content={content} />
        <Insurers content={content} />
        <Products content={content} />
        <About content={content} />
        <Differences content={content} />
        {hasPublishedTestimonials && <Testimonials content={content} />}
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
    {isAdminRoute ? (
      <React.Suspense fallback={<div className="min-h-screen bg-ink" />}>
        <AdminPage />
      </React.Suspense>
    ) : (
      <App />
    )}
  </React.StrictMode>,
);
