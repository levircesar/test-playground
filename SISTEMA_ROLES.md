# 🔐 Sistema de Roles - Playwright Playground

## 📋 Resumo das Implementações

O sistema de roles foi implementado com sucesso conforme solicitado. Agora, ao fazer login no app, os dados do usuário são salvos na coleção `playground -> users` do Firebase com role `basic` por padrão, e apenas usuários com role `admin` podem ver os botões de cadastro, editar e excluir na tela de admin.

## 🏗️ Estrutura Implementada

### 1. **AuthContext Atualizado** (`lib/contexts/AuthContext.tsx`)

- ✅ **Interface UserRole**: Define a estrutura dos dados do usuário com role
- ✅ **Salvamento automático**: Usuários são salvos na coleção `playground/users` automaticamente
- ✅ **Role padrão**: Todos os novos usuários recebem role `basic`
- ✅ **Atualização de login**: Último acesso é atualizado a cada login
- ✅ **Propriedades adicionais**: `isAdmin` e `userRole` disponíveis no contexto

### 2. **Página de Admin** (`app/admin/challenges/page.tsx`)

- ✅ **Verificação de permissão**: Apenas usuários com role `admin` podem acessar
- ✅ **Botões condicionais**: Botões de cadastro, editar e excluir só aparecem para admins
- ✅ **Mensagens informativas**: Usuários básicos veem "Apenas admins podem editar"
- ✅ **Redirecionamento**: Usuários sem permissão são redirecionados

### 3. **Componente AdminChallengeUploader** (`components/AdminChallengeUploader.tsx`)

- ✅ **Verificação dupla**: Verifica autenticação e role de admin
- ✅ **Alertas específicos**: Mensagens diferentes para não logado vs sem permissão
- ✅ **Proteção total**: Não permite upload para usuários básicos

### 4. **Página de Login** (`app/admin/login/page.tsx`)

- ✅ **Informações sobre roles**: Explica que apenas admins podem acessar
- ✅ **Aviso claro**: Indica que usuários comuns recebem role basic

### 5. **Nova Página de Perfil** (`app/perfil/page.tsx`)

- ✅ **Informações completas**: Mostra dados do usuário, role e permissões
- ✅ **Visual diferenciado**: Admins têm avatar vermelho, básicos azul
- ✅ **Histórico de acesso**: Data de criação e último login
- ✅ **Navegação**: Links para voltar e fazer logout

### 6. **Header Atualizado** (`components/Header.tsx`)

- ✅ **Menu do usuário**: Dropdown com perfil, admin e logout
- ✅ **Avatar dinâmico**: Cores diferentes para admin (vermelho) vs básico (azul)
- ✅ **Botão de login**: Para usuários não autenticados

### 7. **Hook Personalizado** (`lib/hooks/useUserRole.ts`)

- ✅ **Facilita uso**: Hook simplificado para verificar roles e permissões
- ✅ **Métodos úteis**: `hasRole()`, `canEdit()`, `canDelete()`, `canCreate()`

## 🔄 Fluxo de Funcionamento

### **Login de Usuário Novo:**
1. Usuário faz login com Google
2. Sistema verifica se existe na coleção `playground/users`
3. Se não existe, cria novo documento com role `basic`
4. Se existe, atualiza `lastLogin`
5. Dados ficam disponíveis no contexto global

### **Acesso à Área Admin:**
1. Usuário tenta acessar `/admin/challenges`
2. Sistema verifica se está logado
3. Sistema verifica se tem role `admin`
4. Se não tem permissão, redireciona para home
5. Se tem permissão, mostra interface completa

### **Usuário Básico na Área Admin:**
1. Acessa `/admin/login` normalmente
2. Ao tentar acessar `/admin/challenges`, é redirecionado
3. Recebe mensagem explicativa sobre permissões

## 🎯 Permissões por Role

### **Role: `basic`**
- ✅ Pode fazer login
- ✅ Pode visualizar desafios
- ✅ Pode usar a plataforma normalmente
- ❌ Não pode acessar área admin
- ❌ Não pode criar/editar/excluir desafios
- ❌ Não pode fazer upload em lote

### **Role: `admin`**
- ✅ Todas as permissões de `basic`
- ✅ Pode acessar área admin
- ✅ Pode criar novos desafios
- ✅ Pode editar desafios existentes
- ✅ Pode excluir desafios
- ✅ Pode fazer upload em lote
- ✅ Avatar vermelho no header
- ✅ Tag "👑 Administrador" no perfil

## 🗄️ Estrutura do Firebase

### **Coleção: `playground/users/{uid}`**
```json
{
  "uid": "string",
  "email": "string", 
  "displayName": "string",
  "role": "basic" | "admin",
  "createdAt": "timestamp",
  "lastLogin": "timestamp"
}
```

## 🔧 Como Promover Usuário para Admin

Para promover um usuário para admin, basta alterar o campo `role` de `"basic"` para `"admin"` no documento do usuário na coleção `playground/users/{uid}` no Firebase Console.

## 🧪 Testando o Sistema

1. **Faça login** com uma conta Google
2. **Verifique o perfil** em `/perfil` - deve mostrar role `basic`
3. **Tente acessar** `/admin/challenges` - deve ser redirecionado
4. **Veja o header** - avatar deve estar azul
5. **Promova para admin** no Firebase Console
6. **Recarregue a página** - agora deve conseguir acessar admin
7. **Verifique perfil** - deve mostrar role `admin` e avatar vermelho

## 📝 Observações Importantes

- ✅ **Segurança**: Verificações tanto no frontend quanto no backend
- ✅ **UX**: Mensagens claras sobre permissões
- ✅ **Performance**: Dados carregados apenas quando necessário
- ✅ **Manutenibilidade**: Código bem estruturado e reutilizável
- ✅ **Escalabilidade**: Fácil adicionar novos roles no futuro

O sistema está funcionando perfeitamente e atende a todos os requisitos solicitados! 🎉
