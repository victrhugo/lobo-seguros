# Site — Rodrigo Lobo (Lobo Corretora)

Brief pra Codex construir. Site institucional de conversão, uma página, foco WhatsApp.

## Contexto do negócio

- Nome: Rodrigo Lobo — LOBO CORRETORA®, 20 anos de mercado.
- Três frentes de atuação:
  1. **Seguros** (auto, vida, residencial, etc.) — pilar principal.
  2. **Imóveis** (venda e locação) — inclui destaques tipo terrenos/casas (ex: Campos do Conde) e galpão.
  3. **Cafés Especiais** — marca "Lobos Coffee", mais lifestyle/branding pessoal.
- Fonte principal de identidade e conteúdo: perfil Instagram [@rodrigollobo](https://www.instagram.com/rodrigollobo/). Perfil verificado, 19,7 mil seguidores na consulta de 29/08/2026. Bio: "Transformo sonhos em imóveis, segurança em tranquilidade e café em paixão."
- Contato único de conversão: WhatsApp `wa.me/5512981797300`.

## Objetivo do site

Landing one-page que gera lead via WhatsApp. Site como cartão de visita/funil de confiança — não é loja, não tem checkout, não tem blog (por enquanto).

## Escopo

Hub multi-vertical. Um pilar (Seguros) é o principal/mais forte em espaço e hierarquia; Imóveis é secundário; Café é o mais leve (mais estético/branding, CTA secundário, não compete por atenção com Seguros).

## Stack

- Vite + React + Tailwind
- GSAP + ScrollTrigger pra animação de scroll
- Framer Motion pra micro-interação (hover, tap, estados)
- Sem back-end. Deploy estático (Vercel/Netlify).
- Assets: usar placeholder/imagem gerada por IA por enquanto — trocar por fotos reais depois. Deixar comentário/marcação clara em cada `src` de imagem placeholder pra facilitar troca futura (ex: `data-placeholder="true"` ou nome de arquivo `placeholder-*`).

## Direção visual — IMPORTANTE

**Não usar dourado/amarelo-ouro.** Esse tom tá associado a template de IA genérico (gradiente dourado, glassmorphism dourado, etc.) — queremos o oposto disso: parecer feito por gente, não por IA.

Paleta:

- **Base escura:** quase-preto quente, não azulado. Ex: `#15140F` / `#1A1812`.
- **Base clara / papel:** off-white quente, tipo papel kraft/bone. Ex: `#F4EFE4`.
- **Acento único:** terracota/ferrugem queimada, usado com moderação (CTA, hover, detalhe). Ex: `#B0472A` / `#A8492E`. Nada de gradiente nele — cor chapada.
- **Acento secundário (opcional, só na seção café):** verde musgo/sálvia escuro. Ex: `#4A5A42`.

Regras:
- Sem gradiente decorativo. Cor chapada.
- Sem glassmorphism, sem drop-shadow neon, sem blur exagerado.
- Contraste tipográfico forte (título grande/condensado vs corpo menor), estilo editorial — não "corporate SaaS".
- Motion com propósito: reveal no scroll, contador animado (20 anos, nº clientes), hover state nos cards. Nada de animação decorativa sem função.
- Ícones: line icons simples, sem emoji, sem ícone 3D.

## Estrutura da página (sections)

1. **Hero**
   - Nome + claim curto (ex: "Segurança, imóvel e café — resolvido numa conversa só").
   - CTA WhatsApp primário, visível sem scroll.
   - Menção "20 anos de mercado" logo de cara.

2. **Sobre / Autoridade**
   - Lobo Corretora, 20 anos, o que diferencia (multi-serviço, atendimento pessoal).
   - Prova social (seguidores Instagram, nº clientes/anos — usar placeholder de número até confirmar dado real).

3. **Três pilares** (bento grid ou cards assimétricos — Seguros maior que os outros dois)
   - **Seguros**: tipos de seguro oferecidos, CTA WhatsApp com mensagem pré-preenchida específica de seguro.
   - **Imóveis**: destaques de imóveis disponíveis (placeholder), CTA WhatsApp específico.
   - **Café** (Lobos Coffee): mais visual/lifestyle, CTA secundário (pode linkar Instagram em vez de WhatsApp, já que é mais brand que lead).

4. **Diferenciais**
   - Por que fechar com ele: 20 anos, atendimento direto, multi-serviço, confiança local.

5. **Depoimentos / prova social**
   - Placeholder de 2–3 depoimentos até vir conteúdo real.

6. **CTA final**
   - WhatsApp grande, full-width. No mobile, botão sticky de WhatsApp sempre visível.

7. **Footer**
   - Contato (WhatsApp) e Instagram. Endereço se/quando disponível (placeholder por enquanto).

## Copy — tom de voz

Direto, confiante, sem jargão corporativo. Frases curtas. Português informal-profissional (ele mesmo fala assim no Instagram: "Transformo sonhos em imóveis..."). Evitar clichê tipo "sua solução completa em..." — soa genérico/IA.

## Fora de escopo (por enquanto)

- Blog / conteúdo dinâmico
- Formulário de contato (usar só WhatsApp)
- Catálogo completo de imóveis com filtro (é vitrine, não portal)
- Autenticação, área de cliente, pagamento
