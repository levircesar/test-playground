# 🚀 Configuração Rápida do Firebase

## ⚡ Passos para Resolver o Erro

### 1. **Criar Projeto Firebase**
1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Criar um projeto"
3. Digite um nome para o projeto (ex: `playwright-playground`)
4. Ative o Google Analytics (opcional)
5. Clique em "Criar projeto"

### 2. **Configurar Autenticação**
1. No painel do projeto, clique em "Authentication"
2. Clique em "Começar"
3. Vá para a aba "Sign-in method"
4. Clique em "Google" e ative
5. Configure o email de suporte do projeto
6. Clique em "Salvar"

### 3. **Configurar Firestore**
1. No painel do projeto, clique em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha "Iniciar no modo de teste" (para desenvolvimento)
4. Escolha uma localização (ex: `us-central1`)
5. Clique em "Concluído"

### 4. **Obter Configuração**
1. No painel do projeto, clique na engrenagem ⚙️
2. Clique em "Configurações do projeto"
3. Role para baixo até "Seus aplicativos"
4. Clique no ícone `</>` (Web)
5. Digite um nome para o app (ex: `playground-web`)
6. **NÃO** marque "Também configurar o Firebase Hosting"
7. Clique em "Registrar app"

### 5. **Copiar Configuração**
Você verá algo assim:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "playwright-playground.firebaseapp.com",
  projectId: "playwright-playground",
  storageBucket: "playwright-playground.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef..."
};
```

### 6. **Criar Arquivo .env.local**
Na raiz do projeto, crie o arquivo `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=playwright-playground.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=playwright-playground
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=playwright-playground.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef...
```

### 7. **Configurar Regras do Firestore**
1. No Firestore, vá para "Regras"
2. Substitua as regras por:

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

3. Clique em "Publicar"

### 8. **Verificar Configuração**
Execute o comando:
```bash
npm run check-env
```

Se tudo estiver correto, você verá:
```
🎉 Todas as variáveis estão configuradas!
🚀 Você pode executar o projeto com: npm run dev
```

### 9. **Testar o Sistema**
1. Execute: `npm run dev`
2. Acesse: `http://localhost:3000/admin/login`
3. Clique em "Entrar com Google"
4. Autorize o acesso
5. Você será redirecionado para `/admin/challenges`

## 🔧 Troubleshooting

### Erro: "Firebase API Key não configurada"
- Verifique se o arquivo `.env.local` existe
- Verifique se todas as variáveis estão preenchidas
- Execute `npm run check-env` para diagnosticar

### Erro: "auth/invalid-api-key"
- Verifique se a API Key está correta
- Certifique-se de que não há espaços extras
- Recrie o projeto Firebase se necessário

### Erro: "Permission denied"
- Verifique as regras do Firestore
- Certifique-se de que a autenticação está ativada

## 📞 Precisa de Ajuda?

1. Consulte o arquivo `ADMIN_SETUP.md` para instruções detalhadas
2. Execute `npm run check-env` para diagnosticar problemas
3. Verifique o console do navegador para erros específicos

## ✅ Checklist Final

- [ ] Projeto Firebase criado
- [ ] Autenticação Google ativada
- [ ] Firestore Database criado
- [ ] Arquivo `.env.local` criado com valores corretos
- [ ] Regras do Firestore configuradas
- [ ] `npm run check-env` retorna sucesso
- [ ] Login funciona em `/admin/login`
