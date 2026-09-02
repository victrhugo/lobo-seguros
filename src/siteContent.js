import { useEffect, useState } from "react";

export const STORAGE_KEY = "lobo-seguros:site-content:v1";

export const defaultSiteContent = {
  seo: {
    title: "Lobo Corretora Seguros | Taubaté-SP",
    description:
      "Corretora de seguros em Taubaté-SP. Auto, residencial, saúde, empresarial, máquinas e fiança locatícia cotados nas maiores seguradoras do país.",
  },
  contact: {
    // Número principal de conversão. O perfil do Instagram exibe (12) 97401-2733;
    // confirmar com o Rodrigo qual deve receber os leads do site.
    whatsapp: "https://wa.me/5512981797300",
    whatsappLabel: "(12) 98179-7300",
    phones: ["(12) 3622-2860", "(12) 98179-7300", "(12) 97600-1191"],
    email: "rodrigo@loboseguros.com.br",
    instagram: "https://www.instagram.com/loboseguross/",
    instagramLabel: "@loboseguross",
    address: "Rua Jacques Felix, 456 — Centro, Taubaté-SP",
    hours: "Segunda a sexta, das 8h30 às 18h. Sem pausa no almoço.",
  },
  brand: {
    name: "LOBO",
    descriptor: "Corretora de Seguros",
    fullName: "LOBO CORRETORA® SEGUROS",
    person: "Rodrigo Lobo",
    logoDark: "/logo-lobo-seguros.png",
    logoLight: "/logo-lobo-seguros-light.png",
  },
  navigation: [
    { label: "Seguros", href: "#seguros" },
    { label: "Seguradoras", href: "#seguradoras" },
    { label: "Empresa", href: "#empresa" },
    { label: "Contato", href: "#contato" },
  ],
  hero: {
    eyebrow: "TAUBATÉ-SP · 20 ANOS DE MERCADO",
    titleLines: ["Seguro certo,", "escolhido entre as", "maiores seguradoras."],
    description:
      "Cotamos o seu seguro em várias seguradoras, explicamos cobertura por cobertura e acompanhamos você antes, durante e depois do sinistro.",
    primaryCta: "Pedir cotação",
    secondaryCta: "Ver os seguros",
    message: "Olá! Vim pelo site e quero uma cotação de seguro.",
    image: "/hero-auto-lobo.jpg",
    imageAlt: "SUV grafite estacionado em uma avenida urbana ao entardecer",
  },
  insurers: {
    title: "Cotamos com as maiores.",
    description:
      "Pesquisa entre seguradoras do mercado nacional e internacional antes de indicar a apólice.",
    items: [
      "Porto Seguro",
      "Mapfre",
      "Bradesco Seguros",
      "SulAmérica",
      "Itaú Seguros",
      "Azul Seguros",
      "Chubb",
    ],
    note: "Também trabalhamos com consórcio Porto e Carro Fácil.",
  },
  products: {
    title: "Seis frentes de proteção.",
    description:
      "Assessoria personalizada na contratação, com assistência 24 horas durante toda a vigência da apólice.",
    ctaLabel: "Cotar agora",
    items: [
      {
        icon: "car",
        featured: true,
        name: "Seguro Auto",
        title: "Seguro Auto",
        description:
          "Feito para quem quer segurança e comodidade no dia a dia. Não fechamos com a primeira seguradora: buscamos entre todas a que melhor atende o seu perfil e o seu carro.",
        items: ["Cobertura compreensiva", "Carro reserva", "Assistência 24h", "Terceiros"],
        message: "Olá! Quero uma cotação de seguro auto.",
      },
      {
        icon: "house",
        name: "Seguro Residencial",
        title: "Seguro Residencial",
        description:
          "Para proprietários e inquilinos, em residência habitual ou de veraneio. Coberturas diferenciadas, sem burocracia e com custo baixo.",
        items: ["Incêndio e raio", "Roubo e furto", "Danos elétricos", "Assistência residencial"],
        message: "Olá! Quero uma cotação de seguro residencial.",
      },
      {
        icon: "health",
        name: "Seguro Saúde",
        title: "Seguro Saúde",
        description:
          "Suporte na cotação e na contratação do plano, individual, familiar ou empresarial. Comparamos rede credenciada, carência e reajuste antes de indicar.",
        items: ["Individual", "Familiar", "Empresarial", "Rede credenciada"],
        message: "Olá! Quero uma cotação de seguro saúde.",
      },
      {
        icon: "building",
        name: "Seguro Empresarial",
        title: "Seguro Empresarial",
        description:
          "Proteção ao patrimônio da empresa, independentemente do porte ou do segmento, para que um imprevisto não pare a operação.",
        items: ["Incêndio e explosão", "Vendaval", "Roubo qualificado", "Danos elétricos"],
        message: "Olá! Quero uma cotação de seguro empresarial.",
      },
      {
        icon: "gear",
        name: "Máquinas e Equipamentos",
        title: "Máquinas e Equipamentos",
        description:
          "Cobertura conforme o uso do maquinário: obras, setor agrícola, parques industriais e operação próxima a rios, lagos e represas, em todo o território nacional.",
        items: ["Obras", "Agrícola", "Parque industrial", "Território nacional"],
        message: "Olá! Quero uma cotação de seguro de máquinas e equipamentos.",
      },
      {
        icon: "key",
        name: "Fiança Locatícia",
        title: "Fiança Locatícia",
        description:
          "A garantia de aluguel que as imobiliárias mais aceitam. Retorno mais rápido e confiável para o proprietário, menos burocracia para o inquilino.",
        items: ["Sem fiador", "Aceito por imobiliárias", "Aluguel e encargos", "Contratação rápida"],
        message: "Olá! Quero uma cotação de seguro fiança locatícia.",
      },
    ],
  },
  about: {
    years: 20,
    yearsLabel: "anos cotando, explicando e acompanhando seguro de perto.",
    title: "Atendimento que começa antes da apólice.",
    description:
      "Atendimento personalizado, feito para a realidade e a necessidade de cada cliente. Confiança e clareza nas informações, pesquisa entre as maiores seguradoras do mercado nacional e internacional, e solução sob medida antes, durante e depois do fechamento do seguro.",
    signature: "Equipe Lobo Seguros",
    stats: [
      { value: "24h", text: "Assistência durante toda a vigência da apólice." },
      { value: "6", text: "Ramos atendidos, do auto à fiança locatícia." },
      { value: "8h30–18h", text: "Atendimento de segunda a sexta, inclusive no almoço." },
    ],
  },
  differences: {
    title: "Por que cotar com a Lobo?",
    items: [
      {
        icon: "shield",
        title: "Pesquisa de mercado",
        text: "Comparamos as maiores seguradoras e mostramos a diferença entre as propostas antes de você decidir.",
      },
      {
        icon: "clock",
        title: "Assistência 24 horas",
        text: "Dúvida ou sinistro, você tem suporte durante toda a vigência do seguro.",
      },
      {
        icon: "handshake",
        title: "Atendimento direto",
        text: "Você fala com quem resolve, sem fila e sem repasse de protocolo.",
      },
      {
        icon: "map",
        title: "Escritório em Taubaté",
        text: "Rua Jacques Felix, 456, no Centro. Atendimento presencial quando você preferir.",
      },
    ],
  },
  testimonials: {
    title: "Quem cota, indica.",
    description:
      "Textos provisórios. A prova social real entra aqui assim que os clientes autorizarem o uso.",
    items: [
      {
        quote: "Recebi três propostas comparadas na mesma mensagem e entendi cada cobertura.",
        author: "Texto provisório",
        role: "Seguro auto",
      },
      {
        quote: "Precisei acionar o seguro e tive resposta no mesmo dia.",
        author: "Texto provisório",
        role: "Seguro residencial",
      },
      {
        quote: "Resolveram a fiança do aluguel sem fiador e sem burocracia.",
        author: "Texto provisório",
        role: "Fiança locatícia",
      },
    ],
  },
  finalCta: {
    title: "Cotação sem compromisso.",
    description:
      "Manda o que você quer proteger no WhatsApp. A gente pesquisa o mercado e volta com as opções comparadas.",
    button: "Pedir cotação",
    message: "Olá! Vim pelo site e quero uma cotação de seguro.",
  },
  footer: {
    description: "Corretora de seguros em Taubaté-SP. Confiança e preço justo na mesma conversa.",
    contactTitle: "Contato",
    officeTitle: "Escritório",
    networksTitle: "Redes",
  },
  theme: {
    ink: "#111318",
    inkSoft: "#1A1D24",
    paper: "#F2F1EE",
    paperDeep: "#E3E2DE",
    accent: "#D91B22",
    accentDark: "#A2121A",
    steel: "#3A404B",
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
  if (!merged.products.items.length) throw new Error("Cadastre pelo menos um seguro.");
  if (Object.values(merged.theme).some((color) => !/^#[0-9a-f]{6}$/i.test(color))) throw new Error("Todas as cores precisam usar o formato hexadecimal completo, como #D91B22.");
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
  const normalized = /^#[0-9a-f]{6}$/i.test(hex) ? hex.slice(1) : "111318";
  return [0, 2, 4].map((offset) => parseInt(normalized.slice(offset, offset + 2), 16)).join(" ");
}
