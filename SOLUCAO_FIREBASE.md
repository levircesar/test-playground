# 🔥 Solução: Firebase Não Salvando Usuários

## 🚨 Problema Identificado

O sistema de roles foi implementado corretamente, mas o Firebase não está salvando os usuários porque **as variáveis de ambiente não estão configuradas**.

## 🔍 Diagnóstico

Execute o comando de verificação:
```bash
npm run check-env
```

Resultado atual:
```
❌ NEXT_PUBLIC_FIREBASE_API_KEY: NÃO DEFINIDA
❌ NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: NÃO DEFINIDA
❌ NEXT_PUBLIC_FIREBASE_PROJECT_ID: NÃO DEFINIDA
❌ NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: NÃO DEFINIDA
❌ NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: NÃO DEFINIDA
❌ NEXT_PUBLIC_FIREBASE_APP_ID: NÃO DEFINIDA
```

## ✅ Solução Passo a Passo

### 1. **Criar Projeto Firebase**
1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Criar um projeto"
3. Nome: `playwright-playground` (ou qualquer nome)
4. Ative Google Analytics (opcional)
5. Clique "Criar projeto"

### 2. **Configurar Autenticação**
1. No projeto, clique "Authentication"
2. Clique "Começar"
3. Aba "Sign-in method"
4. Clique "Google" e ative
5. Configure email de suporte
6. Clique "Salvar"

### 3. **Configurar Firestore**
1. Clique "Firestore Database"
2. Clique "Criar banco de dados"
3. Escolha "Iniciar no modo de teste"
4. Localização: `us-central1`
5. Clique "Concluído"

### 4. **Obter Configuração**
1. Clique na engrenagem ⚙️ (Configurações)
2. Clique "Configurações do projeto"
3. Role até "Seus aplicativos"
4. Clique no ícone `</>` (Web)
5. Nome do app: `playground-web`
6. **NÃO** marque "Também configurar Firebase Hosting"
7. Clique "Registrar app"

### 5. **Criar Arquivo .env.local**
Na raiz do projeto, crie o arquivo `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=playwright-playground.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=playwright-playground
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=playwright-playground.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef...
```

**⚠️ IMPORTANTE:** Substitua os valores pelos dados do seu projeto Firebase!

### 6. **Configurar Regras do Firestore**
1. No Firestore, aba "Regras"
2. Substitua por:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir leitura pública dos desafios
    match /playground/challenges/data/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Permitir escrita para usuários autenticados na coleção users
    match /playground/users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Clique "Publicar"

### 7. **Verificar Configuração**
```bash
npm run check-env
```

Deve retornar:
```
🎉 Todas as variáveis estão configuradas!
🚀 Você pode executar o projeto com: npm run dev
```

### 8. **Testar o Sistema**
1. `npm run dev`
2. Acesse `http://localhost:3000/admin/login`
3. Clique "Entrar com Google"
4. Autorize o acesso
5. Verifique se foi redirecionado para `/admin/challenges`

## 🔍 Como Verificar se Funcionou

### **No Console do Navegador:**
Abra F12 e veja as mensagens:
```
🔐 AuthProvider: Novo usuário criado com role: basic
```

### **No Firebase Console:**
1. Vá para Firestore Database
2. Deve aparecer a coleção `playground`
3. Dentro: `users/{uid}` com dados do usuário

### **Na Página de Perfil:**
1. Acesse `http://localhost:3000/perfil`
2. Deve mostrar suas informações e role `basic`

## 🚨 Erros Comuns

### **"Firebase API Key não configurada"**
- Verifique se o arquivo `.env.local` existe
- Verifique se todas as variáveis estão preenchidas

### **"auth/invalid-api-key"**
- Verifique se a API Key está correta
- Não deve ter espaços extras

### **"Permission denied"**
- Verifique as regras do Firestore
- Certifique-se de que a autenticação está ativada

### **"Firebase App named '[DEFAULT]' already exists"**
- Reinicie o servidor: `Ctrl+C` e `npm run dev`

## 📋 Checklist Final

- [ ] Projeto Firebase criado
- [ ] Autenticação Google ativada
- [ ] Firestore Database criado
- [ ] Arquivo `.env.local` criado com valores corretos
- [ ] Regras do Firestore configuradas
- [ ] `npm run check-env` retorna sucesso
- [ ] Login funciona e salva usuário no Firebase
- [ ] Sistema de roles funciona (role basic por padrão)

## 🎯 Resultado Esperado

Após configurar corretamente:
1. ✅ Login salva usuário na coleção `playground/users`
2. ✅ Usuário recebe role `basic` automaticamente
3. ✅ Usuários básicos não veem botões de admin
4. ✅ Apenas admins podem criar/editar/excluir
5. ✅ Avatar no header muda de cor conforme role

## 📞 Precisa de Ajuda?

1. Consulte `FIREBASE_SETUP_QUICK.md` para instruções detalhadas
2. Execute `npm run check-env` para diagnosticar
3. Verifique o console do navegador para erros específicos

O sistema de roles está funcionando perfeitamente - só precisa configurar o Firebase! 🚀
