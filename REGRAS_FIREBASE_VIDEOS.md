# 🔥 Firebase Rules - Coleção de Vídeos

## 📋 Visão Geral

Este documento define as regras do Firebase para a nova funcionalidade de gerenciamento de vídeos.

## 🏗️ Estrutura de Dados dos Vídeos

### Coleção: `videos`
```
videos/
├── {videoId}/
│   ├── title: string
│   ├── description: string
│   ├── videoUrl: string
│   ├── thumbnailUrl?: string
│   ├── youtubeUrl?: string
│   ├── useYoutube: boolean
│   ├── createdAt: timestamp
│   ├── updatedAt: timestamp
│   └── uploadedBy: string (email do usuário)
```

### Campos dos Vídeos
```json
{
  "title": "Tutorial de Playwright",
  "description": "Vídeo explicativo sobre como usar Playwright para testes automatizados",
  "videoUrl": "https://firebasestorage.googleapis.com/v0/b/project/o/videos%2Fvideo.mp4",
  "thumbnailUrl": "https://firebasestorage.googleapis.com/v0/b/project/o/thumbnails%2Fthumb.jpg",
  "youtubeUrl": "https://www.youtube.com/watch?v=example",
  "useYoutube": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "uploadedBy": "admin@example.com"
}
```

## 🔒 Regras do Firestore Atualizadas

### Regras Completas (Produção)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir leitura pública dos desafios
    match /playground/challenges/data/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Permitir leitura pública dos vídeos
    match /videos/{videoId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null && 
        exists(/databases/$(database)/documents/playground/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/playground/$(request.auth.uid)).data.role == 'admin';
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
    
    // Permitir leitura pública dos vídeos
    match /videos/{videoId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    
    // Permitir escrita para usuários autenticados na coleção users
    match /playground/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🛡️ Regras de Segurança Detalhadas

### Vídeos (videos/{videoId})

#### Leitura Pública
```javascript
// Qualquer pessoa pode ler vídeos (página pública)
allow read: if true;
```

#### Escrita Apenas para Admins
```javascript
// Apenas usuários com role 'admin' podem criar/editar/deletar vídeos
allow create, update, delete: if request.auth != null && 
  exists(/databases/$(database)/documents/playground/$(request.auth.uid)) &&
  get(/databases/$(database)/documents/playground/$(request.auth.uid)).data.role == 'admin';
```

### Validações de Dados

#### Campos Obrigatórios na Criação
```javascript
// Validar campos obrigatórios ao criar vídeo
allow create: if request.auth != null &&
  request.resource.data.keys().hasAll(['title', 'description', 'videoUrl', 'createdAt', 'updatedAt', 'uploadedBy']) &&
  request.resource.data.title is string &&
  request.resource.data.description is string &&
  request.resource.data.videoUrl is string &&
  request.resource.data.uploadedBy is string &&
  request.resource.data.createdAt is timestamp &&
  request.resource.data.updatedAt is timestamp;
```

#### Campos Obrigatórios na Atualização
```javascript
// Validar campos ao atualizar vídeo
allow update: if request.auth != null &&
  request.resource.data.title is string &&
  request.resource.data.description is string &&
  request.resource.data.updatedAt is timestamp;
```

## 🗂️ Regras do Storage (Firebase Storage)

### Estrutura de Arquivos
```
gs://project.appspot.com/
├── videos/
│   └── {timestamp}_{filename}.mp4
└── thumbnails/
    └── {timestamp}_{filename}.jpg
```

### Regras do Storage
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Permitir leitura pública de vídeos e thumbnails
    match /videos/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && 
        exists(/databases/$(database)/documents/playground/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/playground/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /thumbnails/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && 
        exists(/databases/$(database)/documents/playground/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/playground/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## 🔧 Configuração no Firebase Console

### 1. Firestore Rules
1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Selecione seu projeto
3. Vá para "Firestore Database" > "Regras"
4. Cole as regras completas ou simplificadas
5. Clique em "Publicar"

### 2. Storage Rules
1. No Firebase Console, vá para "Storage"
2. Clique em "Regras"
3. Cole as regras do Storage
4. Clique em "Publicar"

### 3. Configurar Storage (se não estiver ativado)
1. No Firebase Console, vá para "Storage"
2. Se não estiver ativado, clique em "Começar"
3. Escolha "Iniciar no modo de teste"
4. Escolha uma localização
5. Clique em "Concluído"

## 🧪 Testando as Regras

### Teste de Leitura (Usuário Não Autenticado)
```javascript
// Deve funcionar - leitura pública
firestore.collection('videos').get()
```

### Teste de Escrita (Usuário Basic)
```javascript
// Deve falhar - apenas admins podem escrever
firestore.collection('videos').add({
  title: 'Teste',
  description: 'Teste',
  videoUrl: 'test',
  uploadedBy: 'user@example.com',
  createdAt: new Date(),
  updatedAt: new Date()
})
```

### Teste de Escrita (Usuário Admin)
```javascript
// Deve funcionar - admins podem escrever
firestore.collection('videos').add({
  title: 'Teste',
  description: 'Teste',
  videoUrl: 'test',
  uploadedBy: 'admin@example.com',
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## 🚨 Troubleshooting

### Problemas Comuns

#### 1. "Permission denied" ao ler vídeos
- Verifique se as regras do Firestore estão publicadas
- Confirme se a regra `allow read: if true;` está ativa

#### 2. "Permission denied" ao criar vídeos
- Verifique se o usuário está autenticado
- Confirme se o usuário tem role 'admin'
- Verifique se o documento do usuário existe em `playground/{uid}`

#### 3. "Permission denied" no Storage
- Verifique se as regras do Storage estão configuradas
- Confirme se o usuário tem permissões de admin
- Verifique se os caminhos dos arquivos estão corretos

### Debug das Regras

#### 1. Firebase Console - Simulador
1. Vá para Firestore > Regras
2. Clique em "Simulador"
3. Configure o teste:
   - Localização: `videos/test-video`
   - Operação: `create`, `read`, `update`, `delete`
   - Autenticação: Simulado ou Real
4. Execute o teste

#### 2. Logs de Debug
```javascript
// No console do navegador
console.log('User role:', userRole?.role);
console.log('Is admin:', isAdmin);
console.log('Auth state:', auth.currentUser);
```

## 📋 Checklist de Implementação

### Configuração Firebase
- [ ] Regras do Firestore atualizadas com coleção `videos`
- [ ] Regras do Storage configuradas para `videos/` e `thumbnails/`
- [ ] Storage ativado no projeto Firebase
- [ ] Testes de permissão executados

### Funcionalidades
- [ ] Hook `useVideos` implementado
- [ ] Página admin de upload de vídeos funcionando
- [ ] Página pública de listagem de vídeos funcionando
- [ ] Upload de arquivos para Storage funcionando
- [ ] CRUD completo de vídeos implementado

### Segurança
- [ ] Apenas admins podem criar/editar/deletar vídeos
- [ ] Leitura pública de vídeos funcionando
- [ ] Validação de campos obrigatórios
- [ ] Controle de acesso baseado em roles

### UX/UI
- [ ] Interface responsiva para upload
- [ ] Lista dropdown expansível funcionando
- [ ] Player de vídeo integrado
- [ ] Navegação entre páginas funcionando

## 🎯 URLs e Rotas

### Páginas Implementadas
- `/admin/videos` - Gerenciamento de vídeos (apenas admins)
- `/videos` - Lista pública de vídeos (todos os usuários)

### APIs Utilizadas
- `useVideos` - Hook para gerenciar vídeos
- `firestore.collection('videos')` - Coleção de dados
- `storage.ref('videos/')` - Armazenamento de arquivos

---

**📝 Nota:** Este documento define as regras de segurança para a funcionalidade de vídeos. Mantenha-o atualizado conforme novas funcionalidades forem implementadas.
