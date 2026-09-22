import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Buildings,
  CaretDown,
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
  X,
} from "@phosphor-icons/react";
import "./index.css";
import { hexToRgbChannels, useSiteContent } from "./siteContent";

gsap.registerPlugin(ScrollTrigger);

const AdminPage = React.lazy(() => import("./Admin"));

const whatsappLink = (base, message) =>
  message ? `${base}?text=${encodeURIComponent(message)}` : base;

const contactOptions = (content) => [
  {
    name: "Operadora Talita",
    role: "Departamento de Seguros",
    phone: content.contact.whatsappTalitaLabel,
    whatsapp: content.contact.whatsappTalita,
  },
  {
    name: "Rodrigo Lobo",
    role: "Corretor responsável",
    phone: content.contact.whatsappLabel,
    whatsapp: content.contact.whatsapp,
  },
];

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

function ArrowLink({ href, onClick, children, tone = "accent", external = false }) {
  const tones = {
    accent: "border-accent bg-accent text-paper hover:bg-accentDark",
    ink: "border-ink bg-ink text-paper hover:bg-accent",
    outline: "border-paper/35 text-paper hover:border-accent hover:bg-accent",
  };

  const Component = onClick ? motion.button : motion.a;

  return (
    <Component
      href={onClick ? undefined : href}
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={`inline-flex min-h-12 items-center gap-3 border px-5 py-3 text-[0.72rem] font-bold uppercase tracking-[0.16em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${tones[tone]}`}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      <span>{children}</span>
      <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
    </Component>
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

function Header({ content, onQuote }) {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-30 border-b border-paper/10">
      <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-5 lg:px-10">
        <a
          href="#topo"
          className="flex min-h-11 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
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

        <button
          type="button"
          onClick={() => onQuote(content.hero.message)}
          className="inline-flex min-h-11 items-center gap-2 border border-accent bg-accent px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-paper transition-colors hover:bg-accentDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:px-4"
        >
          <WhatsappLogo size={16} weight="bold" aria-hidden="true" />
          <span className="hidden sm:inline">{content.hero.primaryCta}</span>
          <span className="sm:hidden">WhatsApp</span>
        </button>
      </div>
    </header>
  );
}

function Hero({ content, onQuote }) {
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
          className="hero-copy w-full max-w-[43rem] px-6 pb-24 pt-6 sm:p-8 lg:p-10"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.18, ease: revealEase }}
        >
          <p className="mb-5 flex items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-paper/65">
            <span className="h-px w-8 shrink-0 bg-accent" aria-hidden="true" />
            {content.hero.eyebrow}
          </p>
          <h1 className="text-balance font-display text-[clamp(2.75rem,12.7vw,5.8rem)] font-extrabold leading-[0.87] tracking-[-0.055em]">
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
            <ArrowLink onClick={() => onQuote(content.hero.message)}>
              {content.hero.primaryCta}
            </ArrowLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Insurers({ content }) {
  const groups = (content.insurers.groups || [])
    .map((group) => ({
      ...group,
      items: group.items.filter((name) => content.insurers.items.includes(name)),
    }))
    .filter((group) => group.items.length);
  const groupedInsurers = new Set(groups.flatMap((group) => group.items));
  const otherInsurers = content.insurers.items.filter((name) => !groupedInsurers.has(name));

  return (
    <section id="seguradoras" className="scroll-mt-20 border-y border-paper/10 bg-inkSoft text-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-20">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {content.insurers.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-paper/60">{content.insurers.description}</p>
        </Reveal>

        <div className="insurer-groups-grid mt-10">
          {groups.map((group, groupIndex) => (
            <Reveal key={group.label} className="insurer-group insurer-group--corporate" delay={0.1 + groupIndex * 0.06}>
              <div className="insurer-group-heading">
                <div>
                  <span className="insurer-group-kicker">Grupo empresarial</span>
                  <h3>{group.label}</h3>
                </div>
                <span className="insurer-group-count" aria-label={`${group.items.length} seguradoras`}>
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </div>
              <ul className="insurer-group-list">
                {group.items.map((name) => (
                  <li key={name} className="insurer-mark">
                    {name}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          {otherInsurers.length > 0 && <Reveal className="insurer-group insurer-group--market" delay={0.22}>
            <div className="insurer-group-heading">
              <div>
                <span className="insurer-group-kicker">Independentes</span>
                <h3>Outras parceiras</h3>
              </div>
              <span className="insurer-group-count" aria-label={`${otherInsurers.length} seguradoras`}>
                {String(otherInsurers.length).padStart(2, "0")}
              </span>
            </div>
            <ul className="insurer-group-list">
              {otherInsurers.map((name) => (
                <li key={name} className="insurer-mark">
                  {name}
                </li>
              ))}
            </ul>
          </Reveal>}
        </div>

        {content.insurers.note && (
          <p className="mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-paper/40">
            {content.insurers.note}
          </p>
        )}
      </div>
    </section>
  );
}

function Products({ content, onQuote }) {
  const { items } = content.products;
  const reduce = useReducedMotion();
  const [activeMobileProduct, setActiveMobileProduct] = useState(0);

  return (
    <section id="seguros" className="scroll-mt-20 bg-paper text-ink" aria-labelledby="seguros-title">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:py-24 lg:px-10 lg:py-28">
        <Reveal className="max-w-3xl">
          <SectionTitle id="seguros-title">{content.products.title}</SectionTitle>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/65">
            {content.products.description}
          </p>
        </Reveal>

        <div className="mt-10 space-y-2 md:hidden">
          {items.map((product, index) => {
            const Icon = productIcons[product.icon] || ShieldCheck;

            return (
              <details
                key={product.title}
                className="mobile-product"
                open={activeMobileProduct === index}
                onToggle={({ currentTarget }) => {
                  if (currentTarget.open) setActiveMobileProduct(index);
                  else if (activeMobileProduct === index) setActiveMobileProduct(null);
                }}
              >
                <summary className="flex min-h-20 cursor-pointer list-none items-center gap-4 px-5 py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                  <Icon size={28} weight="light" className="shrink-0 text-accent" aria-hidden="true" />
                  <span className="min-w-0 flex-1 font-display text-xl font-bold leading-tight tracking-tight">
                    {product.title}
                  </span>
                  <span className="text-[0.58rem] font-bold tracking-[0.16em] text-ink/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <CaretDown className="mobile-product-caret shrink-0 text-ink/55" size={18} weight="bold" aria-hidden="true" />
                </summary>
                <div className="border-t border-ink/12 px-5 pb-6 pt-5">
                  <p className="text-sm leading-relaxed text-ink/68">{product.description}</p>
                  <ul className="mt-5 grid grid-cols-1 gap-2 border-t border-ink/12 pt-5 text-sm text-ink/72">
                    {product.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check size={15} weight="bold" className="shrink-0 text-accent" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    type="button"
                    onClick={() => onQuote(product.message)}
                    className="mt-6 inline-flex min-h-11 items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    whileTap={{ scale: 0.98 }}
                  >
                    {content.products.ctaLabel}
                    <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                  </motion.button>
                </div>
              </details>
            );
          })}
        </div>

        <div className="mt-14 hidden grid-cols-1 gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
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
                    <motion.button
                      type="button"
                      onClick={() => onQuote(product.message)}
                      className={`inline-flex min-h-11 items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                        featured ? "text-paper" : "text-ink"
                      }`}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {content.products.ctaLabel}
                      <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                    </motion.button>
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

function FinalCta({ content, onQuote }) {
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
            <ArrowLink onClick={() => onQuote(content.finalCta.message)} tone="ink">
              {content.finalCta.button}
            </ArrowLink>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <ul className="space-y-4 border-t border-paper/30 pt-8 text-sm">
            {contactOptions(content).map((contact) => (
              <li key={contact.name} className="flex items-start gap-3">
                <Phone size={17} weight="bold" aria-hidden="true" />
                <span>
                  <span className="block font-semibold">{contact.name}</span>
                  <span className="block text-xs text-paper/65">{contact.role}</span>
                  <a className="mt-1 inline-block hover:underline" href={`tel:+55${contact.phone.replace(/\D/g, "")}`}>
                    {contact.phone}
                  </a>
                </span>
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

function Footer({ content, onQuote }) {
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
            <button
              type="button"
              onClick={() => onQuote(content.finalCta.message)}
              className="footer-link mt-4 inline-flex items-center gap-2"
            >
              <WhatsappLogo size={17} weight="bold" aria-hidden="true" /> WhatsApp
            </button>
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

function StickyWhatsApp({ content, onQuote }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('topo');
    if (!hero) return undefined;
    const observer = new IntersectionObserver(([entry]) => setShow(!entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={() => onQuote(content.finalCta.message)}
      className="sticky-whatsapp fixed left-4 right-4 z-20 flex min-h-14 items-center justify-center gap-3 bg-accent px-5 py-4 text-sm font-bold uppercase tracking-[0.15em] text-paper shadow-card transition-colors hover:bg-accentDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:hidden"
      aria-label="Pedir cotação no WhatsApp"
    >
      <WhatsappLogo size={20} weight="bold" aria-hidden="true" />
      {content.finalCta.button}
    </button>
  );
}

function ContactChooser({ content, request, onClose }) {
  const dialogRef = useRef(null);
  const firstOptionRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    if (request && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => firstOptionRef.current?.focus());
    } else if (!request && dialog.open) {
      dialog.close();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [request]);

  const close = () => {
    document.body.style.overflow = "";
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="contact-dialog"
      aria-labelledby="contact-dialog-title"
      aria-describedby="contact-dialog-description"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="contact-dialog-panel">
        <button
          type="button"
          className="contact-dialog-close"
          aria-label="Fechar escolha de atendimento"
          onClick={close}
        >
          <X size={20} weight="bold" aria-hidden="true" />
        </button>
        <p className="contact-dialog-kicker">Atendimento pelo WhatsApp</p>
        <h2 id="contact-dialog-title" className="contact-dialog-title">Com quem você quer falar?</h2>
        <p id="contact-dialog-description" className="contact-dialog-description">
          Escolha um responsável para continuar sua cotação.
        </p>
        <div className="contact-dialog-options">
          {contactOptions(content).map((contact, index) => (
            <a
              key={contact.name}
              ref={index === 0 ? firstOptionRef : undefined}
              className="contact-option"
              href={whatsappLink(contact.whatsapp, request?.message)}
              onClick={close}
            >
              <span className="contact-option-icon" aria-hidden="true">
                <WhatsappLogo size={22} weight="bold" />
              </span>
              <span className="min-w-0 flex-1">
                <strong className="contact-option-name">{contact.name}</strong>
                <span className="contact-option-role">{contact.role}</span>
                <span className="contact-option-phone">{contact.phone}</span>
              </span>
              <ArrowUpRight size={19} weight="bold" className="shrink-0" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </dialog>
  );
}

function App() {
  const content = useSiteContent();
  const [quoteRequest, setQuoteRequest] = useState(null);
  const quoteTriggerRef = useRef(null);
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

  const openQuote = (message) => {
    quoteTriggerRef.current = document.activeElement;
    setQuoteRequest({ message });
  };

  const closeQuote = () => {
    setQuoteRequest(null);
    requestAnimationFrame(() => quoteTriggerRef.current?.focus());
  };

  return (
    <div className="landing min-h-screen overflow-x-hidden bg-ink" style={themeStyle}>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header content={content} onQuote={openQuote} />
      <main id="conteudo">
        <Hero content={content} onQuote={openQuote} />
        <Insurers content={content} />
        <Products content={content} onQuote={openQuote} />
        <About content={content} />
        <Differences content={content} />
        {hasPublishedTestimonials && <Testimonials content={content} />}
        <FinalCta content={content} onQuote={openQuote} />
      </main>
      <Footer content={content} onQuote={openQuote} />
      <StickyWhatsApp content={content} onQuote={openQuote} />
      <ContactChooser content={content} request={quoteRequest} onClose={closeQuote} />
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
