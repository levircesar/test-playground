# Playwright Playground - Projeto Criado

Este projeto foi criado com base na especificação detalhada do README.md original. É uma plataforma completa para aprender automação de testes com Playwright.

## 🚀 Como Executar

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```
Acesse: http://localhost:3000

### Build para Produção
```bash
npm run build
npm start
```

### Testes
```bash
# Executar todos os testes
npm run test:e2e

# Executar com interface gráfica
npm run test:ui

# Gerar testes automaticamente
npm run codegen
```

## 📁 Estrutura do Projeto

```
playwright-playground/
├─ app/                          # Next.js App Router
│  ├─ layout.tsx                # Layout principal com tema
│  ├─ globals.css               # Estilos globais
│  ├─ page.tsx                  # Landing page
│  ├─ home/page.tsx             # Página inicial
│  ├─ desafios/page.tsx         # Lista de desafios
│  ├─ comecar/page.tsx          # Escolha de roadmap
│  ├─ roadmap/                  # Páginas do roadmap
│  │  ├─ facil/page.tsx         # Componentes básicos
│  │  ├─ medio/page.tsx         # Uploads de arquivo
│  │  ├─ dificil/page.tsx       # Iframes
│  │  ├─ api/page.tsx           # Testes de API
│  │  └─ api-tela/page.tsx      # App completo (TODOs)
│  ├─ embeds/                   # Páginas para iframes
│  │  ├─ form/page.tsx          # Formulário
│  │  └─ table/page.tsx         # Tabela
│  └─ api/                      # Rotas API
│     ├─ ping/route.ts          # GET /api/ping
│     ├─ echo/route.ts          # POST /api/echo
│     └─ todos/route.ts         # CRUD de TODOs
├─ components/                   # Componentes reutilizáveis
│  ├─ XPathTester.tsx           # Testador de XPath
│  ├─ Header.tsx                # Cabeçalho com tema
│  ├─ Footer.tsx                # Rodapé
│  ├─ ContactForm.tsx           # Formulário de contato
│  ├─ Donation.tsx              # Seção de doação
│  └─ ChallengeTable.tsx        # Tabela de desafios
├─ lib/                         # Utilitários
│  ├─ storage.ts                # Helpers de localStorage
│  └─ challenges.ts             # Dados dos desafios
├─ data/                        # Arquivos de dados
│  └─ challenges.json           # Lista de desafios
├─ tests/                       # Testes Playwright
│  ├─ home.spec.ts              # Testes da home
│  ├─ facil.spec.ts             # Testes do roadmap fácil
│  ├─ api.spec.ts               # Testes de API
│  └─ api-tela.spec.ts          # Testes do app TODOs
├─ playwright.config.ts         # Configuração do Playwright
├─ package.json                 # Dependências e scripts
└─ tsconfig.json                # Configuração TypeScript
```

## 🎯 Funcionalidades Implementadas

### ✅ Landing Page
- Hero section com CTAs
- Seção "Como funciona"
- Seção "Para quem é"
- Formulário de contato (salva no localStorage)
- Seção de doação
- Tema claro/escuro persistido

### ✅ Navegação
- Página inicial (/home) com botões Desafios e Começar
- Página de desafios (/desafios) com tabela interativa
- Página de escolha de roadmap (/comecar)

### ✅ Roadmap Fácil (/roadmap/facil)
- Botões com contador e loading
- Inputs diversos (texto, número, select, cascader)
- Checkboxes e radios
- DatePicker e TimePicker
- Slider e Rate
- Switch
- Tabs e Collapse
- Modal interativo
- Tooltip
- Tabela com ordenação
- Desafios práticos

### ✅ Roadmap Médio (/roadmap/medio)
- Upload simples de CSV
- Upload drag & drop
- Upload múltiplo
- Validação de arquivos
- Pré-visualização de CSV
- Download de CSV processado
- Exemplo de arquivo CSV

### ✅ Roadmap Difícil (/roadmap/dificil)
- Iframe com formulário interativo
- Iframe com tabela interativa
- Iframe aninhado
- Comunicação via postMessage
- Controles para enviar mensagens aos iframes
- Histórico de mensagens recebidas
- Monitoramento de status

### ✅ Roadmap API (/roadmap/api)
- GET /api/ping - endpoint de teste
- POST /api/echo - eco de dados
- Interface para testar endpoints
- Histórico persistido no localStorage
- Validação de respostas
- Controles para limpar dados

### ✅ Roadmap API + Tela (/roadmap/api-tela)
- App completo de TODOs
- CRUD via API (/api/todos)
- Fallback para localStorage quando API offline
- Sincronização automática
- Interface rica com estatísticas
- Controles para limpar TODOs

### ✅ Componentes
- XPathTester presente em todas as páginas
- Header com alternância de tema
- Footer com links úteis
- Formulário de contato
- Seção de doação
- Tabela de desafios

### ✅ APIs
- GET /api/ping - retorna status e timestamp
- POST /api/echo - ecoa dados recebidos
- GET/POST/DELETE /api/todos - CRUD de TODOs

### ✅ Persistência
- Tema salvo em localStorage
- Histórico de API salvo em localStorage
- TODOs sincronizados com localStorage
- Mensagens de contato salvas em localStorage

### ✅ Testes Playwright
- Testes de navegação
- Testes de interação com componentes
- Testes de API
- Testes de persistência
- Testes do XPath Tester

## 🏷️ Data-testid

Todos os elementos relevantes possuem `data-testid` únicos seguindo a convenção:
`pp:<page>|<section>|<role>|<name>[#<index>]`

Exemplos:
- `pp:home|main|btn|comecar`
- `pp:facil|btn|incrementar`
- `pp:api|btn|ping`
- `pp:desafios|table|row|challenge#1`

## 🎨 Tema

- Tema claro por padrão
- Alternância para tema escuro
- Persistência da preferência
- Ant Design v5 com ConfigProvider

## 📱 Responsividade

- Layout responsivo em todas as páginas
- Componentes adaptáveis para mobile
- Tabelas com scroll horizontal quando necessário

## 🧪 Testes

Execute os testes com:
```bash
npm run test:e2e    # Executar todos os testes
npm run test:ui      # Interface gráfica
npm run codegen      # Gerar testes automaticamente
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Servidor de produção
- `npm run lint` - Linting
- `npm run test:e2e` - Testes E2E
- `npm run test:ui` - Testes com UI
- `npm run codegen` - Gerador de testes

## 📝 Próximos Passos

O projeto está completo e funcional. Você pode:

1. **Executar o projeto**: `npm install && npm run dev`
2. **Explorar as funcionalidades**: Navegue pelas páginas e teste os componentes
3. **Executar os testes**: `npm run test:e2e`
4. **Personalizar**: Modifique cores, textos ou adicione novos desafios
5. **Expandir**: Adicione novos roadmaps ou funcionalidades

## 🎉 Conclusão

Este projeto implementa completamente a especificação do README original, fornecendo uma plataforma rica e interativa para aprender automação de testes com Playwright. Todos os elementos têm data-testid únicos, o XPath Tester está presente em todas as páginas, e há uma variedade completa de cenários de teste para praticar.
