# 🚀 Instalação e Execução do Playwright Playground

## Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## Passos para Executar

### 1. Instalar Dependências
```bash
npm install
```

### 2. Executar em Desenvolvimento
```bash
npm run dev
```

### 3. Acessar a Aplicação
Abra seu navegador em: http://localhost:3000

## 🎯 Páginas Disponíveis

- **/** - Landing page com proposta e contato
- **/home** - Página inicial com navegação
- **/desafios** - Lista completa de desafios
- **/comecar** - Escolha de roadmap
- **/roadmap/facil** - Componentes básicos do Ant Design
- **/roadmap/medio** - Uploads de arquivo e validações
- **/roadmap/dificil** - Iframes e comunicação complexa
- **/roadmap/api** - Testes de endpoints de API
- **/roadmap/api-tela** - App completo de TODOs

## 🧪 Executar Testes

### Todos os Testes
```bash
npm run test:e2e
```

### Interface Gráfica
```bash
npm run test:ui
```

### Gerar Testes Automaticamente
```bash
npm run codegen
```

## 📦 Build para Produção

```bash
npm run build
npm start
```

## 🔍 Funcionalidades Principais

### ✅ Implementado
- ✅ Landing page completa
- ✅ Navegação entre páginas
- ✅ Tema claro/escuro persistido
- ✅ XPath Tester em todas as páginas
- ✅ Componentes Ant Design interativos
- ✅ Upload de arquivos CSV
- ✅ Iframes com comunicação
- ✅ APIs funcionais
- ✅ Persistência em localStorage
- ✅ Testes Playwright completos
- ✅ Data-testid em todos os elementos

### 🎨 Interface
- Design moderno com Ant Design v5
- Responsivo para mobile e desktop
- Tema claro/escuro
- Componentes interativos

### 🔧 APIs
- GET /api/ping - Status do servidor
- POST /api/echo - Eco de dados
- CRUD /api/todos - Gerenciamento de TODOs

## 🎯 Como Usar para Aprender

1. **Comece pela Landing**: Entenda a proposta
2. **Explore /home**: Veja as opções disponíveis
3. **Escolha um Roadmap**: Comece pelos Fáceis
4. **Use o XPath Tester**: Teste seletores em tempo real
5. **Execute os Testes**: Veja como automatizar
6. **Pratique**: Modifique e teste diferentes cenários

## 🐛 Solução de Problemas

### Erro de Porta
Se a porta 3000 estiver ocupada:
```bash
npm run dev -- -p 3001
```

### Limpar Cache
```bash
rm -rf .next
npm run dev
```

### Reinstalar Dependências
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Recursos Adicionais

- **Playwright Docs**: https://playwright.dev/
- **Ant Design**: https://ant.design/
- **Next.js**: https://nextjs.org/

## 🎉 Pronto!

O projeto está completo e funcional. Explore todas as funcionalidades e use como playground para aprender automação de testes com Playwright!
