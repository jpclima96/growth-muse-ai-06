# AI Growth Ideas Generator

Gere estratégias de growth acionáveis, experimentos e ideias de campanha em segundos — com IA treinada em frameworks reais de growth (AARRR, CRO, funnel thinking).

Pensado para **marketers, founders e profissionais de growth** que precisam de um copiloto estratégico, não de um gerador genérico de ideias.

---

## Funcionalidades

- **Formulário inteligente** com indústria, produto/serviço, audiência-alvo, objetivo de negócio, canais de marketing, orçamento, maturidade da empresa e nível de criatividade.
- **Estratégia estruturada em 4 blocos:**
  - Growth Ideas (7 ideias com impacto estimado)
  - Plano de Experimentação (hipóteses + métricas de sucesso)
  - Channel Strategy (alocação de budget por canal)
  - Quick Wins (ações de alto impacto e baixo esforço)
- **Slider de criatividade** — do conservador ao agressivo/não-convencional.
- **Histórico local** das últimas 20 gerações (armazenado no navegador).
- **Copiar para clipboard** em um clique.
- **Regenerar** a mesma estratégia com novas variações.

---

## Stack tecnológica

- **Frontend:** React 18, Vite 5, TypeScript 5
- **UI:** Tailwind CSS + shadcn/ui (design system com tokens semânticos e dark mode)
- **Backend:** Lovable Cloud (Supabase gerenciado) + Edge Functions (Deno)
- **IA:** Lovable AI Gateway — modelo `google/gemini-3-flash-preview`
- **Ícones:** Lucide React
- **Notificações:** Sonner

---

## Arquitetura

```text
src/
├── components/
│   ├── GrowthForm.tsx        # Formulário multi-input
│   ├── ResultsSection.tsx    # Cards de resultado + copy to clipboard
│   ├── HistorySidebar.tsx    # Histórico local (localStorage)
│   ├── LoadingState.tsx      # Estado de carregamento animado
│   └── ui/                   # Componentes shadcn/ui
├── pages/
│   ├── Index.tsx             # Página principal
│   └── NotFound.tsx
├── types/
│   └── growth.ts             # Tipos TypeScript da estratégia
├── integrations/supabase/    # Cliente Supabase (auto-gerado)
├── index.css                 # Design tokens (HSL) + glass-morphism
└── main.tsx

supabase/
└── functions/
    └── generate-growth-ideas/  # Edge function que chama o Lovable AI Gateway
        └── index.ts
```

A regra é simples: **componentes apresentacionais no `src/components`**, **lógica de IA no edge function**, **tipos compartilhados em `src/types`**.

---

## Como rodar localmente

### Pré-requisitos

- [Bun](https://bun.sh/) (recomendado) ou Node.js 18+
- O arquivo `.env` é **gerenciado automaticamente** pelo Lovable Cloud — não edite manualmente.

### Passos

```bash
# Instalar dependências
bun install

# Iniciar o servidor de desenvolvimento
bun run dev
```

A aplicação abre em `http://localhost:5173`.

---

## Scripts disponíveis

| Comando            | Descrição                              |
| ------------------ | -------------------------------------- |
| `bun run dev`      | Inicia o dev server (Vite + HMR)       |
| `bun run build`    | Gera o build de produção               |
| `bun run preview`  | Pré-visualiza o build local            |
| `bun run lint`     | Roda o ESLint                          |
| `bunx vitest run`  | Executa os testes unitários            |

---

## Frameworks de growth aplicados

O prompt do edge function instrui a IA a raciocinar como um **senior growth lead**, aplicando:

- **AARRR (Pirate Metrics)** — Acquisition, Activation, Retention, Referral, Revenue
- **CRO** — Otimização de conversão em cada etapa do funil
- **Funnel thinking** — Diagnóstico do gargalo antes de propor solução
- **Growth hacking moderno** — UGC, loops virais, parcerias com creators, automação

Cada ideia gerada vem com uma justificativa (`whyItWorks`) que referencia esses frameworks.

---

## Deploy

O projeto é publicado diretamente pelo **Lovable**:

1. Abra o projeto no editor Lovable.
2. Clique em **Publish** no topo direito.
3. (Opcional) Conecte um domínio customizado nas configurações de publicação.

O backend (Lovable Cloud) e as edge functions são deployados automaticamente.

---

## Licença

MIT — sinta-se livre para usar, adaptar e contribuir.
