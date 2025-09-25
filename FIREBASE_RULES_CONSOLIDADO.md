# 🔥 Firebase Rules - Configuração Consolidada

## 📋 Visão Geral

Este documento consolida todas as configurações de Firebase Rules, estruturas de dados e regras de segurança do projeto Playwright Playground.

## 🏗️ Estrutura de Dados no Firestore

### Estrutura Principal
```
playground/
├── {uid}/                    # Documento do usuário (não playground/users/{uid})
│   ├── uid: string
│   ├── email: string
│   ├── displayName: string
│   ├── role: "basic" | "admin"
│   ├── createdAt: timestamp
│   └── lastLogin: timestamp
└── challenges/
    └── data/
        └── {challengeId}/    # Documentos dos desafios
```

### Campos dos Desafios
```json
{
  "id": 1,
  "titulo": "Clicar no botão incrementar",
  "nivel": "Fácil",
  "tipo": "UI",
  "tags": ["ui", "easy"],
  "rota": "/roadmap/facil",
  "descricao": "Clique no botão incrementar e valide...",
  "resultadoEsperado": "O contador deve incrementar...",
  "solucaoPlaywright": "await page.getByTestId...",
  "solucaoCypress": "cy.get('[data-testid...",
  "dataTestId": "pp:facil|btn|incrementar",
  "traducoes": {
    "pt-BR": { "titulo": "...", "descricao": "...", "resultadoEsperado": "..." },
    "en-US": { "title": "...", "description": "...", "expectedResult": "..." },
    "fr-FR": { "titre": "...", "description": "...", "resultatAttendu": "..." }
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "createdBy": "user-id",
  "createdByEmail": "user@example.com",
  "version": 1,
  "status": "active"
}
```

## 🔒 Regras do Firestore - Versão Completa

### Regras Principais (Produção)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir leitura pública dos desafios
    match /playground/challenges/data/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Permitir escrita para usuários autenticados na coleção de usuários
    // Estrutura: playground/{userId} (não playground/users/{userId})
    match /playground/{userId} {
      // Usuários podem ler/escrever apenas seus próprios dados
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Admins podem ler todos os documentos de usuários
      allow read: if request.auth != null && 
                     exists(/databases/$(database)/documents/playground/$(request.auth.uid)) &&
                     get(/databases/$(database)/documents/playground/$(request.auth.uid)).data.role == 'admin';
      
      // Admins podem atualizar roles de outros usuários
      allow update: if request.auth != null && 
                       exists(/databases/$(database)/documents/playground/$(request.auth.uid)) &&
                       get(/databases/$(database)/documents/playground/$(request.auth.uid)).data.role == 'admin' &&
                       request.resource.data.keys().hasAll(['role']) &&
                       request.resource.data.role in ['basic', 'admin'];
    }
  }
}
```

### Regras Simplificadas (Desenvolvimento)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir leitura pública dos desafios
    match /playground/challenges/data/{document} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    
    // Permitir escrita para usuários autenticados na coleção users
    match /playground/users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🔧 Configuração de Variáveis de Ambiente

### Arquivo .env.local
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=playwright-playground.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=playwright-playground
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=playwright-playground.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef...
```

### Validação das Variáveis
O arquivo `config/firebase.ts` inclui validação automática:
- Verifica se todas as variáveis estão definidas
- Exibe mensagens de erro claras se alguma estiver faltando
- Fornece exemplo de configuração em caso de erro

## 🚀 Configuração do Projeto Firebase

### 1. Criar Projeto Firebase
1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Criar um projeto"
3. Digite um nome para o projeto (ex: `playwright-playground`)
4. Ative o Google Analytics (opcional)
5. Clique em "Criar projeto"

### 2. Configurar Autenticação
1. No painel do projeto, clique em "Authentication"
2. Clique em "Começar"
3. Vá para a aba "Sign-in method"
4. Clique em "Google" e ative
5. Configure o email de suporte do projeto
6. Clique em "Salvar"

### 3. Configurar Firestore
1. No painel do projeto, clique em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha "Iniciar no modo de teste" (para desenvolvimento)
4. Escolha uma localização (ex: `us-central1`)
5. Clique em "Concluído"

### 4. Obter Configuração
1. No painel do projeto, clique na engrenagem ⚙️
2. Clique em "Configurações do projeto"
3. Role para baixo até "Seus aplicativos"
4. Clique no ícone `</>` (Web)
5. Digite um nome para o app (ex: `playground-web`)
6. **NÃO** marque "Também configurar o Firebase Hosting"
7. Clique em "Registrar app"

### 5. Configurar Regras do Firestore
1. No Firestore, vá para "Regras"
2. Cole as regras apropriadas (versão completa ou simplificada)
3. Clique em "Publicar"

## 🔍 Sistema de Roles

### Tipos de Usuários
- **basic**: Usuário comum, pode ler desafios e gerenciar próprio perfil
- **admin**: Administrador, pode criar/editar/excluir desafios e gerenciar usuários

### Permissões por Role

#### Usuário Basic
- ✅ Ler desafios públicos
- ✅ Criar/atualizar próprio perfil
- ✅ Visualizar próprio perfil
- ❌ Criar/editar/excluir desafios
- ❌ Gerenciar outros usuários

#### Usuário Admin
- ✅ Todas as permissões do usuário basic
- ✅ Criar/editar/excluir desafios
- ✅ Ler perfis de todos os usuários
- ✅ Atualizar roles de outros usuários
- ✅ Acessar páginas de administração

## 🛡️ Regras de Segurança Detalhadas

### Desafios (playground/challenges/data/{document})
```javascript
// Leitura pública - qualquer pessoa pode ler
allow read: if true;

// Escrita apenas para usuários autenticados
allow write: if request.auth != null;
```

### Usuários (playground/{userId})
```javascript
// Usuário pode ler/escrever apenas seus próprios dados
allow read, write: if request.auth != null && request.auth.uid == userId;

// Admins podem ler todos os documentos de usuários
allow read: if request.auth != null && 
               exists(/databases/$(database)/documents/playground/$(request.auth.uid)) &&
               get(/databases/$(database)/documents/playground/$(request.auth.uid)).data.role == 'admin';

// Admins podem atualizar roles de outros usuários
allow update: if request.auth != null && 
                 exists(/databases/$(database)/documents/playground/$(request.auth.uid)) &&
                 get(/databases/$(database)/documents/playground/$(request.auth.uid)).data.role == 'admin' &&
                 request.resource.data.keys().hasAll(['role']) &&
                 request.resource.data.role in ['basic', 'admin'];
```

## 🔧 Comandos de Verificação

### Verificar Configuração
```bash
npm run check-env
```

### Resultado Esperado
```
🎉 Todas as variáveis estão configuradas!
🚀 Você pode executar o projeto com: npm run dev
```

### Verificar Dependências
```bash
npm list firebase
```

## 🚨 Troubleshooting

### Problemas Comuns

#### 1. "Firebase API Key não configurada"
- Verifique se o arquivo `.env.local` existe
- Verifique se todas as variáveis estão preenchidas
- Execute `npm run check-env` para diagnosticar

#### 2. "auth/invalid-api-key"
- Verifique se a API Key está correta
- Certifique-se de que não há espaços extras
- Recrie o projeto Firebase se necessário

#### 3. "Permission denied"
- Verifique as regras do Firestore
- Certifique-se de que a autenticação está ativada
- Confirme se o usuário tem as permissões necessárias

#### 4. "Invalid document reference"
- Verifique se a estrutura de dados está correta
- Confirme se está usando `playground/{uid}` e não `playground/users/{uid}`

### Debug e Diagnóstico

#### 1. Console do Navegador
Abra DevTools (F12) e vá para Console

#### 2. Mensagens de Debug
Procure por estas mensagens no console:
```
🔐 AuthProvider: Inicializando listener de autenticação...
🔐 AuthProvider: Estado de autenticação mudou: Usuário logado
🔐 AuthProvider: Token salvo em cookie
🔄 Carregando desafios do Firebase...
📊 Documentos encontrados: X
```

#### 3. Verificação Manual
```javascript
// No console do navegador
console.log('User:', firebase.auth().currentUser);
console.log('Token:', await firebase.auth().currentUser?.getIdToken());
console.log('Cookies:', document.cookie);
```

## 📋 Checklist de Configuração

### Configuração Inicial
- [ ] Projeto Firebase criado
- [ ] Autenticação Google ativada
- [ ] Firestore Database criado
- [ ] Arquivo `.env.local` criado com valores corretos
- [ ] Regras do Firestore configuradas
- [ ] `npm run check-env` retorna sucesso

### Teste do Sistema
- [ ] Login funciona em `/admin/login`
- [ ] Usuário é salvo em `playground/{uid}`
- [ ] Sistema de roles funciona (role basic por padrão)
- [ ] Desafios podem ser lidos publicamente
- [ ] Admins podem criar/editar desafios
- [ ] Middleware protege rotas adequadamente

### Verificações de Segurança
- [ ] Usuários não podem acessar dados de outros usuários
- [ ] Apenas admins podem gerenciar outros usuários
- [ ] Desafios são públicos para leitura
- [ ] Apenas usuários autenticados podem escrever
- [ ] Roles são validados corretamente

## 🎯 Data-TestIds Utilizados

### Roadmap Fácil
- `pp:facil|btn|incrementar` - Botão de incrementar contador
- `pp:facil|btn|loading` - Botão com estado de loading
- `pp:facil|btn|modal` - Botão para abrir modal
- `pp:facil|input|texto` - Campo de input de texto
- `pp:facil|select|opcoes` - Dropdown de seleção
- `pp:facil|checkbox|opcoes` - Checkboxes
- `pp:facil|radio|opcoes` - Radio buttons
- `pp:facil|table|sortable` - Tabela ordenável

### Roadmap Médio
- `pp:medio|upload|simples` - Upload simples de CSV
- `pp:medio|upload|validacao` - Upload com validação
- `pp:medio|upload|multiplo` - Upload múltiplo

### Roadmap Difícil
- `pp:dificil|iframe|form` - Formulário em iframe
- `pp:dificil|iframe|comunicacao` - Comunicação entre iframes

### Roadmap API + Tela
- `pp:api-tela|input|novo-todo` - Input para novo TODO
- `pp:api-tela|btn|adicionar` - Botão adicionar TODO
- `pp:api-tela|checkbox|todo` - Checkbox para marcar TODO

### Roadmap API
- `pp:api|btn|ping` - Botão para chamar ping
- `pp:api|btn|echo` - Botão para chamar echo
- `pp:api|input|echo-data` - Input para dados do echo
- `pp:api|div|ping-response` - Div com resposta do ping
- `pp:api|div|echo-response` - Div com resposta do echo
- `pp:api|div|historico` - Div com histórico de chamadas

## 📞 Suporte e Recursos

### Arquivos de Referência
- `FIREBASE_SETUP_QUICK.md` - Configuração rápida
- `SOLUCAO_FIREBASE.md` - Solução de problemas
- `TROUBLESHOOTING_AUTH.md` - Troubleshooting de autenticação
- `REGRAS_FIRESTORE_ATUALIZADAS.md` - Regras atualizadas
- `DESAFIOS_FIREBASE.md` - Envio de desafios

### Comandos Úteis
```bash
# Verificar configuração
npm run check-env

# Limpar cache
rm -rf .next
npm run dev

# Verificar dependências
npm list firebase

# Executar testes
npx playwright test
```

## ✅ Resultado Final

Após configurar corretamente, você terá:
- ✅ Sistema de autenticação Google funcionando
- ✅ Firestore configurado com regras de segurança
- ✅ Sistema de roles (basic/admin) implementado
- ✅ Desafios públicos para leitura
- ✅ Controle de acesso baseado em roles
- ✅ Middleware protegendo rotas administrativas
- ✅ Persistência de login com cookies
- ✅ Validação automática de configuração

---

**📝 Nota:** Este documento consolida todas as configurações de Firebase Rules do projeto. Mantenha-o atualizado conforme novas regras forem implementadas.
