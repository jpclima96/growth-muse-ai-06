# Plano: Criar README.md

Substituir o `README.md` atual (apenas um TODO) por uma documentação completa e profissional do projeto **AI Growth Ideas Generator**.

## Estrutura do README

1. **Título + tagline** — "AI Growth Ideas Generator" com descrição curta sobre gerar estratégias de growth com IA.
2. **Sobre o projeto** — o que faz, para quem é (marketers, founders, growth pros).
3. **Funcionalidades principais**
   - Formulário multi-input (indústria, produto, audiência, objetivo, canais, budget, maturidade, criatividade)
   - Geração de estratégia estruturada (Growth Ideas, Experimentos, Channel Strategy, Quick Wins)
   - Histórico local das gerações
   - Copiar resultados para clipboard
   - Slider de criatividade
4. **Stack tecnológica**
   - React 18 + Vite + TypeScript
   - Tailwind CSS + shadcn/ui
   - Lovable Cloud (backend gerenciado) + Edge Functions
   - Lovable AI Gateway (modelo `google/gemini-3-flash-preview`)
5. **Arquitetura** — breve descrição de `src/components`, `src/pages`, `src/types`, `supabase/functions/generate-growth-ideas`.
6. **Como rodar localmente**
   - Pré-requisitos (Node/Bun)
   - `bun install`
   - `bun run dev`
   - Nota sobre variáveis de ambiente (`.env` é auto-gerenciado pelo Lovable Cloud)
7. **Scripts disponíveis** — dev, build, preview, test, lint.
8. **Estrutura de pastas** — árvore resumida em bloco ```text.
9. **Frameworks de growth aplicados** — AARRR, CRO, funnel thinking (usados no prompt da IA).
10. **Deploy** — instruções rápidas via Lovable (Publish) e domínio customizado.
11. **Licença** — placeholder (MIT, a confirmar).

## Detalhes técnicos

- Arquivo: `README.md` na raiz (sobrescrever o existente).
- Idioma: **Português** (alinhado com a mensagem do usuário).
- Formato Markdown padrão, com badges opcionais (Vite, React, TypeScript, Tailwind).
- Sem emojis excessivos, tom profissional.
- Bloco de código para comandos shell e estrutura de pastas.

## Fora de escopo

- Não alterar nenhum código-fonte da aplicação.
- Não adicionar CONTRIBUTING.md, LICENSE ou CHANGELOG (pode ser pedido depois).
