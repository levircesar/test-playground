# 🔥 Regras do Firestore Atualizadas

## 📋 Estrutura Corrigida

Após corrigir o erro de referência de documento, a estrutura agora é:

```
playground/
├── {uid}/                    # Documento do usuário (não mais playground/users/{uid})
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

## 🔧 Regras do Firestore

Substitua as regras atuais por estas:

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

## 📝 Como Atualizar

1. **No Firebase Console:**
   - Vá para "Firestore Database"
   - Clique na aba "Regras"
   - Cole as regras acima
   - Clique "Publicar"

2. **Teste:**
   - Faça login novamente
   - Verifique se o usuário é salvo em `playground/{uid}`
   - Confirme que não há mais erros no console

## ✅ Resultado Esperado

- ✅ Usuário salvo em `playground/{uid}` (não em `playground/users/{uid}`)
- ✅ Sem erro de "Invalid document reference"
- ✅ Sistema de roles funcionando
- ✅ Sem warnings do React
- ✅ Sem erros de Cross-Origin-Opener-Policy
