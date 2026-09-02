import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  CheckCircle,
  DownloadSimple,
  Eye,
  FloppyDisk,
  Plus,
  Trash,
  UploadSimple,
  WarningCircle,
} from "@phosphor-icons/react";
import {
  loadSiteContent,
  resetSiteContent,
  saveSiteContent,
  validateSiteContent,
} from "./siteContent";

const fieldClass = "mt-2 min-h-12 w-full border border-ink/20 bg-white px-3 py-2.5 text-base text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";
const buttonClass = "inline-flex min-h-11 items-center justify-center gap-2 border px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-45";

const sections = [
  ["essenciais", "Essenciais"],
  ["hero", "Hero"],
  ["seguradoras", "Seguradoras"],
  ["seguros", "Seguros"],
  ["empresa", "Empresa"],
  ["diferenciais", "Diferenciais"],
  ["depoimentos", "Depoimentos"],
  ["fechamento", "Fechamento"],
  ["aparencia", "Aparência"],
  ["avancado", "Avançado"],
];

const productIconOptions = [
  ["car", "Carro"],
  ["house", "Casa"],
  ["health", "Saúde"],
  ["building", "Empresa"],
  ["gear", "Máquinas"],
  ["key", "Chave"],
];

const differenceIconOptions = [
  ["shield", "Escudo"],
  ["clock", "Relógio"],
  ["handshake", "Aperto de mão"],
  ["map", "Localização"],
];

const linesToList = (value) => value.split("\n").map((line) => line.trim()).filter(Boolean);

function Field({ label, hint, multiline = false, type = "text", value, onChange, id }) {
  const autoId = useId();
  const fieldId = id || autoId;
  const Input = multiline ? "textarea" : "input";
  return (
    <label className="block" htmlFor={fieldId}>
      <span className="text-sm font-semibold text-ink">{label}</span>
      {hint && <span className="mt-1 block text-xs leading-relaxed text-ink/55">{hint}</span>}
      <Input
        id={fieldId}
        className={`${fieldClass} ${multiline ? "min-h-28 resize-y" : ""}`}
        type={multiline ? undefined : type}
        value={value}
        onChange={(event) => onChange(type === "number" ? Number(event.target.value) : event.target.value)}
      />
    </label>
  );
}

function SelectField({ label, value, options, onChange, id }) {
  const autoId = useId();
  const fieldId = id || autoId;
  return (
    <label className="block" htmlFor={fieldId}>
      <span className="text-sm font-semibold text-ink">{label}</span>
      <select id={fieldId} className={fieldClass} value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>{optionLabel}</option>
        ))}
      </select>
    </label>
  );
}

function CheckboxField({ label, hint, checked, onChange, id }) {
  const autoId = useId();
  const fieldId = id || autoId;
  return (
    <label className="flex min-h-12 items-start gap-3 self-end border border-ink/20 bg-white px-3 py-3" htmlFor={fieldId}>
      <input
        id={fieldId}
        type="checkbox"
        className="mt-1 h-5 w-5 accent-[rgb(var(--color-accent))]"
        checked={Boolean(checked)}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>
        <span className="text-sm font-semibold text-ink">{label}</span>
        {hint && <span className="mt-1 block text-xs leading-relaxed text-ink/55">{hint}</span>}
      </span>
    </label>
  );
}

function ColorField({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <span className="mt-2 flex min-h-12 items-center gap-3 border border-ink/20 bg-white px-3">
        <input className="h-8 w-10 cursor-pointer border-0 bg-transparent p-0" type="color" value={/^#[0-9a-f]{6}$/i.test(value) ? value : "#000000"} onChange={(event) => onChange(event.target.value.toUpperCase())} />
        <input className="min-w-0 flex-1 bg-transparent font-mono text-sm uppercase outline-none" value={value} pattern="#[0-9A-Fa-f]{6}" onChange={(event) => onChange(event.target.value)} aria-label={`${label} em hexadecimal`} />
      </span>
    </label>
  );
}

function EditorSection({ id, eyebrow, title, description, children }) {
  return (
    <section id={id} className="scroll-mt-6 border border-ink/15 bg-paper px-5 py-7 sm:px-7" aria-labelledby={`${id}-title`}>
      <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
      <h2 id={`${id}-title`} className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">{title}</h2>
      {description && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/60">{description}</p>}
      <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function Repeater({ items, onChange, createItem, renderItem, addLabel }) {
  const updateItem = (index, key, value) => {
    onChange(items.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item)));
  };

  return (
    <div className="space-y-4 sm:col-span-2">
      {items.map((item, index) => (
        <div key={`${index}-${item.title || item.role || item.value}`} className="relative grid grid-cols-1 gap-4 border border-ink/15 bg-white/55 p-4 pt-12 sm:grid-cols-2 sm:pt-4">
          <button
            type="button"
            className="absolute right-2 top-2 inline-flex h-10 w-10 items-center justify-center text-ink/45 transition hover:bg-accent hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            aria-label={`Remover item ${index + 1}`}
            onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
          >
            <Trash size={18} aria-hidden="true" />
          </button>
          {renderItem(item, index, updateItem)}
        </div>
      ))}
      <button type="button" className={`${buttonClass} border-ink/25 text-ink hover:border-accent hover:text-accent`} onClick={() => onChange([...items, createItem()])}>
        <Plus size={17} weight="bold" aria-hidden="true" /> {addLabel}
      </button>
    </div>
  );
}

function AdminPage() {
  const [content, setContent] = useState(loadSiteContent);
  const [savedSnapshot, setSavedSnapshot] = useState(() => JSON.stringify(loadSiteContent()));
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [confirmReset, setConfirmReset] = useState(false);
  const [advancedJson, setAdvancedJson] = useState(() => JSON.stringify(loadSiteContent(), null, 2));
  const [advancedError, setAdvancedError] = useState("");
  const importRef = useRef(null);
  const statusRef = useRef(null);
  const dirty = useMemo(() => JSON.stringify(content) !== savedSnapshot, [content, savedSnapshot]);

  useEffect(() => {
    const preventLoss = (event) => {
      if (!dirty) return;
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", preventLoss);
    return () => window.removeEventListener("beforeunload", preventLoss);
  }, [dirty]);

  const update = (path, value) => {
    const next = structuredClone(content);
    const keys = path.split(".");
    let target = next;
    keys.slice(0, -1).forEach((key) => { target = target[key]; });
    target[keys.at(-1)] = value;
    setContent(next);
    setAdvancedJson(JSON.stringify(next, null, 2));
    setStatus({ type: "idle", message: "Alterações ainda não salvas." });
  };

  const save = () => {
    try {
      const validated = saveSiteContent(content);
      const serialized = JSON.stringify(validated);
      setContent(validated);
      setSavedSnapshot(serialized);
      setAdvancedJson(JSON.stringify(validated, null, 2));
      setStatus({ type: "success", message: "Alterações salvas neste navegador." });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  };

  const exportJson = () => {
    try {
      const validated = validateSiteContent(content);
      const blob = new Blob([JSON.stringify(validated, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "lobo-seguros-conteudo.json";
      anchor.click();
      URL.revokeObjectURL(url);
      setStatus({ type: "success", message: "Arquivo de conteúdo exportado." });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  const importJson = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const imported = validateSiteContent(JSON.parse(await file.text()));
      setContent(imported);
      setAdvancedJson(JSON.stringify(imported, null, 2));
      setAdvancedError("");
      setStatus({ type: "idle", message: "Arquivo importado. Revise e clique em salvar." });
    } catch (error) {
      setStatus({ type: "error", message: `Não foi possível importar: ${error.message}` });
    } finally {
      event.target.value = "";
    }
  };

  const applyAdvancedJson = () => {
    try {
      const parsed = validateSiteContent(JSON.parse(advancedJson));
      setContent(parsed);
      setAdvancedJson(JSON.stringify(parsed, null, 2));
      setAdvancedError("");
      setStatus({ type: "idle", message: "JSON aplicado. Revise e clique em salvar." });
    } catch (error) {
      setAdvancedError(error.message);
    }
  };

  const reset = () => {
    const defaults = resetSiteContent();
    setContent(defaults);
    setSavedSnapshot(JSON.stringify(defaults));
    setAdvancedJson(JSON.stringify(defaults, null, 2));
    setConfirmReset(false);
    setStatus({ type: "success", message: "Conteúdo padrão restaurado." });
  };

  return (
    <div className="min-h-screen bg-paperDeep text-ink">
      <header className="sticky top-0 z-30 border-b border-ink/15 bg-ink text-paper">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4">
            <a href="/" className="inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-paper/65 transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">
              <ArrowLeft size={17} weight="bold" aria-hidden="true" /> Site
            </a>
            <span className="h-6 w-px bg-paper/20" aria-hidden="true" />
            <div>
              <p className="font-display text-xl font-bold tracking-tight">Painel Lobo Seguros</p>
              <p className="text-[0.6rem] uppercase tracking-[0.16em] text-paper/45">Conteúdo local</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a href="/" target="_blank" rel="noreferrer" className={`${buttonClass} border-paper/25 text-paper hover:border-accent hover:bg-accent`}>
              <Eye size={17} aria-hidden="true" /> Visualizar
            </a>
            <button type="button" onClick={save} disabled={!dirty} className={`${buttonClass} border-accent bg-accent text-paper hover:bg-accentDark`}>
              <FloppyDisk size={17} weight="bold" aria-hidden="true" /> {dirty ? "Salvar" : "Salvo"}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-[88px] lg:h-[calc(100dvh-112px)]">
          <nav className="flex gap-2 overflow-x-auto border border-ink/15 bg-paper p-2 lg:flex-col" aria-label="Seções do painel">
            {sections.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="inline-flex min-h-10 shrink-0 items-center px-3 text-xs font-bold uppercase tracking-[0.12em] text-ink/55 transition hover:bg-paperDeep hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">
                {label}
              </a>
            ))}
          </nav>
          <div className="mt-4 border border-accent/30 bg-accent/5 p-4 text-xs leading-relaxed text-ink/65">
            <p className="flex items-center gap-2 font-bold text-accent"><WarningCircle size={17} aria-hidden="true" /> Armazenamento local</p>
            <p className="mt-2">As mudanças valem neste navegador. Use exportar para guardar ou transferir o conteúdo.</p>
          </div>
        </aside>

        <main className="min-w-0 space-y-5" id="conteudo-admin">
          <div
            ref={statusRef}
            tabIndex={-1}
            role="status"
            aria-live="polite"
            className={`min-h-12 border px-4 py-3 text-sm ${status.type === "error" ? "border-red-700 bg-red-50 text-red-800" : status.type === "success" ? "border-steel bg-steel/10 text-ink" : "border-ink/15 bg-paper text-ink/60"}`}
          >
            <span className="inline-flex items-center gap-2">
              {status.type === "success" && <CheckCircle size={18} className="text-steel" aria-hidden="true" />}
              {status.type === "error" && <WarningCircle size={18} aria-hidden="true" />}
              {status.message || (dirty ? "Existem alterações não salvas." : "Conteúdo sincronizado.")}
            </span>
          </div>

          <EditorSection id="essenciais" eyebrow="01" title="Essenciais" description="Marca, contato e informações usadas por mecanismos de busca.">
            <Field label="Nome da marca" value={content.brand.name} onChange={(value) => update("brand.name", value)} />
            <Field label="Descritor" value={content.brand.descriptor} onChange={(value) => update("brand.descriptor", value)} />
            <Field label="Nome completo" value={content.brand.fullName} onChange={(value) => update("brand.fullName", value)} />
            <Field label="Responsável" value={content.brand.person} onChange={(value) => update("brand.person", value)} />
            <Field label="Link do WhatsApp" type="url" hint="Formato https://wa.me/55DDDNÚMERO" value={content.contact.whatsapp} onChange={(value) => update("contact.whatsapp", value)} />
            <Field label="WhatsApp exibido" value={content.contact.whatsappLabel} onChange={(value) => update("contact.whatsappLabel", value)} />
            <div className="sm:col-span-2"><Field label="Telefones" hint="Um por linha. Aparecem na seção de contato." multiline value={content.contact.phones.join("\n")} onChange={(value) => update("contact.phones", linesToList(value))} /></div>
            <Field label="E-mail" type="email" value={content.contact.email} onChange={(value) => update("contact.email", value)} />
            <Field label="Instagram" type="url" value={content.contact.instagram} onChange={(value) => update("contact.instagram", value)} />
            <Field label="Usuário do Instagram" value={content.contact.instagramLabel} onChange={(value) => update("contact.instagramLabel", value)} />
            <Field label="Endereço" value={content.contact.address} onChange={(value) => update("contact.address", value)} />
            <div className="sm:col-span-2"><Field label="Horário de atendimento" value={content.contact.hours} onChange={(value) => update("contact.hours", value)} /></div>
            <Field label="Título SEO" value={content.seo.title} onChange={(value) => update("seo.title", value)} />
            <div className="sm:col-span-2"><Field label="Descrição SEO" multiline value={content.seo.description} onChange={(value) => update("seo.description", value)} /></div>
          </EditorSection>

          <EditorSection id="hero" eyebrow="02" title="Hero" description="Primeira mensagem e botões exibidos no topo do site.">
            <div className="sm:col-span-2"><Field label="Linha de contexto" value={content.hero.eyebrow} onChange={(value) => update("hero.eyebrow", value)} /></div>
            {content.hero.titleLines.map((line, index) => (
              <Field
                key={index}
                label={`Título — linha ${index + 1}`}
                hint={index === content.hero.titleLines.length - 1 ? "A última linha aparece em vermelho." : undefined}
                value={line}
                onChange={(value) => update("hero.titleLines", content.hero.titleLines.map((item, itemIndex) => (itemIndex === index ? value : item)))}
              />
            ))}
            <div className="sm:col-span-2"><Field label="Descrição" multiline value={content.hero.description} onChange={(value) => update("hero.description", value)} /></div>
            <Field label="Botão principal" value={content.hero.primaryCta} onChange={(value) => update("hero.primaryCta", value)} />
            <Field label="Botão secundário" value={content.hero.secondaryCta} onChange={(value) => update("hero.secondaryCta", value)} />
            <div className="sm:col-span-2"><Field label="Mensagem do WhatsApp" hint="Texto já preenchido na conversa." value={content.hero.message} onChange={(value) => update("hero.message", value)} /></div>
          </EditorSection>

          <EditorSection id="seguradoras" eyebrow="03" title="Seguradoras" description="Faixa de parceiras exibida logo abaixo do hero.">
            <Field label="Título" value={content.insurers.title} onChange={(value) => update("insurers.title", value)} />
            <Field label="Observação" hint="Linha menor no fim da faixa." value={content.insurers.note} onChange={(value) => update("insurers.note", value)} />
            <div className="sm:col-span-2"><Field label="Descrição" multiline value={content.insurers.description} onChange={(value) => update("insurers.description", value)} /></div>
            <div className="sm:col-span-2"><Field label="Seguradoras" hint="Uma por linha." multiline value={content.insurers.items.join("\n")} onChange={(value) => update("insurers.items", linesToList(value))} /></div>
          </EditorSection>

          <EditorSection id="seguros" eyebrow="04" title="Seguros" description="Ramos atendidos, coberturas listadas e mensagem de cada CTA.">
            <Field label="Título da seção" value={content.products.title} onChange={(value) => update("products.title", value)} />
            <Field label="Texto do botão" value={content.products.ctaLabel} onChange={(value) => update("products.ctaLabel", value)} />
            <div className="sm:col-span-2"><Field label="Descrição da seção" multiline value={content.products.description} onChange={(value) => update("products.description", value)} /></div>
            <Repeater
              items={content.products.items}
              onChange={(value) => update("products.items", value)}
              createItem={() => ({ icon: "shield", featured: false, name: "Novo seguro", title: "Novo seguro", description: "Descreva a cobertura.", items: ["Cobertura"], message: "Olá! Quero uma cotação." })}
              addLabel="Adicionar seguro"
              renderItem={(item, index, updateItem) => (
                <>
                  <Field id={`product-title-${index}`} label="Título" value={item.title} onChange={(value) => { updateItem(index, "title", value); }} />
                  <SelectField id={`product-icon-${index}`} label="Ícone" value={item.icon} options={productIconOptions} onChange={(value) => updateItem(index, "icon", value)} />
                  <div className="sm:col-span-2"><Field id={`product-description-${index}`} label="Descrição" multiline value={item.description} onChange={(value) => updateItem(index, "description", value)} /></div>
                  <div className="sm:col-span-2"><Field id={`product-items-${index}`} label="Coberturas" hint="Uma por linha." multiline value={item.items.join("\n")} onChange={(value) => updateItem(index, "items", linesToList(value))} /></div>
                  <Field id={`product-message-${index}`} label="Mensagem do WhatsApp" value={item.message} onChange={(value) => updateItem(index, "message", value)} />
                  <CheckboxField id={`product-featured-${index}`} label="Card em destaque" hint="Fundo escuro e card maior. Use em apenas um seguro." checked={item.featured} onChange={(value) => updateItem(index, "featured", value)} />
                </>
              )}
            />
          </EditorSection>

          <EditorSection id="empresa" eyebrow="05" title="Empresa" description="Texto institucional, tempo de mercado e indicadores.">
            <Field label="Anos de mercado" type="number" value={content.about.years} onChange={(value) => update("about.years", value)} />
            <Field label="Legenda dos anos" value={content.about.yearsLabel} onChange={(value) => update("about.yearsLabel", value)} />
            <Field label="Título" value={content.about.title} onChange={(value) => update("about.title", value)} />
            <Field label="Assinatura" value={content.about.signature} onChange={(value) => update("about.signature", value)} />
            <div className="sm:col-span-2"><Field label="Descrição" multiline value={content.about.description} onChange={(value) => update("about.description", value)} /></div>
            <Repeater
              items={content.about.stats}
              onChange={(value) => update("about.stats", value)}
              createItem={() => ({ value: "Novo dado", text: "Descrição do dado." })}
              addLabel="Adicionar indicador"
              renderItem={(item, index, updateItem) => (
                <>
                  <Field id={`stat-value-${index}`} label="Valor" value={item.value} onChange={(value) => updateItem(index, "value", value)} />
                  <Field id={`stat-text-${index}`} label="Descrição" value={item.text} onChange={(value) => updateItem(index, "text", value)} />
                </>
              )}
            />
          </EditorSection>

          <EditorSection id="diferenciais" eyebrow="06" title="Diferenciais" description="Argumentos que sustentam a decisão de cotar com a Lobo.">
            <div className="sm:col-span-2"><Field label="Título da seção" value={content.differences.title} onChange={(value) => update("differences.title", value)} /></div>
            <Repeater
              items={content.differences.items}
              onChange={(value) => update("differences.items", value)}
              createItem={() => ({ icon: "shield", title: "Novo diferencial", text: "Explique o diferencial." })}
              addLabel="Adicionar diferencial"
              renderItem={(item, index, updateItem) => (
                <>
                  <Field id={`difference-title-${index}`} label="Título" value={item.title} onChange={(value) => updateItem(index, "title", value)} />
                  <SelectField id={`difference-icon-${index}`} label="Ícone" value={item.icon} options={differenceIconOptions} onChange={(value) => updateItem(index, "icon", value)} />
                  <div className="sm:col-span-2"><Field id={`difference-text-${index}`} label="Descrição" multiline value={item.text} onChange={(value) => updateItem(index, "text", value)} /></div>
                </>
              )}
            />
          </EditorSection>

          <EditorSection id="depoimentos" eyebrow="07" title="Depoimentos" description="Adicione, edite ou remova relatos exibidos como prova social.">
            <Field label="Título da seção" value={content.testimonials.title} onChange={(value) => update("testimonials.title", value)} />
            <Field label="Texto de apoio" value={content.testimonials.description} onChange={(value) => update("testimonials.description", value)} />
            <Repeater
              items={content.testimonials.items}
              onChange={(value) => update("testimonials.items", value)}
              createItem={() => ({ quote: "Novo depoimento", author: "Nome do cliente", role: "Seguro auto" })}
              addLabel="Adicionar depoimento"
              renderItem={(item, index, updateItem) => (
                <>
                  <div className="sm:col-span-2"><Field id={`testimonial-quote-${index}`} label="Depoimento" multiline value={item.quote} onChange={(value) => updateItem(index, "quote", value)} /></div>
                  <Field id={`testimonial-author-${index}`} label="Autor" value={item.author} onChange={(value) => updateItem(index, "author", value)} />
                  <Field id={`testimonial-role-${index}`} label="Identificação" value={item.role} onChange={(value) => updateItem(index, "role", value)} />
                </>
              )}
            />
          </EditorSection>

          <EditorSection id="fechamento" eyebrow="08" title="Fechamento e rodapé" description="Última chamada para ação e blocos institucionais do rodapé.">
            <Field label="Título do CTA" value={content.finalCta.title} onChange={(value) => update("finalCta.title", value)} />
            <Field label="Botão do CTA" value={content.finalCta.button} onChange={(value) => update("finalCta.button", value)} />
            <div className="sm:col-span-2"><Field label="Descrição do CTA" multiline value={content.finalCta.description} onChange={(value) => update("finalCta.description", value)} /></div>
            <div className="sm:col-span-2"><Field label="Mensagem do WhatsApp" value={content.finalCta.message} onChange={(value) => update("finalCta.message", value)} /></div>
            <div className="sm:col-span-2"><Field label="Descrição do rodapé" multiline value={content.footer.description} onChange={(value) => update("footer.description", value)} /></div>
            <Field label="Título de contato" value={content.footer.contactTitle} onChange={(value) => update("footer.contactTitle", value)} />
            <Field label="Título do escritório" value={content.footer.officeTitle} onChange={(value) => update("footer.officeTitle", value)} />
            <Field label="Título de redes" value={content.footer.networksTitle} onChange={(value) => update("footer.networksTitle", value)} />
          </EditorSection>

          <EditorSection id="aparencia" eyebrow="09" title="Aparência" description="Paleta global usada em todo o site e no painel.">
            {Object.entries(content.theme).map(([key, value]) => <ColorField key={key} label={key} value={value} onChange={(color) => update(`theme.${key}`, color)} />)}
          </EditorSection>

          <EditorSection id="avancado" eyebrow="10" title="Avançado" description="Edição integral, importação e cópia de segurança da configuração.">
            <div className="sm:col-span-2">
              <label htmlFor="advanced-json" className="text-sm font-semibold">Configuração JSON completa</label>
              <textarea id="advanced-json" className={`${fieldClass} min-h-[420px] resize-y font-mono text-xs leading-relaxed`} spellCheck="false" value={advancedJson} onChange={(event) => { setAdvancedJson(event.target.value); setAdvancedError(""); }} />
              {advancedError && <p className="mt-2 text-sm text-red-800" role="alert">{advancedError}</p>}
              <button type="button" className={`${buttonClass} mt-3 border-ink bg-ink text-paper hover:bg-accent`} onClick={applyAdvancedJson}>Aplicar JSON</button>
            </div>
            <div className="sm:col-span-2 flex flex-wrap gap-2 border-t border-ink/15 pt-5">
              <button type="button" className={`${buttonClass} border-ink/25 text-ink hover:border-accent hover:text-accent`} onClick={exportJson}><DownloadSimple size={17} aria-hidden="true" /> Exportar</button>
              <button type="button" className={`${buttonClass} border-ink/25 text-ink hover:border-accent hover:text-accent`} onClick={() => importRef.current?.click()}><UploadSimple size={17} aria-hidden="true" /> Importar</button>
              <input ref={importRef} className="sr-only" type="file" accept="application/json,.json" onChange={importJson} />
              {!confirmReset ? (
                <button type="button" className={`${buttonClass} ml-auto border-red-700 text-red-800 hover:bg-red-700 hover:text-white`} onClick={() => setConfirmReset(true)}><Trash size={17} aria-hidden="true" /> Restaurar padrão</button>
              ) : (
                <div className="ml-auto flex flex-wrap items-center gap-2 border border-red-700 bg-red-50 p-2">
                  <span className="px-2 text-sm font-semibold text-red-800">Restaurar tudo?</span>
                  <button type="button" className={`${buttonClass} border-red-700 bg-red-700 text-white`} onClick={reset}>Sim, restaurar</button>
                  <button type="button" className={`${buttonClass} border-ink/25 text-ink`} onClick={() => setConfirmReset(false)}>Cancelar</button>
                </div>
              )}
            </div>
          </EditorSection>

          <div className="sticky bottom-4 flex items-center justify-between gap-3 border border-ink/20 bg-ink p-3 text-paper shadow-card">
            <p className="hidden text-sm text-paper/60 sm:block">{dirty ? "Há alterações pendentes." : "Tudo salvo neste navegador."}</p>
            <button type="button" onClick={save} disabled={!dirty} className={`${buttonClass} ml-auto border-accent bg-accent text-paper hover:bg-accentDark`}>
              <FloppyDisk size={17} weight="bold" aria-hidden="true" /> {dirty ? "Salvar alterações" : "Alterações salvas"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminPage;
