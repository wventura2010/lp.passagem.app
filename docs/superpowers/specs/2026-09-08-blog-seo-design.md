# Blog estático para SEO e citação por IAs

**Data:** 2026-09-08
**Status:** Aprovado para implementação

## Contexto e objetivo

O site `fatura.passagem.app` é hoje uma landing page única (`index.html`), estática, sem build step, publicada direto na Vercel a partir do repositório GitHub `wventura2010/lp.passagem.app`. Já tem SEO básico resolvido: `robots.txt`, `sitemap.xml`, `llms.txt`, meta tags OG/Twitter, e JSON-LD (`FAQPage`, `Organization`, `WebSite`, `SoftwareApplication`).

O objetivo agora é publicar conteúdo em formato de blog para:
1. Ranquear organicamente no Google para buscas relacionadas ao nicho (agências de passagens, faturamento corporativo, OCD).
2. Ser citado por IAs de resposta (ChatGPT, Perplexity, AI Overviews) como referência factual sobre os termos do domínio.

Os dois objetivos pedem a mesma base: conteúdo claro, factual, bem estruturado, com dados estruturados (JSON-LD) e respostas diretas — não uma estratégia dividida.

## Escopo desta primeira leva

Dois artigos, escritos por Claude como rascunho e revisados pelo usuário antes de publicar:

1. **"OCD: o que é Ordem de Crédito de Devolução e como lançar na fatura do cliente"** — conteúdo definicional/factual, forte candidato a citação por IA; espelha e expande o FAQ já existente na home.
2. **"Como fechar o faturamento mensal de uma agência de viagens sem planilha"** — conteúdo de dor → solução, reforça a proposta de valor central do produto.

(Um terceiro tópico, sobre cálculo de taxa de serviço, foi cogitado e descartado para esta leva.)

## Abordagem técnica

**Páginas estáticas manuais**, seguindo exatamente o padrão visual e técnico do `index.html` atual (Tailwind via CDN, mesma paleta de cores/fontes, mesmo header/footer). Sem build step, sem dependência nova — publica do mesmo jeito que hoje (`git push` → deploy automático na Vercel).

Alternativas consideradas e descartadas:
- **Gerador de site estático (Eleventy/Astro) com Markdown**: mais escalável a longo prazo, mas introduz Node/`package.json`/build command — mudança de infraestrutura desproporcional para 2 artigos.
- **CMS ou plataforma de blog hospedada (Medium, etc.)**: adiciona vendor externo e custo, e o SEO/dados ficam fora do domínio do usuário.

Se o volume de conteúdo crescer muito no futuro (dezenas de posts), a opção do gerador estático deve ser reconsiderada — decisão fora do escopo desta spec.

## Estrutura de arquivos

```
/blog/
  index.html                              → listagem dos posts
  ocd-ordem-credito-devolucao/
    index.html                            → artigo 1
  fechar-faturamento-mensal-agencia/
    index.html                            → artigo 2
```

URLs limpas (a Vercel serve `index.html` de cada pasta automaticamente):
- `https://fatura.passagem.app/blog/`
- `https://fatura.passagem.app/blog/ocd-ordem-credito-devolucao/`
- `https://fatura.passagem.app/blog/fechar-faturamento-mensal-agencia/`

## Template e componentes

- Cada página (listagem e posts) reutiliza o header e footer exatos do `index.html` (logo, nav, cores, botão "Entrar", WhatsApp CTA), com um item **"Blog"** adicionado à navegação do header/footer em todas as páginas do site (incluindo a home).
- Corpo de cada post: título (`h1`), data de publicação, texto em prose (parágrafos, subtítulos, listas), encerrando com o mesmo CTA de WhatsApp usado no restante do site (reaproveitando o script `data-wa` já existente).
- Página de listagem (`/blog/index.html`): título da seção, cards com título + resumo + link de cada post.

## SEO por página

Cada post e a página de listagem recebem, no `<head>`:
- `<title>` e meta description específicos.
- `<link rel="canonical">` apontando para a própria URL limpa.
- Open Graph completo (`og:type=article` nos posts, `og:title`, `og:description`, `og:url`, `og:image` — reaproveitando uma imagem de tela do sistema já existente em `/images/`, quando fizer sentido para o tema).
- `meta name="twitter:card"`.
- JSON-LD `BlogPosting` por post (autor/publisher = `Organization` já definida no `index.html`, reaproveitando o `@id` `https://fatura.passagem.app/#organizacao`), com `headline`, `datePublished`, `description`, `mainEntityOfPage`.

## Sitemap, robots e llms.txt

- `sitemap.xml`: adicionar `/blog/` e as duas URLs de post, com `lastmod` na data de publicação.
- `robots.txt`: sem alteração (já libera `/` por completo).
- `llms.txt`: adicionar uma seção listando os dois posts com link e resumo de uma linha, já que o arquivo existe para orientar IAs sobre o conteúdo disponível no site.

## Interlinking

- A página de listagem do blog linka de volta para seções relevantes da home (ex: FAQ, recursos).
- Cada post linka de volta para a seção correspondente da home:
  - O post de OCD linka para a pergunta "O que é uma OCD?" no FAQ (`#faq`).
  - O post de faturamento sem planilha linka para a seção "Como funciona" (`#como-funciona`) e/ou "Recursos" (`#recursos`).
- A home ganha um link "Blog" na navegação (header e footer) apontando para `/blog/`.

## Fora de escopo

- O terceiro artigo (taxa de serviço), descartado nesta rodada.
- Qualquer gerador de site estático, CMS ou pipeline de build.
- RSS feed (pode ser considerado depois, se o volume de posts justificar).
- Redesenho visual do site — os posts seguem exatamente o design já existente.

## Testagem/verificação antes de publicar

- Validar cada bloco JSON-LD com `node -e "JSON.parse(...)"`, como já feito para os schemas existentes.
- Conferir renderização local dos arquivos HTML (abrir no navegador) antes do commit.
- Após deploy, rodar o [Rich Results Test](https://search.google.com/test/rich-results) do Google nas URLs dos posts.
- Conferir links internos (home ↔ blog) manualmente.
