# Playwright Playground — Next.js + Ant Design

Uma especificação completa (README) para uma LLM gerar um **Playground de Automação** com **Next.js + Ant Design + Playwright**. O foco é estudo prático: UI rica, rotas de API simples e cenários clássicos de testes (fáceis, médios, difíceis, API e API+Tela), com **`data-testid` únicos em todos os elementos** e um **testador de XPath** presente em todas as páginas.

---

## 🎯 Objetivo

Criar uma **plataforma gratuita** e bonita para aprender testes automatizados com **Playwright**.  
O app terá:
- **Landing page** com proposta, CTA, seção de doação e contato.
- **Página Inicial** com dois botões: **Desafios** e **Começar**.
- **Desafios**: tabela com vários desafios de automação.
- **Começar**: escolha de um **roadmap**: **Fáceis**, **Médios**, **Difíceis**, **Testes de API**, **Testes de API + Tela**.
- Páginas do roadmap:
  - **Fáceis**: muitos componentes simples (Button, Select, etc.).
  - **Médios**: **uploads de arquivos** e validações.
  - **Difíceis**: **iframes** (mesma origem) e interações aninhadas.
  - **API**: testes de **GET/POST** em rotas Next, com **persistência em `localStorage`**.
  - **API + Tela**: UI que consome as rotas e **salva localmente no navegador**.
- **Tema claro/escuro** com **Ant Design v5**, iniciando **claro** e com alternância persistida.
- **Todos os elementos relevantes têm `data-testid` únicos**.
- **Cada página contém um Testador de XPath** (campo + botão para avaliar, contar e destacar resultados).

---

## 🧰 Stack & Requisitos

- **Next.js 14+** (App Router, TypeScript).
- **Ant Design 5** (`antd/dist/reset.css`, `ConfigProvider`).
- **Playwright** (TypeScript).
- **ESLint + Prettier**.
- Persistência de cliente: **`localStorage`**.
- Sem banco; rotas **API do Next** simulam back-end.
- **Mesmo domínio** para páginas embedadas (iframes) → evita restrições cross-origin.

---

## 🗂️ Estrutura de Pastas (sugestão)

```
playwright-playground/
├─ app/
│  ├─ layout.tsx
│  ├─ globals.css
│  ├─ page.tsx                       # Landing (plataforma gratuita, doação, contato)
│  ├─ home/page.tsx                  # Página inicial com botões: Desafios / Começar
│  ├─ desafios/page.tsx              # Tabela de desafios
│  ├─ comecar/page.tsx               # Cards do roadmap: Fácil, Médio, Difícil, API, API+Tela
│  ├─ roadmap/
│  │  ├─ facil/page.tsx              # Muitos componentes simples (AntD)
│  │  ├─ medio/page.tsx              # Uploads de arquivos
│  │  ├─ dificil/page.tsx            # Iframes (mesma origem)
│  │  ├─ api/page.tsx                # Testes de API (GET/POST), salvar em localStorage
│  │  └─ api-tela/page.tsx           # UI + API, persistência local
│  ├─ embeds/
│  │  ├─ form/page.tsx               # Conteúdo para iframes
│  │  └─ table/page.tsx
│  └─ api/
│     ├─ ping/route.ts               # GET: {ok:true}
│     ├─ echo/route.ts               # POST: ecoa body + serverTimestamp
│     └─ todos/route.ts              # GET/POST/DELETE: mock simples
├─ components/
│  ├─ ThemeSwitcher.tsx
│  ├─ Header.tsx
│  ├─ Footer.tsx
│  ├─ Donation.tsx
│  ├─ ContactForm.tsx
│  ├─ ChallengeTable.tsx
│  ├─ XPathTester.tsx
│  └─ UiKits/...(inputs, tables, etc.)
├─ lib/
│  ├─ storage.ts                     # helpers de localStorage
│  └─ challenges.ts                  # loader de desafios
├─ data/challenges.json
├─ tests/                            # Playwright specs
│  ├─ home.spec.ts
│  ├─ desafios.spec.ts
│  ├─ facil.spec.ts
│  ├─ medio-upload.spec.ts
│  ├─ dificil-iframe.spec.ts
│  ├─ api.spec.ts
│  └─ api-tela.spec.ts
├─ playwright.config.ts
├─ package.json
└─ README.md
```

---

## 🖥️ Landing Page (pública e bonita)

**Seções:**
1. **Hero**: título, subtítulo e CTAs (**Começar** / **Desafios**).
2. **Como funciona**: cards rápidos com ícones (UI, Uploads, Iframes, API).
3. **Para quem é?**: lista (QA iniciante, automação, API, E2E).
4. **Doação**: texto curto + botão (placeholder) e opção PIX/QR code (imagem/placeholder).
5. **Contato**: formulário (nome, e-mail, mensagem) → **salvar em `localStorage`** + toast de sucesso.
6. **Rodapé**: links úteis, troca de tema.

**Ant Design**: usar `Layout`, `Typography`, `Button`, `Card`, `Form`, `Input`, `Space`, `Grid`, `Flex`.

> **Todos os elementos devem conter `data-testid` seguindo a convenção definida abaixo.**

---

## 🧭 Home (/home)

- Dois botões grandes: **Desafios** e **Começar** (AntD `Button` com `icon`).
- Pequeno resumo de cada caminho.
- **Widget de Teste de XPath** no topo.

**Exemplos de `data-testid`:**
- Botão “Desafios”: `pp:home|main|btn|desafios`
- Botão “Começar”: `pp:home|main|btn|comecar`

---

## 🗒️ Desafios (/desafios)

- Tabela (**AntD Table**) com colunas:
  - **ID**, **Título**, **Nível** (Tag: Fácil/Médio/Difícil/API/API+Tela),
  - **Tipo** (UI, Upload, Iframe, API, E2E),
  - **Tags** (AntD `Tag`),
  - **Ação**: botão **“Ver”** que navega para a página do roadmap correspondente.
- Origem dos dados: `data/challenges.json`.
- **Widget de Teste de XPath** no topo.

**Exemplo `data/challenges.json`:**
```json
[
  { "id": 1, "titulo": "Clicar e validar contador", "nivel": "Fácil", "tipo": "UI", "tags": ["button","state"], "rota": "/roadmap/facil" },
  { "id": 2, "titulo": "Selecionar item e filtrar", "nivel": "Fácil", "tipo": "UI", "tags": ["select","filter"], "rota": "/roadmap/facil" },
  { "id": 3, "titulo": "Upload CSV e pré-visualização", "nivel": "Médio", "tipo": "Upload", "tags": ["upload","csv"], "rota": "/roadmap/medio" },
  { "id": 4, "titulo": "Form dentro de iframe", "nivel": "Difícil", "tipo": "Iframe", "tags": ["iframe","form"], "rota": "/roadmap/dificil" },
  { "id": 5, "titulo": "POST /api/echo e persistir", "nivel": "API", "tipo": "API", "tags": ["post","storage"], "rota": "/roadmap/api" },
  { "id": 6, "titulo": "Todos: criar via API e listar", "nivel": "API+Tela", "tipo": "E2E", "tags": ["todo","api","ui"], "rota": "/roadmap/api-tela" }
]
```

---

## 🗺️ Começar (/comecar)

Exibir **cards** (AntD `Card`) de roadmap:
- **Fáceis** → `/roadmap/facil`
- **Médios** → `/roadmap/medio`
- **Difíceis** → `/roadmap/dificil`
- **Testes de API** → `/roadmap/api`
- **Testes de API + Tela** → `/roadmap/api-tela`

Cada card com: descrição, exemplos do que será praticado, botão **Ir**.  
**Incluir `XPathTester`** e `data-testid` em tudo.

---

## 🧩 Roadmap Fáceis (/roadmap/facil)

Página “cheia de componentes” para prática (todos com `data-testid`):
- **Button** (incrementar contador, desabilitar, loading).
- **Input**, **InputNumber**, **Select**, **Cascader**.
- **Checkbox**, **Radio**.
- **DatePicker**, **TimePicker**.
- **Slider**, **Rate**.
- **Switch** (tema claro/escuro também no Header).
- **Tabs**, **Collapse**, **Modal**, **Tooltip**.
- **Table** simples (ordenar/filtrar).
- Pequenos **desafios** textuais ao lado (Checklist).  
**Incluir `XPathTester`.**

---

## 📦 Roadmap Médios (/roadmap/medio)

Cenários com **Upload** (todos com `data-testid`):
- **Upload** single e múltiplo (AntD `Upload`).
- Arrastar-e-soltar com `beforeUpload` simulando validação (tipo/tamanho).
- Pré-visualizar **CSV** (ler com FileReader).
- Exibir erros amigáveis (AntD `message` / `Alert`).  
**Incluir `XPathTester`.**

---

## 🧭 Roadmap Difíceis (/roadmap/dificil)

**Iframes (mesma origem)**:
- Incluir iframes com páginas internas: `/embeds/form` e `/embeds/table`.
- **Desafios**:
  - Preencher formulário no iframe e validar toast no pai.
  - Clicar em botão dentro do iframe que altera algo fora (via `postMessage`).
  - Interagir com **iframe dentro de iframe** (aninhado).  
**Incluir `XPathTester`** e `data-testid` tanto no elemento `iframe` do pai quanto nos conteúdos das páginas **embedadas**.

---

## 🔌 Roadmap API (/roadmap/api)

UI para **testar rotas**:
- Formulário `GET /api/ping`.
- Formulário `POST /api/echo` (JSON).
- Exibir a resposta e **persistir no `localStorage`** (chave ex.: `pp_api_history`).
- Botão “Limpar histórico”.  
**Incluir `XPathTester`** e `data-testid` em todos os controles.

### Rotas API (Next App Router)
- `GET /api/ping` → `{ ok: true, serverTimestamp: ISOString }`
- `POST /api/echo` → ecoa o body + `{ serverTimestamp }`

> Persistência “oficial” é **no navegador** (localStorage). O servidor é **stateless**.

---

## 🔀 Roadmap API + Tela (/roadmap/api-tela)

**App de TODOs** (todos os elementos com `data-testid`):
- Form para **criar** via `POST /api/todos`.
- **Listar** via `GET /api/todos`.
- **Remover** via `DELETE /api/todos?id=...` (ou body).
- A UI sempre **salva/replica** a lista **no `localStorage`** (`pp_todos`), e “sincroniza” quando chama a API.
- Caso a API falhe, manter **fallback** local e exibir `Alert`.  
**Incluir `XPathTester`.**

### Rotas API (mock simples)
- `GET /api/todos` → lista em memória (reinicia a cada boot).
- `POST /api/todos` → cria item `{ id, text, done, createdAt }`.
- `DELETE /api/todos` → remove por `id`.

---

## 🎨 Tema Claro/Escuro (AntD)

- Usar `ConfigProvider` com `theme: { algorithm: defaultAlgorithm | darkAlgorithm }`.
- **Iniciar no tema claro**; mudar via `ThemeSwitcher` (AntD `Switch` no Header).
- Persistir preferência em `localStorage` (`pp_theme = "light" | "dark"`).

**Exemplo de layout (trecho):**
```tsx
// app/layout.tsx
'use client';
import { ConfigProvider, theme as antdTheme } from 'antd';
import 'antd/dist/reset.css';
import { useEffect, useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'light'|'dark'>('light');

  useEffect(() => {
    const saved = window.localStorage.getItem('pp_theme') as 'light'|'dark'|null;
    if (saved) setMode(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('pp_theme', mode);
  }, [mode]);

  return (
    <html lang="pt-BR">
      <body>
        <ConfigProvider
          theme={{
            algorithm: mode === 'dark'
              ? antdTheme.darkAlgorithm
              : antdTheme.defaultAlgorithm,
          }}
        >
          {/* Header com switch para trocar `mode` (data-testid="pp:layout|header|switch|tema") */}
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
```

---

## 💾 Persistência no Navegador

**Helpers (`lib/storage.ts`)**:
- `getJSON(key, fallback)`
- `setJSON(key, value)`
- chaves: `pp_theme`, `pp_api_history`, `pp_todos`, `pp_contact_msgs`

---

## 📮 Contato (Landing)

- `ContactForm` (AntD `Form`) com campos **Nome**, **E-mail**, **Mensagem**.
- Ao enviar, salvar em `localStorage` (`pp_contact_msgs`) e mostrar `message.success`.
- Sem backend real (proposital, para prática).
- **Todos os campos e botões com `data-testid`** e **`XPathTester`** no topo da página.

---

## ⚙️ Scripts (package.json)

```json
{
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start -p 3000",
    "lint": "eslint .",
    "test:e2e": "playwright test",
    "test:ui": "playwright test --ui",
    "codegen": "playwright codegen http://localhost:3000"
  }
}
```

---

## 🧪 Playwright

**Config básico (`playwright.config.ts`)**
```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    testIdAttribute: 'data-testid',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } }
  ],
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI
  }
});
```

**Exemplos de testes (resumo):**

- `home.spec.ts`
  - Navegar `/home`, clicar **Desafios** → `/desafios`.
  - Voltar e clicar **Começar** → `/comecar`.
  - Trocar tema e validar persistência (recarregar e verificar).

- `desafios.spec.ts`
  - Validar colunas, filtros e navegação por “Ver”.

- `facil.spec.ts`
  - Clicar botão que incrementa contador.
  - Preencher `Input`, `Select`, marcar `Checkbox` & `Radio`.
  - Abrir `Modal`, interagir, fechar.
  - Ordenar `Table` e validar.

- `medio-upload.spec.ts`
  - Fazer upload de um CSV.
  - Checar pré-visualização e mensagens de erro para arquivo inválido.

- `dificil-iframe.spec.ts`
  - Acessar `/roadmap/dificil`.
  - Entrar no iframe (`frameLocator`), preencher form, enviar.
  - Validar efeito no pai e no iframe aninhado.

- `api.spec.ts`
  - Chamar `GET /api/ping` via UI e validar resposta na tela.
  - Enviar `POST /api/echo` com JSON e validar **persistência em `localStorage`**.

- `api-tela.spec.ts`
  - Criar TODO via UI (que chama API).
  - Verificar lista, remover item, recarregar e validar sync com `localStorage`.

**Snippet de teste do XPath Tester:**
```ts
import { test, expect } from '@playwright/test';

test('XPath tester encontra o botão Começar na /home', async ({ page }) => {
  await page.goto('/home');

  // O próprio botão possui testid:
  const btn = page.getByTestId('pp:home|main|btn|comecar');
  await expect(btn).toBeVisible();

  // Usar o tester:
  const input = page.getByTestId('pp:home|xpath|input|expr');
  await input.fill('//*[@data-testid="pp:home|main|btn|comecar"]');
  await page.getByTestId('pp:home|xpath|btn|testar').click();

  await expect(page.getByTestId('pp:home|xpath|alert|resultado')).toContainText('1 elemento(s)');
});
```

---

## 🔒 Regras para Iframes

- **Sempre mesma origem** (usar rotas internas `/embeds/*`).
- Para comunicação pai ↔ iframe, usar **`window.postMessage`** com `targetOrigin='*'` (ou mesmo origin) e listeners dedicados.

---

## 🧑‍🎓 Seção de Doação

- Card com texto: “Se este Playground te ajuda, considere apoiar 💙”.
- Botão **Doar** (placeholder) e espaço para **PIX/QR** (imagem placeholder).
- Sem transação real (somente UI).

---

## ✅ Critérios de Aceite (LLM)

1. **Next.js App Router + TypeScript** funcionando com AntD 5 (tema inicia **claro** e alterna).
2. **Landing page** com hero, como funciona, doação e contato (contato salva no `localStorage`).
3. **/home** com botões **Desafios** e **Começar**, todos com `data-testid`.
4. **/desafios** mostra tabela a partir de `data/challenges.json` com `data-testid` coerentes.
5. **/comecar** exibe cards do roadmap (Fácil/Médio/Difícil/API/API+Tela).
6. **/roadmap/facil** possui ampla variedade de componentes AntD com pequenos desafios e `data-testid`.
7. **/roadmap/medio** implementa uploads (single, múltiplo, dnd), pré-visualização de CSV e validação.
8. **/roadmap/dificil** usa iframes de **mesma origem** e desafios de interação.
9. **/roadmap/api** chama **/api/ping** (GET) e **/api/echo** (POST), **salvando histórico em `localStorage`**.
10. **/roadmap/api-tela** implementa TODOs que chamam **/api/todos** e **sincronizam com `localStorage`**.
11. **Playwright** com specs cobrindo navegação, UI, upload, iframe, API e persistência local.
12. **Widget de Teste de XPath** presente em **todas** as páginas e **destaca** matches.
13. Scripts `dev`, `build`, `start`, `test:e2e`, `test:ui` prontos.

---

## 📌 Notas de Acessibilidade

- Usar `aria-label` em botões de tema e navegação.
- `Form.Item` com `name` e `label` coerentes.
- Contraste ok nos dois temas.
- `aria-live="polite"` no resultado do **XPath Tester**.

---

## 🔎 Convenção de `data-testid` (detalhada)

- Formato: `pp:<page>|<section>|<role>|<name>[#<index>]`
  - `page`: `landing`, `home`, `desafios`, `comecar`, `facil`, `medio`, `dificil`, `api`, `api-tela`, `embed-form`, `embed-table`
  - `section`: `hero`, `nav`, `table`, `form`, `upload`, `iframe`, `todo`, `donation`, `contact`, etc.
  - `role`: `btn`, `input`, `select`, `table`, `row`, `modal`, `switch`, `link`, `card`, etc.
  - `name`: rótulo curto e estável
  - `index`: quando houver repetição; preferir ID do dado
- Regras:
  - Nunca aleatório.
  - Em `Table`, usar `rowKey` + `onRow` para colocar `data-testid` por linha.
  - Caso um componente AntD não propague `data-*`, embrulhar com `<div data-testid="...">`.

**Exemplo Table com testids:**
```tsx
<Table
  data-testid="pp:desafios|table|table|root"
  rowKey={(r) => String(r.id)}
  rowClassName={(r) => `row--id-${r.id}`}
  onRow={(record) => ({
    'data-testid': `pp:desafios|table|row|challenge#${record.id}`,
  })}
  columns={[
    { title: 'ID', dataIndex: 'id' },
    { title: 'Título', dataIndex: 'titulo' },
    { title: 'Nível', dataIndex: 'nivel' },
    {
      title: 'Ação',
      render: (_, rec) => (
        <Button
          data-testid={`pp:desafios|table|btn|ver#${rec.id}`}
          onClick={() => router.push(rec.rota)}
        >
          Ver
        </Button>
      )
    }
  ]}
  dataSource={challenges}
/>
```

---

## 🧩 Componente `XPathTester.tsx`

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Space, Typography, Alert } from 'antd';

const HIGHLIGHT_CLASS = 'pp-xpath-highlight';

function clearHighlights() {
  document.querySelectorAll(`.${HIGHLIGHT_CLASS}`).forEach((el) => {
    el.classList.remove(HIGHLIGHT_CLASS);
    (el as HTMLElement).style.outline = '';
    (el as HTMLElement).style.outlineOffset = '';
  });
}

function highlight(nodes: Node[]) {
  nodes.forEach((n) => {
    if (n instanceof HTMLElement) {
      n.classList.add(HIGHLIGHT_CLASS);
      n.style.outline = '3px dashed';
      n.style.outlineOffset = '2px';
    }
  });
}

export default function XPathTester({ pageId }: { pageId: string }) {
  const [xpath, setXpath] = useState('');
  const [count, setCount] = useState<number | null>(null);
  const liveRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => clearHighlights(), []);

  const onTest = () => {
    clearHighlights();
    if (!xpath.trim()) {
      setCount(0);
      return;
    }
    try {
      const result = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
      );
      const nodes: Node[] = [];
      for (let i = 0; i < result.snapshotLength; i++) {
        nodes.push(result.snapshotItem(i)!);
      }
      highlight(nodes);
      setCount(nodes.length);
      if (liveRef.current) liveRef.current.textContent = `XPath encontrou ${nodes.length} elemento(s).`;
    } catch {
      setCount(0);
      if (liveRef.current) liveRef.current.textContent = `XPath inválido.`;
    }
  };

  const onClear = () => {
    setXpath('');
    setCount(null);
    clearHighlights();
    if (liveRef.current) liveRef.current.textContent = '';
  };

  return (
    <div
      data-testid={`pp:${pageId}|xpath|box|tester`}
      style={{ margin: '12px 0' }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Typography.Text strong>Testar XPath nesta página</Typography.Text>
        <Form layout="inline" onFinish={onTest}>
          <Form.Item style={{ flex: 1 }}>
            <Input
              data-testid={`pp:${pageId}|xpath|input|expr`}
              placeholder='Ex.: //*[@data-testid="pp:home|main|btn|comecar"]'
              value={xpath}
              onChange={(e) => setXpath(e.target.value)}
              allowClear
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" data-testid={`pp:${pageId}|xpath|btn|testar`}>
              Testar XPath
            </Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={onClear} data-testid={`pp:${pageId}|xpath|btn|limpar`}>
              Limpar
            </Button>
          </Form.Item>
        </Form>
        <div aria-live="polite" role="status" ref={liveRef} data-testid={`pp:${pageId}|xpath|status|live`} />
        {count !== null && (
          <Alert
            data-testid={`pp:${pageId}|xpath|alert|resultado`}
            showIcon
            type={count > 0 ? 'success' : 'warning'}
            message={`Resultados: ${count} elemento(s).`}
          />
        )}
      </Space>
    </div>
  );
}
```

**CSS opcional** (`globals.css`):
```css
.pp-xpath-highlight {
  transition: outline-color 0.2s ease;
}
```

**Uso em páginas:**
```tsx
import XPathTester from '@/components/XPathTester';

export default function Page() {
  return (
    <>
      <XPathTester pageId="facil" />
      {/* ... */}
    </>
  );
}
```

---

## ⚙️ Dicas de Implementação com `data-testid`

- **Header**: `data-testid="pp:layout|header|switch|tema"` no `Switch`.
- **Botões de navegação** na Home.
- **Formulários**: inputs, selects, botões de submit/cancel.
- **Uploads**: área DnD, botão upload, lista/itens e mensagens.
- **Iframes**: `data-testid="pp:dificil|iframe|frame|form"` etc.
- **API**: campos de request/response/histórico.
- **TODO**: input, botão criar, lista, botões por item.

---

## 🚀 Como Rodar (dev)

```bash
npm i
npm run dev
# abrir http://localhost:3000
```

### Testes
```bash
npm run test:e2e
# ou UI
npm run test:ui
```

---

## 📄 Licença

MIT (ou defina outra).
