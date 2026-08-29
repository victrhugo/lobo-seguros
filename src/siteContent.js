import { useEffect, useState } from "react";

export const STORAGE_KEY = "lobo-corretora:site-content:v1";

export const defaultSiteContent = {
  seo: {
    title: "Rodrigo Lobo | Lobo Corretora",
    description: "Rodrigo Lobo — imóveis, seguros e cafés especiais com atendimento direto e 20 anos de experiência.",
  },
  contact: {
    whatsapp: "https://wa.me/5512981797300",
    instagram: "https://www.instagram.com/rodrigollobo/",
    address: "Endereço em confirmação",
  },
  brand: {
    name: "LOBO",
    descriptor: "Corretora",
    fullName: "LOBO CORRETORA®",
    person: "Rodrigo Lobo",
  },
  navigation: [
    { label: "Seguros", href: "#seguros" },
    { label: "Imóveis", href: "#imoveis" },
    { label: "Café", href: "#cafe" },
    { label: "Sobre", href: "#sobre" },
  ],
  hero: {
    eyebrow: "LOBO CORRETORA® | 20 ANOS DE MERCADO",
    titleLines: ["Sonhos em imóveis.", "Segurança em tranquilidade.", "Café em paixão."],
    description: "Imóveis, seguros e cafés especiais com Rodrigo Lobo. Atendimento direto, conversa clara e 20 anos de experiência.",
    primaryCta: "Falar no WhatsApp",
    secondaryCta: "Ver as frentes",
    image: "https://picsum.photos/seed/rodrigo-lobo-office/1000/1200",
    imageAlt: "Imagem editorial temporária para representar um atendimento próximo",
    imageLabel: "Rodrigo Lobo",
    instagramLabel: "@rodrigollobo",
  },
  about: {
    years: 20,
    yearsLabel: "anos de mercado, presença e conversa olho no olho.",
    title: "Experiência que atende de verdade.",
    description: "Há 20 anos, Rodrigo acompanha decisões importantes de perto. Seguro, imóvel ou café, você fala com a mesma pessoa.",
    stats: [
      { value: "Direto", text: "Do primeiro contato ao fechamento." },
      { value: "[número]", text: "Clientes atendidos. Dado em confirmação.", placeholder: true },
      { value: "19,7 mil", text: "Seguidores no Instagram na referência consultada." },
    ],
  },
  pillars: {
    title: "Três frentes. Um só contato.",
    description: "O seguro vem primeiro. Os imóveis ampliam a conversa. O café mostra o que move Rodrigo por inteiro.",
    insurance: {
      badge: "Principal",
      title: "Seguros para proteger o que importa.",
      description: "Auto, vida, residencial e empresarial. Rodrigo entende o risco, explica as opções e indica o que faz sentido.",
      items: ["Auto", "Vida", "Residencial", "Empresarial"],
      cta: "Falar sobre seguro",
      message: "Olá, Rodrigo. Quero falar sobre seguro.",
      image: "https://picsum.photos/seed/insurance-road-safety/1400/1000",
      imageAlt: "Imagem editorial temporária para a frente de seguros",
    },
    property: {
      title: "Imóveis com espaço para o próximo passo.",
      description: "Terrenos, casas e galpão. Uma vitrine enxuta para quem quer comprar, vender ou alugar.",
      cta: "Ver imóveis",
      message: "Olá, Rodrigo. Quero falar sobre imóveis.",
      image: "https://picsum.photos/seed/campos-do-conde-house/1100/800",
      imageAlt: "Imagem editorial temporária para a frente de imóveis",
    },
    coffee: {
      title: "Lobos Coffee, café com identidade.",
      description: "A parte mais leve da marca. Para acompanhar ideias, encontros e o tempo certo.",
      cta: "Ver no Instagram",
      image: "https://picsum.photos/seed/lobos-coffee-cup/1100/800",
      imageAlt: "Imagem editorial temporária para Lobos Coffee",
    },
  },
  differences: {
    title: "Por que fechar com Rodrigo?",
    items: [
      { icon: "shield", title: "20 anos de prática", text: "Experiência para antecipar dúvidas e deixar a escolha mais simples." },
      { icon: "handshake", title: "Atendimento direto", text: "Você fala com Rodrigo. Sem fila, repasse ou conversa que não anda." },
      { icon: "users", title: "Várias frentes", text: "Seguro, imóvel e café no mesmo lugar, com a mesma responsabilidade." },
      { icon: "map", title: "Confiança local", text: "Presença próxima para entender a vida real de quem procura ajuda." },
    ],
  },
  testimonials: {
    title: "Quem conversa, recomenda.",
    description: "Estes textos são provisórios. A prova social real entra aqui assim que os clientes autorizarem o uso.",
    items: [
      { quote: "Fui atendido pelo Rodrigo do começo ao fim. Tudo explicado de forma simples.", author: "Texto provisório", role: "Cliente de seguros" },
      { quote: "A conversa foi rápida, clara e sem pressão. Era disso que eu precisava.", author: "Texto provisório", role: "Cliente de imóveis" },
      { quote: "Quando preciso resolver, sei para quem mandar mensagem.", author: "Texto provisório", role: "Cliente da região" },
    ],
  },
  finalCta: {
    title: "Quer resolver isso hoje?",
    description: "Me chama no WhatsApp. Você fala comigo e a gente encontra o próximo passo.",
    button: "Falar no WhatsApp",
  },
  footer: {
    description: "Imóveis, seguros e cafés especiais. Há 20 anos, tudo começa numa conversa.",
    contactTitle: "Contato",
    networksTitle: "Redes",
  },
  theme: {
    ink: "#15140F",
    inkSoft: "#211F18",
    paper: "#F4EFE4",
    paperDeep: "#E7DFD0",
    rust: "#B0472A",
    rustDark: "#88351F",
    moss: "#4A5A42",
  },
};

const isPlainObject = (value) => value && typeof value === "object" && !Array.isArray(value);

export function mergeWithDefaults(defaults, saved) {
  if (Array.isArray(defaults)) return Array.isArray(saved) ? saved : defaults;
  if (!isPlainObject(defaults)) return saved === undefined ? defaults : saved;

  return Object.fromEntries(
    Object.entries(defaults).map(([key, value]) => [
      key,
      mergeWithDefaults(value, isPlainObject(saved) ? saved[key] : undefined),
    ]),
  );
}

export function validateSiteContent(value) {
  if (!isPlainObject(value)) throw new Error("A configuração precisa ser um objeto JSON.");
  const merged = mergeWithDefaults(defaultSiteContent, value);
  if (!merged.seo.title.trim()) throw new Error("O título de SEO não pode ficar vazio.");
  if (!merged.contact.whatsapp.startsWith("https://")) throw new Error("O WhatsApp precisa ser uma URL HTTPS.");
  if (!merged.contact.instagram.startsWith("https://")) throw new Error("O Instagram precisa ser uma URL HTTPS.");
  if (!Number.isFinite(Number(merged.about.years)) || Number(merged.about.years) < 0) throw new Error("Anos de mercado precisa ser um número válido.");
  if (Object.values(merged.theme).some((color) => !/^#[0-9a-f]{6}$/i.test(color))) throw new Error("Todas as cores precisam usar o formato hexadecimal completo, como #B0472A.");
  return merged;
}

export function loadSiteContent() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? validateSiteContent(JSON.parse(saved)) : structuredClone(defaultSiteContent);
  } catch {
    return structuredClone(defaultSiteContent);
  }
}

export function saveSiteContent(content) {
  const validated = validateSiteContent(content);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
  window.dispatchEvent(new CustomEvent("lobo-site-content", { detail: validated }));
  return validated;
}

export function resetSiteContent() {
  window.localStorage.removeItem(STORAGE_KEY);
  const defaults = structuredClone(defaultSiteContent);
  window.dispatchEvent(new CustomEvent("lobo-site-content", { detail: defaults }));
  return defaults;
}

export function useSiteContent() {
  const [content, setContent] = useState(loadSiteContent);

  useEffect(() => {
    const refresh = (event) => setContent(event.detail || loadSiteContent());
    const sync = () => setContent(loadSiteContent());
    window.addEventListener("lobo-site-content", refresh);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("lobo-site-content", refresh);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return content;
}

export function hexToRgbChannels(hex) {
  const normalized = /^#[0-9a-f]{6}$/i.test(hex) ? hex.slice(1) : "15140F";
  return [0, 2, 4].map((offset) => parseInt(normalized.slice(offset, offset + 2), 16)).join(" ");
}
