# Elevia — Site institucional

Site institucional da Elevia. Astro + Tailwind, estático, multi-idioma (PT / EN).

**Live:** https://itsjustiago.github.io/elevia/

## Stack

- [Astro](https://astro.build) (output estático)
- [Tailwind CSS v4](https://tailwindcss.com)
- MDX para case studies
- i18n nativo do Astro (PT default, EN com prefixo `/en/`)
- Deploy automático para GitHub Pages via GitHub Actions

## Correr localmente

```bash
npm install
npm run dev
# → http://localhost:4321/elevia/
```

Outros comandos:

```bash
npm run build      # build de produção em ./dist
npm run preview    # serve o ./dist como o GH Pages serve
```

## Estrutura

```
src/
├── pages/
│   ├── index.astro                 # home PT
│   ├── en/index.astro              # home EN
│   ├── projetos/[slug].astro       # case study PT
│   └── en/projects/[slug].astro    # case study EN
├── layouts/Base.astro
├── components/                     # Hero, Services, Project*, About, Contact, Nav, Footer, Toggles
├── content/
│   └── projects/                   # Case studies em MDX
├── content.config.ts               # schema das collections
├── i18n/                           # ui.ts (strings) + utils.ts (helpers)
└── styles/global.css               # Tailwind @theme + tokens
```

## Adicionar um projeto novo

1. Cria dois ficheiros em `src/content/projects/`:
   - `pt-meu-projeto.mdx` (versão PT)
   - `en-my-project.mdx` (versão EN)
2. Usa este frontmatter:

```yaml
---
title: "Nome do Projeto"
summary: "Descrição curta de uma linha."
client: "Cliente (opcional, omitir se NDA)"
role: "O que fizeste"
year: 2026
stack: ["Astro", "Tailwind", "Outra-tech"]
url: "https://link-do-projeto.pt"   # opcional
locale: "pt"                         # ou "en"
demo: false                          # true se for placeholder
featured: false
order: 1                             # ordem na grid (menor = aparece primeiro)
---

## Secção 1
Markdown normal aqui.
```

3. Commit + push → GH Actions reconstrói automaticamente.

> O slug da URL é o nome do ficheiro **sem o prefixo de idioma** (`pt-` ou `en-`). Mantém o mesmo slug-base nas duas versões para o toggle de idioma manter o utilizador na mesma página.

## Editar strings (textos)

Todas as strings traduzidas estão em [src/i18n/ui.ts](src/i18n/ui.ts). Acrescenta a chave nos dois objectos (`pt` e `en`) e usa `t('a.minha.chave')` em qualquer `.astro`.

## Form de contacto

Hoje é um placeholder em `mailto:` (abre o cliente de email do utilizador). Quando quiser receber mensagens via API, substituir o handler de `submit` em [src/components/ContactForm.astro](src/components/ContactForm.astro) por um POST para Formspree / Resend / etc.

Email destino: `contacto@elevia.pt` (mudar em `ContactForm.astro` se preciso).

## Deploy

Push para `main` → o workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) faz build e publica em GH Pages.

**Setup inicial (apenas uma vez):** Settings do repo → Pages → Source: **GitHub Actions**.

## Princípios de design

- **Zero gradientes.** Tudo cor sólida.
- Tipografia carrega o peso (Geist display).
- Macro-whitespace, secções respiram.
- Dark mode é first-class (toggle no nav).
- Anti-AI-slop: sem stock photos, sem mockups 3D, sem ícones genéricos.
