# 🔧 Troubleshooting - Autenticação Firebase

## 🚨 Problemas Comuns e Soluções

### 1. **Loading Infinito na Página de Login**

#### ❌ **Problema:**
- Página fica carregando indefinidamente
- Não aparece o botão de login
- Console mostra erros de Firebase

#### ✅ **Solução:**
1. **Verificar configuração Firebase:**
   ```bash
   npm run check-env
   ```

2. **Verificar console do navegador:**
   - Abra DevTools (F12)
   - Vá para Console
   - Procure por erros relacionados ao Firebase

3. **Verificar arquivo .env.local:**
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef...
   ```

### 2. **Erro: "Firebase API Key não configurada"**

#### ❌ **Problema:**
```
FirebaseError: Firebase: Error (auth/invalid-api-key)
```

#### ✅ **Solução:**
1. **Recriar projeto Firebase:**
   - Acesse [Firebase Console](https://console.firebase.google.com/)
   - Crie um novo projeto
   - Copie a configuração correta

2. **Verificar variáveis de ambiente:**
   - Certifique-se de que não há espaços extras
   - Verifique se todas as variáveis estão preenchidas
   - Reinicie o servidor: `npm run dev`

### 3. **Login não Persiste após Recarregar**

#### ❌ **Problema:**
- Login funciona, mas perde ao recarregar a página
- Usuário precisa fazer login novamente

#### ✅ **Solução:**
1. **Verificar cookies:**
   - Abra DevTools (F12)
   - Vá para Application > Cookies
   - Verifique se existe `firebase-auth-token`

2. **Verificar console:**
   - Procure por mensagens do AuthProvider
   - Deve aparecer: "Token salvo em cookie"

### 4. **Redirecionamento Infinito**

#### ❌ **Problema:**
- Página fica redirecionando entre login e admin
- Loop infinito de redirecionamentos

#### ✅ **Solução:**
1. **Limpar cookies:**
   ```javascript
   // No console do navegador
   document.cookie = 'firebase-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
   ```

2. **Verificar middleware:**
   - Certifique-se de que o middleware está configurado corretamente
   - Verifique se as rotas estão sendo protegidas adequadamente

### 5. **Erro de Permissão no Firestore**

#### ❌ **Problema:**
```
FirebaseError: Missing or insufficient permissions
```

#### ✅ **Solução:**
1. **Configurar regras do Firestore:**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /playground/challenges/data/{document} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```

2. **Verificar autenticação:**
   - Certifique-se de que a autenticação Google está ativada
   - Verifique se o usuário está logado

## 🔍 Debug e Diagnóstico

### 1. **Componente de Debug**
- Aparece no canto superior direito (apenas em desenvolvimento)
- Mostra status da autenticação
- Indica se o cookie está presente

### 2. **Console do Navegador**
Procure por estas mensagens:
```
🔐 AuthProvider: Inicializando listener de autenticação...
🔐 AuthProvider: Estado de autenticação mudou: Usuário logado
🔐 AuthProvider: Token salvo em cookie
```

### 3. **Verificação Manual**
```javascript
// No console do navegador
console.log('User:', firebase.auth().currentUser);
console.log('Token:', await firebase.auth().currentUser?.getIdToken());
console.log('Cookies:', document.cookie);
```

## 🚀 Teste Completo

### 1. **Fluxo de Teste:**
1. Acesse `/admin/login`
2. Clique em "Entrar com Google"
3. Autorize o acesso
4. Deve redirecionar para `/admin/challenges`
5. Recarregue a página
6. Deve manter o login

### 2. **Verificações:**
- [ ] Página de login carrega sem loading infinito
- [ ] Botão de login aparece
- [ ] Login com Google funciona
- [ ] Redirecionamento para admin funciona
- [ ] Login persiste após recarregar
- [ ] Logout funciona
- [ ] Middleware protege rotas

## 📞 Suporte

### 1. **Logs Importantes:**
- Console do navegador
- Terminal do servidor
- Firebase Console > Authentication
- Firebase Console > Firestore

### 2. **Informações para Debug:**
- Versão do Node.js
- Versão do Next.js
- Configuração do Firebase
- Erros específicos do console

### 3. **Comandos Úteis:**
```bash
# Verificar configuração
npm run check-env

# Limpar cache
rm -rf .next
npm run dev

# Verificar dependências
npm list firebase
```

## ✅ Checklist de Resolução

- [ ] Arquivo `.env.local` configurado corretamente
- [ ] Projeto Firebase criado e configurado
- [ ] Autenticação Google ativada
- [ ] Firestore Database criado
- [ ] Regras do Firestore configuradas
- [ ] Servidor reiniciado após mudanças
- [ ] Cookies funcionando
- [ ] Middleware configurado
- [ ] Contexto de autenticação funcionando
- [ ] Redirecionamentos funcionando
