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

const fieldClass = "mt-2 min-h-12 w-full border border-ink/20 bg-white px-3 py-2.5 text-base text-ink outline-none transition focus:border-rust focus:ring-2 focus:ring-rust/20";
const buttonClass = "inline-flex min-h-11 items-center justify-center gap-2 border px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust disabled:cursor-not-allowed disabled:opacity-45";

const sections = [
  ["essenciais", "Essenciais"],
  ["hero", "Hero"],
  ["sobre", "Sobre"],
  ["pilares", "Pilares"],
  ["diferenciais", "Diferenciais"],
  ["depoimentos", "Depoimentos"],
  ["fechamento", "Fechamento"],
  ["aparencia", "Aparência"],
  ["avancado", "Avançado"],
];

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
      <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-rust">{eyebrow}</p>
      <h2 id={`${id}-title`} className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">{title}</h2>
      {description && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/60">{description}</p>}
      <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function Repeater({ items, onChange, createItem, renderItem, addLabel }) {
  const updateItem = (index, key, value) => {
    const next = items.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item);
    onChange(next);
  };

  return (
    <div className="space-y-4 sm:col-span-2">
      {items.map((item, index) => (
        <div key={`${index}-${item.title || item.role || item.value}`} className="relative grid grid-cols-1 gap-4 border border-ink/15 bg-white/55 p-4 sm:grid-cols-2">
          <button
            type="button"
            className="absolute right-2 top-2 inline-flex h-10 w-10 items-center justify-center text-ink/45 transition hover:bg-rust hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-rust"
            aria-label={`Remover item ${index + 1}`}
            onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
          >
            <Trash size={18} aria-hidden="true" />
          </button>
          {renderItem(item, index, updateItem)}
        </div>
      ))}
      <button type="button" className={`${buttonClass} border-ink/25 text-ink hover:border-rust hover:text-rust`} onClick={() => onChange([...items, createItem()])}>
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
      anchor.download = "lobo-corretora-conteudo.json";
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
    const serialized = JSON.stringify(defaults);
    setContent(defaults);
    setSavedSnapshot(serialized);
    setAdvancedJson(JSON.stringify(defaults, null, 2));
    setConfirmReset(false);
    setStatus({ type: "success", message: "Conteúdo padrão restaurado." });
  };

  return (
    <div className="min-h-screen bg-paperDeep text-ink">
      <header className="sticky top-0 z-30 border-b border-ink/15 bg-ink text-paper">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4">
            <a href="/" className="inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-paper/65 transition hover:text-rust focus-visible:outline focus-visible:outline-2 focus-visible:outline-rust">
              <ArrowLeft size={17} weight="bold" aria-hidden="true" /> Site
            </a>
            <span className="h-6 w-px bg-paper/20" aria-hidden="true" />
            <div>
              <p className="font-display text-xl font-semibold tracking-tight">Painel Lobo</p>
              <p className="text-[0.6rem] uppercase tracking-[0.16em] text-paper/45">Conteúdo local</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a href="/" target="_blank" rel="noreferrer" className={`${buttonClass} border-paper/25 text-paper hover:border-rust hover:bg-rust`}>
              <Eye size={17} aria-hidden="true" /> Visualizar
            </a>
            <button type="button" onClick={save} disabled={!dirty} className={`${buttonClass} border-rust bg-rust text-paper hover:bg-rustDark`}>
              <FloppyDisk size={17} weight="bold" aria-hidden="true" /> {dirty ? "Salvar" : "Salvo"}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-[88px] lg:h-[calc(100dvh-112px)]">
          <nav className="flex gap-2 overflow-x-auto border border-ink/15 bg-paper p-2 lg:flex-col" aria-label="Seções do painel">
            {sections.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="inline-flex min-h-10 shrink-0 items-center px-3 text-xs font-bold uppercase tracking-[0.12em] text-ink/55 transition hover:bg-paperDeep hover:text-rust focus-visible:outline focus-visible:outline-2 focus-visible:outline-rust">
                {label}
              </a>
            ))}
          </nav>
          <div className="mt-4 border border-rust/30 bg-rust/8 p-4 text-xs leading-relaxed text-ink/65">
            <p className="flex items-center gap-2 font-bold text-rust"><WarningCircle size={17} aria-hidden="true" /> Armazenamento local</p>
            <p className="mt-2">As mudanças valem neste navegador. Use exportar para guardar ou transferir o conteúdo.</p>
          </div>
        </aside>

        <main className="min-w-0 space-y-5" id="conteudo-admin">
          <div
            ref={statusRef}
            tabIndex={-1}
            role="status"
            aria-live="polite"
            className={`min-h-12 border px-4 py-3 text-sm ${status.type === "error" ? "border-red-700 bg-red-50 text-red-800" : status.type === "success" ? "border-moss bg-moss/10 text-ink" : "border-ink/15 bg-paper text-ink/60"}`}
          >
            <span className="inline-flex items-center gap-2">
              {status.type === "success" && <CheckCircle size={18} className="text-moss" aria-hidden="true" />}
              {status.type === "error" && <WarningCircle size={18} aria-hidden="true" />}
              {status.message || (dirty ? "Existem alterações não salvas." : "Conteúdo sincronizado.")}
            </span>
          </div>

          <EditorSection id="essenciais" eyebrow="01" title="Essenciais" description="Dados globais, contato e informações usadas por mecanismos de busca.">
            <Field label="Nome da marca" value={content.brand.name} onChange={(value) => update("brand.name", value)} />
            <Field label="Descritor" value={content.brand.descriptor} onChange={(value) => update("brand.descriptor", value)} />
            <Field label="Nome completo" value={content.brand.fullName} onChange={(value) => update("brand.fullName", value)} />
            <Field label="Nome da pessoa" value={content.brand.person} onChange={(value) => update("brand.person", value)} />
            <Field label="WhatsApp" type="url" value={content.contact.whatsapp} onChange={(value) => update("contact.whatsapp", value)} />
            <Field label="Instagram" type="url" value={content.contact.instagram} onChange={(value) => update("contact.instagram", value)} />
            <Field label="Endereço" value={content.contact.address} onChange={(value) => update("contact.address", value)} />
            <Field label="Título SEO" value={content.seo.title} onChange={(value) => update("seo.title", value)} />
            <div className="sm:col-span-2"><Field label="Descrição SEO" multiline value={content.seo.description} onChange={(value) => update("seo.description", value)} /></div>
          </EditorSection>

          <EditorSection id="hero" eyebrow="02" title="Hero" description="Primeira mensagem, botões e imagem exibidos no topo do site.">
            <div className="sm:col-span-2"><Field label="Linha de contexto" value={content.hero.eyebrow} onChange={(value) => update("hero.eyebrow", value)} /></div>
            {content.hero.titleLines.map((line, index) => <Field key={index} label={`Título — linha ${index + 1}`} value={line} onChange={(value) => update("hero.titleLines", content.hero.titleLines.map((item, itemIndex) => itemIndex === index ? value : item))} />)}
            <div className="sm:col-span-2"><Field label="Descrição" multiline value={content.hero.description} onChange={(value) => update("hero.description", value)} /></div>
            <Field label="Botão principal" value={content.hero.primaryCta} onChange={(value) => update("hero.primaryCta", value)} />
            <Field label="Botão secundário" value={content.hero.secondaryCta} onChange={(value) => update("hero.secondaryCta", value)} />
            <div className="sm:col-span-2"><Field label="URL da imagem" type="url" hint="Use uma URL HTTPS. A imagem mantém um estado de segurança caso falhe." value={content.hero.image} onChange={(value) => update("hero.image", value)} /></div>
            <div className="sm:col-span-2"><Field label="Texto alternativo da imagem" value={content.hero.imageAlt} onChange={(value) => update("hero.imageAlt", value)} /></div>
            <Field label="Legenda da imagem" value={content.hero.imageLabel} onChange={(value) => update("hero.imageLabel", value)} />
            <Field label="Usuário do Instagram" value={content.hero.instagramLabel} onChange={(value) => update("hero.instagramLabel", value)} />
          </EditorSection>

          <EditorSection id="sobre" eyebrow="03" title="Sobre e números" description="Autoridade, apresentação e indicadores de confiança.">
            <Field label="Anos de mercado" type="number" value={content.about.years} onChange={(value) => update("about.years", value)} />
            <Field label="Legenda dos anos" value={content.about.yearsLabel} onChange={(value) => update("about.yearsLabel", value)} />
            <Field label="Título" value={content.about.title} onChange={(value) => update("about.title", value)} />
            <div className="sm:col-span-2"><Field label="Descrição" multiline value={content.about.description} onChange={(value) => update("about.description", value)} /></div>
            <Repeater
              items={content.about.stats}
              onChange={(value) => update("about.stats", value)}
              createItem={() => ({ value: "Novo dado", text: "Descrição do dado." })}
              addLabel="Adicionar indicador"
              renderItem={(item, index, updateItem) => <>
                <Field id={`stat-value-${index}`} label="Valor" value={item.value} onChange={(value) => updateItem(index, "value", value)} />
                <Field id={`stat-text-${index}`} label="Descrição" value={item.text} onChange={(value) => updateItem(index, "text", value)} />
              </>}
            />
          </EditorSection>

          <EditorSection id="pilares" eyebrow="04" title="Pilares" description="Seguros, imóveis e Lobos Coffee, incluindo imagens e mensagens dos CTAs.">
            <Field label="Título da seção" value={content.pillars.title} onChange={(value) => update("pillars.title", value)} />
            <Field label="Descrição da seção" value={content.pillars.description} onChange={(value) => update("pillars.description", value)} />
            {[
              ["insurance", "Seguros"],
              ["property", "Imóveis"],
              ["coffee", "Café"],
            ].map(([key, label]) => {
              const item = content.pillars[key];
              return <fieldset key={key} className="grid grid-cols-1 gap-4 border border-ink/15 bg-white/55 p-4 sm:col-span-2 sm:grid-cols-2">
                <legend className="px-2 font-display text-xl font-semibold">{label}</legend>
                <Field id={`${key}-title`} label="Título" value={item.title} onChange={(value) => update(`pillars.${key}.title`, value)} />
                <Field id={`${key}-cta`} label="Texto do botão" value={item.cta} onChange={(value) => update(`pillars.${key}.cta`, value)} />
                {key === "insurance" && <Field id="insurance-badge" label="Selo" value={item.badge} onChange={(value) => update("pillars.insurance.badge", value)} />}
                <div className="sm:col-span-2"><Field id={`${key}-description`} label="Descrição" multiline value={item.description} onChange={(value) => update(`pillars.${key}.description`, value)} /></div>
                <div className="sm:col-span-2"><Field id={`${key}-image`} label="URL da imagem" type="url" value={item.image} onChange={(value) => update(`pillars.${key}.image`, value)} /></div>
                <div className="sm:col-span-2"><Field id={`${key}-alt`} label="Texto alternativo da imagem" value={item.imageAlt} onChange={(value) => update(`pillars.${key}.imageAlt`, value)} /></div>
                {key === "insurance" && <div className="sm:col-span-2"><Field id="insurance-items" label="Tipos de seguro" hint="Um item por linha." multiline value={item.items.join("\n")} onChange={(value) => update("pillars.insurance.items", value.split("\n").filter(Boolean))} /></div>}
                {key !== "coffee" && <div className="sm:col-span-2"><Field id={`${key}-message`} label="Mensagem do WhatsApp" value={item.message} onChange={(value) => update(`pillars.${key}.message`, value)} /></div>}
              </fieldset>;
            })}
          </EditorSection>

          <EditorSection id="diferenciais" eyebrow="05" title="Diferenciais" description="Argumentos que sustentam a decisão de falar com Rodrigo.">
            <div className="sm:col-span-2"><Field label="Título da seção" value={content.differences.title} onChange={(value) => update("differences.title", value)} /></div>
            <Repeater
              items={content.differences.items}
              onChange={(value) => update("differences.items", value)}
              createItem={() => ({ icon: "shield", title: "Novo diferencial", text: "Explique o diferencial." })}
              addLabel="Adicionar diferencial"
              renderItem={(item, index, updateItem) => <>
                <Field id={`difference-title-${index}`} label="Título" value={item.title} onChange={(value) => updateItem(index, "title", value)} />
                <Field id={`difference-text-${index}`} label="Descrição" value={item.text} onChange={(value) => updateItem(index, "text", value)} />
              </>}
            />
          </EditorSection>

          <EditorSection id="depoimentos" eyebrow="06" title="Depoimentos" description="Adicione, edite ou remova relatos exibidos como prova social.">
            <Field label="Título da seção" value={content.testimonials.title} onChange={(value) => update("testimonials.title", value)} />
            <Field label="Texto de apoio" value={content.testimonials.description} onChange={(value) => update("testimonials.description", value)} />
            <Repeater
              items={content.testimonials.items}
              onChange={(value) => update("testimonials.items", value)}
              createItem={() => ({ quote: "Novo depoimento", author: "Nome do cliente", role: "Cliente" })}
              addLabel="Adicionar depoimento"
              renderItem={(item, index, updateItem) => <>
                <div className="sm:col-span-2"><Field id={`testimonial-quote-${index}`} label="Depoimento" multiline value={item.quote} onChange={(value) => updateItem(index, "quote", value)} /></div>
                <Field id={`testimonial-author-${index}`} label="Autor" value={item.author} onChange={(value) => updateItem(index, "author", value)} />
                <Field id={`testimonial-role-${index}`} label="Identificação" value={item.role} onChange={(value) => updateItem(index, "role", value)} />
              </>}
            />
          </EditorSection>

          <EditorSection id="fechamento" eyebrow="07" title="Fechamento e rodapé" description="Última chamada para ação e informações institucionais.">
            <Field label="Título do CTA" value={content.finalCta.title} onChange={(value) => update("finalCta.title", value)} />
            <Field label="Botão do CTA" value={content.finalCta.button} onChange={(value) => update("finalCta.button", value)} />
            <div className="sm:col-span-2"><Field label="Descrição do CTA" multiline value={content.finalCta.description} onChange={(value) => update("finalCta.description", value)} /></div>
            <div className="sm:col-span-2"><Field label="Descrição do rodapé" multiline value={content.footer.description} onChange={(value) => update("footer.description", value)} /></div>
            <Field label="Título de contato" value={content.footer.contactTitle} onChange={(value) => update("footer.contactTitle", value)} />
            <Field label="Título de redes" value={content.footer.networksTitle} onChange={(value) => update("footer.networksTitle", value)} />
          </EditorSection>

          <EditorSection id="aparencia" eyebrow="08" title="Aparência" description="Paleta global usada em todo o site e no painel.">
            {Object.entries(content.theme).map(([key, value]) => <ColorField key={key} label={key} value={value} onChange={(color) => update(`theme.${key}`, color)} />)}
          </EditorSection>

          <EditorSection id="avancado" eyebrow="09" title="Avançado" description="Edição integral, importação e cópia de segurança da configuração.">
            <div className="sm:col-span-2">
              <label htmlFor="advanced-json" className="text-sm font-semibold">Configuração JSON completa</label>
              <textarea id="advanced-json" className={`${fieldClass} min-h-[420px] resize-y font-mono text-xs leading-relaxed`} spellCheck="false" value={advancedJson} onChange={(event) => { setAdvancedJson(event.target.value); setAdvancedError(""); }} />
              {advancedError && <p className="mt-2 text-sm text-red-800" role="alert">{advancedError}</p>}
              <button type="button" className={`${buttonClass} mt-3 border-ink bg-ink text-paper hover:bg-rust`} onClick={applyAdvancedJson}>Aplicar JSON</button>
            </div>
            <div className="sm:col-span-2 flex flex-wrap gap-2 border-t border-ink/15 pt-5">
              <button type="button" className={`${buttonClass} border-ink/25 text-ink hover:border-rust hover:text-rust`} onClick={exportJson}><DownloadSimple size={17} aria-hidden="true" /> Exportar</button>
              <button type="button" className={`${buttonClass} border-ink/25 text-ink hover:border-rust hover:text-rust`} onClick={() => importRef.current?.click()}><UploadSimple size={17} aria-hidden="true" /> Importar</button>
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

          <div className="sticky bottom-4 flex items-center justify-between gap-3 border border-ink/20 bg-ink p-3 text-paper shadow-paper">
            <p className="hidden text-sm text-paper/60 sm:block">{dirty ? "Há alterações pendentes." : "Tudo salvo neste navegador."}</p>
            <button type="button" onClick={save} disabled={!dirty} className={`${buttonClass} ml-auto border-rust bg-rust text-paper hover:bg-rustDark`}>
              <FloppyDisk size={17} weight="bold" aria-hidden="true" /> {dirty ? "Salvar alterações" : "Alterações salvas"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminPage;
