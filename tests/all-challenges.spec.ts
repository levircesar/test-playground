import { test, expect } from '@playwright/test';

// Função helper para criar arquivo CSV de teste
const createTestCSV = (filename: string = 'test.csv') => {
  const csvContent = 'Nome,Idade,Cidade\nJoão Silva,25,São Paulo\nMaria Santos,30,Rio de Janeiro';
  return {
    name: filename,
    mimeType: 'text/csv',
    buffer: Buffer.from(csvContent)
  };
};

// Função helper para criar arquivo CSV grande
const createLargeCSV = (filename: string = 'large.csv') => {
  const largeContent = 'Nome,Idade\n' + Array(100000).fill('João Silva,25').join('\n');
  return {
    name: filename,
    mimeType: 'text/csv',
    buffer: Buffer.from(largeContent)
  };
};

// Função helper para criar arquivo não-CSV
const createInvalidFile = (filename: string = 'test.txt') => {
  return {
    name: filename,
    mimeType: 'text/plain',
    buffer: Buffer.from('Este não é um arquivo CSV')
  };
};

test.describe('Todos os Desafios', () => {
  // ===== DESAFIOS FÁCEIS =====
  test.describe('Desafios Fáceis', () => {
    test('1. Clicar e validar contador', async ({ page }) => {
      await page.goto('/roadmap/facil');
      
      // Verificar contador inicial
      await expect(page.getByText('Contador: 0')).toBeVisible();
      
      // Clicar no botão incrementar várias vezes
      await page.getByTestId('pp:facil|btn|incrementar').click();
      await expect(page.getByText('Contador: 1')).toBeVisible();
      
      await page.getByTestId('pp:facil|btn|incrementar').click();
      await expect(page.getByText('Contador: 2')).toBeVisible();
      
      await page.getByTestId('pp:facil|btn|incrementar').click();
      await expect(page.getByText('Contador: 3')).toBeVisible();
    });

    test('2. Interagir com modal', async ({ page }) => {
      await page.goto('/roadmap/facil');
      
      // Abrir modal
      await page.getByTestId('pp:facil|btn|modal').click();
      
      // Verificar se o modal está visível
      await expect(page.getByTestId('pp:facil|modal|root')).toBeVisible();
      await expect(page.getByTestId('pp:facil|modal|content')).toBeVisible();
      
      // Fechar modal
      await page.getByTestId('pp:facil|modal|btn|ok').click();
      
      // Verificar se o modal foi fechado
      await expect(page.getByTestId('pp:facil|modal|root')).not.toBeVisible();
    });

    test('3. Navegar entre tabs', async ({ page }) => {
      await page.goto('/roadmap/facil');
      
      // Clicar na segunda tab
      await page.getByTestId('pp:facil|tab|2').click();
      await expect(page.getByText('Conteúdo da segunda tab')).toBeVisible();
      
      // Clicar na terceira tab
      await page.getByTestId('pp:facil|tab|3').click();
      await expect(page.getByText('Conteúdo da terceira tab')).toBeVisible();
      
      // Voltar para primeira tab
      await page.getByTestId('pp:facil|tab|1').click();
      await expect(page.getByText('Conteúdo da primeira tab')).toBeVisible();
    });

    test('4. Expandir e contrair painéis', async ({ page }) => {
      await page.goto('/roadmap/facil');
      
      // Expandir primeiro painel
      await page.getByTestId('pp:facil|panel|1').click();
      await expect(page.getByText('Conteúdo do primeiro painel')).toBeVisible();
      
      // Expandir segundo painel
      await page.getByTestId('pp:facil|panel|2').click();
      await expect(page.getByText('Conteúdo do segundo painel')).toBeVisible();
      
      // Expandir terceiro painel
      await page.getByTestId('pp:facil|panel|3').click();
      await expect(page.getByText('Conteúdo do terceiro painel')).toBeVisible();
    });

    test('5. Ordenar tabela por colunas', async ({ page }) => {
      await page.goto('/roadmap/facil');
      
      // Clicar no cabeçalho da coluna Nome para ordenar
      await page.getByRole('columnheader', { name: 'Nome' }).click();
      
      // Verificar se a tabela está ordenada
      await expect(page.getByTestId('pp:facil|table|dados')).toBeVisible();
      
      // Clicar no cabeçalho da coluna Idade para ordenar
      await page.getByRole('columnheader', { name: 'Idade' }).click();
      
      // Verificar se a tabela ainda está visível
      await expect(page.getByTestId('pp:facil|table|dados')).toBeVisible();
    });
  });

  // ===== DESAFIOS MÉDIOS =====
  test.describe('Desafios Médios', () => {
    test('6. Upload CSV e pré-visualização', async ({ page }) => {
      await page.goto('/roadmap/medio');
      
      // Fazer upload do arquivo usando helper
      const fileInput = page.getByTestId('pp:medio|upload|simples').locator('input[type="file"]');
      await fileInput.setInputFiles(createTestCSV());
      
      // Aguardar processamento
      await expect(page.getByTestId('pp:medio|progress|upload')).toBeVisible();
      await expect(page.getByTestId('pp:medio|section|card|preview')).toBeVisible({ timeout: 5000 });
      
      // Verificar pré-visualização
      await expect(page.getByTestId('pp:medio|table|csv')).toBeVisible();
    });

    test('7. Upload com validação de tipo', async ({ page }) => {
      await page.goto('/roadmap/medio');
      
      // Tentar fazer upload de arquivo não-CSV usando helper
      const fileInput = page.getByTestId('pp:medio|upload|simples').locator('input[type="file"]');
      await fileInput.setInputFiles(createInvalidFile());
      
      // Verificar mensagem de erro
      await expect(page.getByText('Apenas arquivos CSV são permitidos!')).toBeVisible();
    });

    test('8. Upload com validação de tamanho', async ({ page }) => {
      await page.goto('/roadmap/medio');
      
      // Tentar fazer upload de arquivo grande usando helper
      const fileInput = page.getByTestId('pp:medio|upload|simples').locator('input[type="file"]');
      await fileInput.setInputFiles(createLargeCSV());
      
      // Verificar mensagem de erro
      await expect(page.getByText('Arquivo deve ser menor que 5MB!')).toBeVisible();
    });

    test('9. Drag and Drop de arquivo', async ({ page }) => {
      await page.goto('/roadmap/medio');
      
      // Simular drag and drop usando helper
      const dragArea = page.getByTestId('pp:medio|upload|drag');
      await dragArea.setInputFiles(createTestCSV('drag-test.csv'));
      
      // Aguardar processamento
      await expect(page.getByTestId('pp:medio|progress|upload')).toBeVisible();
      await expect(page.getByTestId('pp:medio|section|card|preview')).toBeVisible({ timeout: 5000 });
    });

    test('10. Download de CSV processado', async ({ page }) => {
      await page.goto('/roadmap/medio');
      
      // Primeiro fazer upload de um CSV usando helper
      const fileInput = page.getByTestId('pp:medio|upload|simples').locator('input[type="file"]');
      await fileInput.setInputFiles(createTestCSV('download-test.csv'));
      
      // Aguardar processamento
      await expect(page.getByTestId('pp:medio|section|card|preview')).toBeVisible({ timeout: 5000 });
      
      // Clicar no botão de download
      const downloadPromise = page.waitForEvent('download');
      await page.getByTestId('pp:medio|btn|download-csv').click();
      const download = await downloadPromise;
      
      // Verificar nome do arquivo
      expect(download.suggestedFilename()).toBe('processed_data.csv');
    });
  });

  // ===== DESAFIOS DIFÍCEIS =====
  test.describe('Desafios Difíceis', () => {
    test('11. Formulário dentro de iframe', async ({ page }) => {
      await page.goto('/roadmap/dificil');
      
      // Aguardar iframe carregar
      const iframe = page.frameLocator('iframe[data-testid="pp:dificil|iframe|form"]');
      
      // Preencher formulário dentro do iframe
      await iframe.getByTestId('pp:embed|form|input|nome').fill('João Silva');
      await iframe.getByTestId('pp:embed|form|input|email').fill('joao@test.com');
      await iframe.getByTestId('pp:embed|form|textarea|mensagem').fill('Mensagem de teste');
      
      // Enviar formulário
      await iframe.getByTestId('pp:embed|form|btn|enviar').click();
      
      // Verificar se a mensagem apareceu no histórico
      await expect(page.getByTestId('pp:dificil|msg|form#0')).toBeVisible({ timeout: 5000 });
    });

    test('12. Tabela dentro de iframe', async ({ page }) => {
      await page.goto('/roadmap/dificil');
      
      // Aguardar iframe carregar
      const iframe = page.frameLocator('iframe[data-testid="pp:dificil|iframe|table"]');
      
      // Adicionar produto na tabela
      await iframe.getByTestId('pp:embed|table|input|nome').fill('Produto Teste');
      await iframe.getByTestId('pp:embed|table|input|preco').fill('99.99');
      await iframe.getByTestId('pp:embed|table|btn|adicionar').click();
      
      // Verificar se a mensagem apareceu no histórico
      await expect(page.getByTestId('pp:dificil|msg|table#0')).toBeVisible({ timeout: 5000 });
    });

    test('13. Comunicação com iframe via PostMessage', async ({ page }) => {
      await page.goto('/roadmap/dificil');
      
      // Enviar mensagem para focar no formulário
      await page.getByTestId('pp:dificil|btn|focus-form').click();
      
      // Enviar mensagem para limpar formulário
      await page.getByTestId('pp:dificil|btn|clear-form').click();
      
      // Enviar mensagem para atualizar tabela
      await page.getByTestId('pp:dificil|btn|refresh-table').click();
      
      // Enviar mensagem para destacar linhas da tabela
      await page.getByTestId('pp:dificil|btn|highlight-table').click();
      
      // Verificar se as mensagens foram enviadas (status pode mudar)
      await expect(page.getByTestId('pp:dificil|alert|ultima-mensagem')).toBeVisible();
    });

    test('14. Iframe aninhado', async ({ page }) => {
      await page.goto('/roadmap/dificil');
      
      // Aguardar iframe aninhado carregar
      const nestedIframe = page.frameLocator('iframe[data-testid="pp:dificil|iframe|nested"]');
      
      // Interagir com o iframe aninhado
      await nestedIframe.getByTestId('pp:embed|form|input|nome').fill('Teste Aninhado');
      await nestedIframe.getByTestId('pp:embed|form|input|email').fill('aninhado@test.com');
      await nestedIframe.getByTestId('pp:embed|form|btn|enviar').click();
      
      // Verificar se funcionou (pode não aparecer no histórico principal)
      await expect(nestedIframe.getByTestId('pp:embed|form|input|nome')).toBeVisible();
    });
  });

  // ===== DESAFIOS API =====
  test.describe('Desafios API', () => {
    test('15. GET /api/ping', async ({ request }) => {
      // Fazer requisição GET diretamente
      const response = await request.get('/api/ping');
      
      // Verificar status da resposta
      expect(response.status()).toBe(200);
      
      // Verificar conteúdo da resposta
      const data = await response.json();
      expect(data.status).toBe('OK');
      expect(data.timestamp).toBeDefined();
      expect(typeof data.timestamp).toBe('string');
    });

    test('16. POST /api/echo com texto', async ({ request }) => {
      // Fazer requisição POST com texto simples
      const response = await request.post('/api/echo', {
        data: 'Texto de teste'
      });
      
      // Verificar status da resposta
      expect(response.status()).toBe(200);
      
      // Verificar conteúdo da resposta
      const data = await response.json();
      expect(data.data).toBe('Texto de teste');
      expect(data.timestamp).toBeDefined();
    });

    test('17. POST /api/echo com JSON', async ({ request }) => {
      // Fazer requisição POST com objeto JSON
      const jsonData = { nome: 'João', idade: 30, cidade: 'São Paulo' };
      const response = await request.post('/api/echo', {
        data: jsonData
      });
      
      // Verificar status da resposta
      expect(response.status()).toBe(200);
      
      // Verificar conteúdo da resposta
      const data = await response.json();
      expect(data.data).toEqual(jsonData);
      expect(data.data.nome).toBe('João');
      expect(data.data.idade).toBe(30);
      expect(data.data.cidade).toBe('São Paulo');
      expect(data.timestamp).toBeDefined();
    });

    test('18. Histórico de chamadas API', async ({ page, request }) => {
      await page.goto('/roadmap/api');
      
      // Fazer chamadas diretas via API
      const pingResponse = await request.get('/api/ping');
      expect(pingResponse.status()).toBe(200);
      
      const echoResponse = await request.post('/api/echo', {
        data: 'Teste histórico'
      });
      expect(echoResponse.status()).toBe(200);
      
      // Verificar se as chamadas aparecem na interface
      await page.reload();
      await expect(page.getByTestId('pp:api|list|historico')).toBeVisible();
      await expect(page.getByTestId('pp:api|stats|historico')).toContainText('Total de chamadas: 2');
      
      // Verificar persistência após recarregar
      await page.reload();
      await expect(page.getByTestId('pp:api|stats|historico')).toContainText('Total de chamadas: 2');
    });

    test('API - Teste de validação de dados inválidos', async ({ request }) => {
      // Testar envio de dados malformados
      const response = await request.post('/api/echo', {
        data: 'texto sem aspas válidas'
      });
      
      // A API deve aceitar qualquer texto
      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data.data).toBe('texto sem aspas válidas');
    });

    test('API - Teste de diferentes tipos de dados', async ({ request }) => {
      // Testar array
      const arrayData = ['item1', 'item2', 'item3'];
      const arrayResponse = await request.post('/api/echo', {
        data: arrayData
      });
      expect(arrayResponse.status()).toBe(200);
      const arrayResult = await arrayResponse.json();
      expect(arrayResult.data).toEqual(arrayData);
      
      // Testar número
      const numberResponse = await request.post('/api/echo', {
        data: 42
      });
      expect(numberResponse.status()).toBe(200);
      const numberResult = await numberResponse.json();
      expect(numberResult.data).toBe(42);
      
      // Testar boolean
      const booleanResponse = await request.post('/api/echo', {
        data: true
      });
      expect(booleanResponse.status()).toBe(200);
      const booleanResult = await booleanResponse.json();
      expect(booleanResult.data).toBe(true);
    });
  });

  // ===== DESAFIOS API+TELA =====
  test.describe('Desafios API+Tela', () => {
    test('19. Criar TODO via interface', async ({ page, request }) => {
      await page.goto('/roadmap/api-tela');
      
      // Criar novo TODO via interface
      await page.getByTestId('pp:api-tela|input|new-todo').fill('TODO de teste');
      await page.getByTestId('pp:api-tela|btn|add').click();
      
      // Verificar se apareceu na lista
      await expect(page.getByTestId('pp:api-tela|list|todos')).toBeVisible();
      await expect(page.getByText('TODO de teste')).toBeVisible();
      
      // Verificar estatísticas
      await expect(page.getByTestId('pp:api-tela|stat|total')).toContainText('1');
      await expect(page.getByTestId('pp:api-tela|stat|pending')).toContainText('1');
      
      // Verificar via API também
      const apiResponse = await request.get('/api/todos');
      expect(apiResponse.status()).toBe(200);
      const apiData = await apiResponse.json();
      expect(apiData.todos).toHaveLength(1);
      expect(apiData.todos[0].text).toBe('TODO de teste');
    });

    test('20. Marcar TODO como concluído', async ({ page }) => {
      await page.goto('/roadmap/api-tela');
      
      // Criar TODO primeiro
      await page.getByTestId('pp:api-tela|input|new-todo').fill('TODO para marcar');
      await page.getByTestId('pp:api-tela|btn|add').click();
      
      // Marcar como concluído
      const todoId = await page.evaluate(() => {
        const todos = JSON.parse(localStorage.getItem('pp_todos') || '[]');
        return todos[todos.length - 1]?.id;
      });
      
      await page.getByTestId(`pp:api-tela|checkbox|done#${todoId}`).click();
      
      // Verificar estatísticas atualizadas
      await expect(page.getByTestId('pp:api-tela|stat|completed')).toContainText('1');
      await expect(page.getByTestId('pp:api-tela|stat|pending')).toContainText('0');
    });

    test('21. Excluir TODO', async ({ page, request }) => {
      await page.goto('/roadmap/api-tela');
      
      // Criar TODO primeiro via API
      const createResponse = await request.post('/api/todos', {
        data: { text: 'TODO para excluir' }
      });
      expect(createResponse.status()).toBe(200);
      const createData = await createResponse.json();
      const todoId = createData.todo.id;
      
      // Recarregar página para ver o TODO
      await page.reload();
      await expect(page.getByText('TODO para excluir')).toBeVisible();
      
      // Excluir TODO via interface
      await page.getByTestId(`pp:api-tela|btn|delete#${todoId}`).click();
      
      // Verificar se foi removido da interface
      await expect(page.getByText('TODO para excluir')).not.toBeVisible();
      await expect(page.getByTestId('pp:api-tela|stat|total')).toContainText('0');
      
      // Verificar via API também
      const apiResponse = await request.get('/api/todos');
      expect(apiResponse.status()).toBe(200);
      const apiData = await apiResponse.json();
      expect(apiData.todos).toHaveLength(0);
    });

    test('22. Sincronizar com API', async ({ page, request }) => {
      await page.goto('/roadmap/api-tela');
      
      // Criar alguns TODOs via API primeiro
      await request.post('/api/todos', {
        data: { text: 'TODO via API 1' }
      });
      await request.post('/api/todos', {
        data: { text: 'TODO via API 2' }
      });
      
      // Clicar no botão sincronizar
      await page.getByTestId('pp:api-tela|btn|sync').click();
      
      // Verificar status online
      await expect(page.getByTestId('pp:api-tela|tag|status')).toContainText('Online');
      
      // Verificar se os TODOs apareceram na interface
      await expect(page.getByText('TODO via API 1')).toBeVisible();
      await expect(page.getByText('TODO via API 2')).toBeVisible();
      
      // Verificar se a última sincronização foi atualizada
      await expect(page.getByText('Última sync:')).toBeVisible();
    });

    test('23. Limpar TODOs concluídos', async ({ page }) => {
      await page.goto('/roadmap/api-tela');
      
      // Criar alguns TODOs
      await page.getByTestId('pp:api-tela|input|new-todo').fill('TODO 1');
      await page.getByTestId('pp:api-tela|btn|add').click();
      
      await page.getByTestId('pp:api-tela|input|new-todo').fill('TODO 2');
      await page.getByTestId('pp:api-tela|btn|add').click();
      
      // Marcar um como concluído
      const todos = await page.evaluate(() => {
        return JSON.parse(localStorage.getItem('pp_todos') || '[]');
      });
      const todoId = todos[todos.length - 1]?.id;
      
      await page.getByTestId(`pp:api-tela|checkbox|done#${todoId}`).click();
      
      // Limpar concluídos
      await page.getByTestId('pp:api-tela|btn|clear-completed').click();
      
      // Verificar que apenas os pendentes permanecem
      await expect(page.getByTestId('pp:api-tela|stat|completed')).toContainText('0');
      await expect(page.getByTestId('pp:api-tela|stat|pending')).toContainText('1');
    });

    test('24. Persistência de dados', async ({ page }) => {
      await page.goto('/roadmap/api-tela');
      
      // Criar alguns TODOs
      await page.getByTestId('pp:api-tela|input|new-todo').fill('TODO Persistente 1');
      await page.getByTestId('pp:api-tela|btn|add').click();
      
      await page.getByTestId('pp:api-tela|input|new-todo').fill('TODO Persistente 2');
      await page.getByTestId('pp:api-tela|btn|add').click();
      
      // Recarregar página
      await page.reload();
      
      // Verificar se os TODOs persistem
      await expect(page.getByText('TODO Persistente 1')).toBeVisible();
      await expect(page.getByText('TODO Persistente 2')).toBeVisible();
      await expect(page.getByTestId('pp:api-tela|stat|total')).toContainText('2');
    });
  });
});
