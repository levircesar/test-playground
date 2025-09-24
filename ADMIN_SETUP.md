# Configuração do Painel Administrativo

## Visão Geral

O painel administrativo permite gerenciar desafios do Test Playground através de uma interface web com autenticação Google Firebase.

## Funcionalidades

- ✅ **Autenticação Google Firebase**: Login seguro com Google
- ✅ **CRUD de Desafios**: Criar, ler, atualizar e excluir desafios
- ✅ **Traduções**: Suporte a múltiplos idiomas (PT-BR, EN-US, FR-FR)
- ✅ **Soluções**: Campos separados para Playwright e Cypress
- ✅ **Interface Responsiva**: Funciona em desktop e mobile

## Configuração do Firebase

### 1. Criar Projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto
3. Ative a autenticação com Google
4. Ative o Firestore Database

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Configurar Regras do Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir leitura pública dos desafios
    match /playground/challenges/data/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 4. Configurar Autenticação

1. No Firebase Console, vá para Authentication
2. Ative o provedor Google
3. Configure o domínio autorizado

## Estrutura de Dados

### Coleção: `playground/challenges/data`

```json
{
  "id": "challenge_1",
  "titulo": "Clicar e validar contador",
  "nivel": "Fácil",
  "tipo": "UI",
  "tags": ["button", "state"],
  "rota": "/roadmap/facil",
  "descricao": "Clique no botão de incrementar e valide se o contador aumenta corretamente",
  "resultadoEsperado": "O contador deve incrementar de 0 para 1, 2, 3... a cada clique no botão",
  "solucaoPlaywright": "import { test, expect } from '@playwright/test';...",
  "solucaoCypress": "describe('Challenge', () => { ... });",
  "traducoes": {
    "pt-BR": {
      "titulo": "Clicar e validar contador",
      "descricao": "Clique no botão de incrementar...",
      "resultadoEsperado": "O contador deve incrementar..."
    },
    "en-US": {
      "titulo": "Click and validate counter",
      "descricao": "Click the increment button...",
      "resultadoEsperado": "The counter should increment..."
    },
    "fr-FR": {
      "titulo": "Cliquer et valider le compteur",
      "descricao": "Cliquez sur le bouton d'incrémentation...",
      "resultadoEsperado": "Le compteur devrait s'incrémenter..."
    }
  }
}
```

## Como Usar

### 1. Acessar o Painel Admin

```
http://localhost:3000/admin/login
```

### 2. Fazer Login

- Clique em "Entrar com Google"
- Autorize o acesso
- Será redirecionado para `/admin/challenges`

### 3. Gerenciar Desafios

- **Criar**: Clique em "Novo Desafio"
- **Editar**: Clique no botão "Editar" na tabela
- **Excluir**: Clique no botão "Excluir" na tabela

### 4. Campos do Formulário

- **Título**: Título do desafio em cada idioma
- **Nível**: Fácil, Médio, Difícil, API, API+Tela
- **Tipo**: UI, Upload, Iframe, API, E2E, Table
- **Tags**: Separadas por vírgula
- **Rota**: URL onde o desafio está localizado
- **Descrição**: Descrição do desafio em cada idioma
- **Resultado Esperado**: O que deve acontecer em cada idioma
- **Solução Playwright**: Código completo do teste Playwright
- **Solução Cypress**: Código completo do teste Cypress

## Integração com o Frontend

Os desafios criados no painel admin são automaticamente carregados nas páginas do frontend:

- `/desafios` - Lista todos os desafios
- `/roadmap/facil` - Desafios fáceis
- `/roadmap/medio` - Desafios médios
- `/roadmap/dificil` - Desafios difíceis
- `/roadmap/api` - Desafios de API
- `/roadmap/api-tela` - Desafios de API+Tela

## Segurança

- Apenas usuários autenticados podem criar/editar/excluir desafios
- Leitura pública dos desafios para o frontend
- Middleware protege rotas `/admin/*`
- Redirecionamento automático para login se não autenticado

## Troubleshooting

### Erro de Configuração Firebase
- Verifique se todas as variáveis de ambiente estão corretas
- Confirme se o projeto Firebase está ativo

### Erro de Autenticação
- Verifique se o domínio está autorizado no Firebase
- Confirme se a autenticação Google está ativada

### Erro de Permissões Firestore
- Verifique as regras do Firestore
- Confirme se o usuário está autenticado

## Desenvolvimento

### Estrutura de Arquivos

```
app/admin/
├── login/page.tsx          # Página de login
├── challenges/page.tsx     # Página de administração
└── layout.tsx              # Layout do admin

components/
├── ChallengeTable.tsx                    # Tabela original
└── ChallengeTableWithFirebase.tsx       # Wrapper com Firebase

lib/
├── hooks/
│   ├── useAuth.ts           # Hook de autenticação
│   └── useChallenges.ts     # Hook de desafios
└── challenges.ts            # Funções auxiliares

middleware.ts               # Proteção de rotas
```

### Hooks Disponíveis

- `useAuth()`: Gerencia estado de autenticação
- `useChallenges()`: Carrega desafios do Firebase

### Funções Auxiliares

- `applyTranslationsToChallenge()`: Aplica traduções aos desafios
- `getChallenges()`: Fallback para desafios locais
