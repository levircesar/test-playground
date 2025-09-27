'use client';
import { Table, Button, Tag, Space, Modal, Typography, message, Select, Tabs } from 'antd';
import { InfoCircleOutlined, CodeOutlined, CopyOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Challenge, applyTranslationsToChallenge } from '@/lib/challenges';
import { useLocale } from '@/lib/locale-context';
import { getTranslations } from '@/lib/translations';

const { Title, Paragraph } = Typography;

interface ChallengeTableProps {
  challenges: Challenge[];
}

export default function ChallengeTable({ challenges }: ChallengeTableProps) {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [solutionModalVisible, setSolutionModalVisible] = useState(false);
  const [selectedSolutionChallenge, setSelectedSolutionChallenge] = useState<Challenge | null>(null);
  const [selectedFramework, setSelectedFramework] = useState<'playwright' | 'cypress'>('playwright');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Verificar no mount
    checkIsMobile();

    // Adicionar listener para mudanças de tamanho
    window.addEventListener('resize', checkIsMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const showModal = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setSelectedChallenge(null);
  };

  const showSolutionModal = (challenge: Challenge) => {
    Modal.confirm({
      title: t.components.challengeTable.modal.viewSolution,
      content: t.components.challengeTable.modal.confirmViewSolution,
      okText: t.components.challengeTable.modal.confirmYes,
      cancelText: t.common.cancel,
      onOk: () => {
        setSelectedSolutionChallenge(challenge);
        setSolutionModalVisible(true);
      },
    });
  };

  const hideSolutionModal = () => {
    setSolutionModalVisible(false);
    setSelectedSolutionChallenge(null);
    setSelectedFramework('playwright');
  };

  const getSolutionCode = (challenge: Challenge): string => {
    if (selectedFramework === 'playwright') {
      return challenge.solucaoPlaywright || generateTestCode(challenge);
    } else {
      return challenge.solucaoCypress || generateTestCode(challenge);
    }
  };

  const generateTestCode = (challenge: Challenge): string => {
    const baseCode = `import { test, expect } from '@playwright/test';

test('${challenge.titulo}', async ({ page }) => {
  await page.goto('${challenge.rota}');
  
  // TODO: Implementar os passos do teste
  // ${challenge.descricao}
  
  // Resultado esperado: ${challenge.resultadoEsperado}
});`;

    // Códigos específicos para cada desafio
    const specificCodes: { [key: string]: string } = {
      '1': `import { test, expect } from '@playwright/test';

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
});`,
      '2': `import { test, expect } from '@playwright/test';

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
});`,
      '3': `import { test, expect } from '@playwright/test';

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
});`,
      '4': `import { test, expect } from '@playwright/test';

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
});`,
      '5': `import { test, expect } from '@playwright/test';

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
});`,
      '6': `import { test, expect } from '@playwright/test';

// Função helper para criar arquivo CSV de teste
const createTestCSV = (filename: string = 'test.csv') => {
  const csvContent = 'Nome,Idade,Cidade\\nJoão Silva,25,São Paulo\\nMaria Santos,30,Rio de Janeiro';
  return {
    name: filename,
    mimeType: 'text/csv',
    buffer: Buffer.from(csvContent)
  };
};

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
});`,
      '7': `import { test, expect } from '@playwright/test';

// Função helper para criar arquivo não-CSV
const createInvalidFile = (filename: string = 'test.txt') => {
  return {
    name: filename,
    mimeType: 'text/plain',
    buffer: Buffer.from('Este não é um arquivo CSV')
  };
};

test('7. Upload com validação de tipo', async ({ page }) => {
  await page.goto('/roadmap/medio');
  
  // Tentar fazer upload de arquivo não-CSV usando helper
  const fileInput = page.getByTestId('pp:medio|upload|simples').locator('input[type="file"]');
  await fileInput.setInputFiles(createInvalidFile());
  
  // Verificar mensagem de erro
  await expect(page.getByText('Apenas arquivos CSV são permitidos!')).toBeVisible();
});`,
      '8': `import { test, expect } from '@playwright/test';

// Função helper para criar arquivo CSV grande
const createLargeCSV = (filename: string = 'large.csv') => {
  const largeContent = 'Nome,Idade\\n' + Array(100000).fill('João Silva,25').join('\\n');
  return {
    name: filename,
    mimeType: 'text/csv',
    buffer: Buffer.from(largeContent)
  };
};

test('8. Upload com validação de tamanho', async ({ page }) => {
  await page.goto('/roadmap/medio');
  
  // Tentar fazer upload de arquivo grande usando helper
  const fileInput = page.getByTestId('pp:medio|upload|simples').locator('input[type="file"]');
  await fileInput.setInputFiles(createLargeCSV());
  
  // Verificar mensagem de erro
  await expect(page.getByText('Arquivo deve ser menor que 5MB!')).toBeVisible();
});`,
      '9': `import { test, expect } from '@playwright/test';

// Função helper para criar arquivo CSV de teste
const createTestCSV = (filename: string = 'test.csv') => {
  const csvContent = 'Nome,Idade,Cidade\\nJoão Silva,25,São Paulo\\nMaria Santos,30,Rio de Janeiro';
  return {
    name: filename,
    mimeType: 'text/csv',
    buffer: Buffer.from(csvContent)
  };
};

test('9. Drag and Drop de arquivo', async ({ page }) => {
  await page.goto('/roadmap/medio');
  
  // Simular drag and drop usando helper
  const dragArea = page.getByTestId('pp:medio|upload|drag');
  await dragArea.setInputFiles(createTestCSV('drag-test.csv'));
  
  // Aguardar processamento
  await expect(page.getByTestId('pp:medio|progress|upload')).toBeVisible();
  await expect(page.getByTestId('pp:medio|section|card|preview')).toBeVisible({ timeout: 5000 });
});`,
      '10': `import { test, expect } from '@playwright/test';

// Função helper para criar arquivo CSV de teste
const createTestCSV = (filename: string = 'test.csv') => {
  const csvContent = 'Nome,Idade,Cidade\\nJoão Silva,25,São Paulo\\nMaria Santos,30,Rio de Janeiro';
  return {
    name: filename,
    mimeType: 'text/csv',
    buffer: Buffer.from(csvContent)
  };
};

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
});`,
      '11': `import { test, expect } from '@playwright/test';

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
});`,
      '12': `import { test, expect } from '@playwright/test';

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
});`,
      '13': `import { test, expect } from '@playwright/test';

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
});`,
      '14': `import { test, expect } from '@playwright/test';

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
});`,
      '15': `import { test, expect } from '@playwright/test';

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
});`,
      '16': `import { test, expect } from '@playwright/test';

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
});`,
      '17': `import { test, expect } from '@playwright/test';

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
});`,
      '18': `import { test, expect } from '@playwright/test';

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
});`,
      '19': `import { test, expect } from '@playwright/test';

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
});`,
      '20': `import { test, expect } from '@playwright/test';

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
  
  await page.getByTestId(\`pp:api-tela|checkbox|done#\${todoId}\`).click();
  
  // Verificar estatísticas atualizadas
  await expect(page.getByTestId('pp:api-tela|stat|completed')).toContainText('1');
  await expect(page.getByTestId('pp:api-tela|stat|pending')).toContainText('0');
});`,
      '21': `import { test, expect } from '@playwright/test';

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
  await page.getByTestId(\`pp:api-tela|btn|delete#\${todoId}\`).click();
  
  // Verificar se foi removido da interface
  await expect(page.getByText('TODO para excluir')).not.toBeVisible();
  await expect(page.getByTestId('pp:api-tela|stat|total')).toContainText('0');
  
  // Verificar via API também
  const apiResponse = await request.get('/api/todos');
  expect(apiResponse.status()).toBe(200);
  const apiData = await apiResponse.json();
  expect(apiData.todos).toHaveLength(0);
});`,
      '22': `import { test, expect } from '@playwright/test';

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
});`,
      '23': `import { test, expect } from '@playwright/test';

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
  
  await page.getByTestId(\`pp:api-tela|checkbox|done#\${todoId}\`).click();
  
  // Limpar concluídos
  await page.getByTestId('pp:api-tela|btn|clear-completed').click();
  
  // Verificar que apenas os pendentes permanecem
  await expect(page.getByTestId('pp:api-tela|stat|completed')).toContainText('0');
  await expect(page.getByTestId('pp:api-tela|stat|pending')).toContainText('1');
});`,
      '24': `import { test, expect } from '@playwright/test';

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
});`,
    };

    return specificCodes[challenge.id.toString()] || baseCode;
  };

  const copyTestCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      message.success('Código copiado para a área de transferência!');
    } catch (err) {
      message.error('Erro ao copiar o código');
    }
  };

  const columns = [
    {
      title: t.components.challengeTable.challenge,
      dataIndex: 'titulo',
      key: 'titulo',
      sorter: (a: Challenge, b: Challenge) => a.titulo.localeCompare(b.titulo),
      ellipsis: isMobile,
    },
    {
      title: t.components.challengeTable.difficulty,
      dataIndex: 'nivel',
      key: 'nivel',
      width: isMobile ? 80 : 120,
      render: (nivel: string) => {
        const color = nivel === 'Fácil' ? 'green' : 
                     nivel === 'Médio' ? 'orange' : 
                     nivel === 'Difícil' ? 'red' : 
                     nivel === 'API' ? 'blue' : 'purple';
        return <Tag color={color} style={{ fontSize: isMobile ? '10px' : '12px' }}>{nivel}</Tag>;
      },
      filters: isMobile ? undefined : [
        { text: 'Fácil', value: 'Fácil' },
        { text: 'Médio', value: 'Médio' },
        { text: 'Difícil', value: 'Difícil' },
        { text: 'API', value: 'API' },
        { text: 'API+Tela', value: 'API+Tela' },
      ],
      onFilter: isMobile ? undefined : (value: boolean | React.Key, record: Challenge) => record.nivel === value,
    },
    {
      title: t.components.challengeTable.modal.type,
      dataIndex: 'tipo',
      key: 'tipo',
      width: isMobile ? 80 : 120,
      render: (tipo: string) => {
        const color = tipo === 'UI' ? 'cyan' : 
                     tipo === 'Upload' ? 'green' : 
                     tipo === 'Iframe' ? 'orange' : 
                     tipo === 'API' ? 'blue' : 'purple';
        return <Tag color={color} style={{ fontSize: isMobile ? '10px' : '12px' }}>{tipo}</Tag>;
      },
      filters: isMobile ? undefined : [
        { text: 'UI', value: 'UI' },
        { text: 'Upload', value: 'Upload' },
        { text: 'Iframe', value: 'Iframe' },
        { text: 'API', value: 'API' },
        { text: 'E2E', value: 'E2E' },
      ],
      onFilter: isMobile ? undefined : (value: boolean | React.Key, record: Challenge) => record.tipo === value,
    },
    ...(isMobile ? [] : [{
      title: t.components.challengeTable.modal.tags,
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => (
        <Space wrap>
          {tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Space>
      ),
    }]),
    {
      title: t.components.challengeTable.actions,
      key: 'action',
      width: isMobile ? 100 : 180,
      render: (_: any, record: Challenge) => (
        <Space>
          <Button
            type="primary"
            size={isMobile ? 'small' : 'small'}
            icon={<InfoCircleOutlined />}
            data-testid={`pp:desafios|table|btn|info#${record.id}`}
            onClick={() => showModal(record)}
            style={{ fontSize: isMobile ? '10px' : '12px' }}
          >
            {isMobile ? 'Info' : t.components.challengeTable.modal.info}
          </Button>
          <Button
            type="default"
            size="small"
            icon={<CodeOutlined />}
            data-testid={`pp:desafios|table|btn|solucao#${record.id}`}
            onClick={() => showSolutionModal(record)}
          >
            {isMobile ? 'Solução' : t.components.challengeTable.modal.solution}
          </Button>
         
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        data-testid="pp:desafios|table|table|root"
        rowKey={(record) => String(record.id)}
        rowClassName={(record) => `row--id-${record.id}`}
        onRow={(record) => ({
          'data-testid': `pp:desafios|table|row|challenge#${record.id}`,
        } as any)}
        columns={columns}
        dataSource={challenges}
        pagination={{
          pageSize: isMobile ? 5 : 10,
          showSizeChanger: !isMobile,
          showQuickJumper: !isMobile,
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} de ${total} desafios`,
          simple: isMobile,
        }}
        scroll={{ x: isMobile ? 600 : 800 }}
        size={isMobile ? 'small' : 'middle'}
      />
      
      <Modal
        title={`${t.components.challengeTable.modal.challengeDetails}: ${selectedChallenge?.titulo}`}
        open={modalVisible}
        onCancel={hideModal}
        footer={[
          <Button key="close" onClick={hideModal}>
            {t.common.close}
          </Button>,
          <Button 
            key="go" 
            type="primary" 
            onClick={() => {
              hideModal();
              if (selectedChallenge) {
                router.push(selectedChallenge.rota);
              }
            }}
          >
            {t.components.challengeTable.modal.goToChallenge}
          </Button>
        ]}
        width={isMobile ? '100%' : 600}
        style={isMobile ? { top: 0, paddingBottom: 0 } : {}}
        data-testid="pp:desafios|modal|root"
      >
        {selectedChallenge && (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={4}>📋 {t.components.challengeTable.modal.description}</Title>
              <Paragraph>{selectedChallenge.descricao}</Paragraph>
            </div>
            
            <div>
              <Title level={4}>✅ {t.components.challengeTable.modal.expectedResult}</Title>
              <Paragraph>{selectedChallenge.resultadoEsperado}</Paragraph>
            </div>
            
            <div>
              <Title level={4}>🏷️ {t.components.challengeTable.modal.information}</Title>
              <Space wrap>
                <Tag color="blue">{selectedChallenge.nivel}</Tag>
                <Tag color="green">{selectedChallenge.tipo}</Tag>
                {selectedChallenge.tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Space>
            </div>
          </Space>
        )}
      </Modal>

      {/* Modal de Solução */}
      <Modal
        title={`${t.components.challengeTable.modal.solution}: ${selectedSolutionChallenge?.titulo}`}
        open={solutionModalVisible}
        onCancel={hideSolutionModal}
        footer={[
          <Button key="close" onClick={hideSolutionModal}>
            {t.common.close}
          </Button>,
          <Button 
            key="copy" 
            type="primary" 
            icon={<CopyOutlined />}
            onClick={() => {
              if (selectedSolutionChallenge) {
                const code = getSolutionCode(selectedSolutionChallenge);
                copyTestCode(code);
              }
            }}
          >
            {t.components.challengeTable.modal.copyCode}
          </Button>
        ]}
        width={isMobile ? '100%' : 900}
        style={isMobile ? { top: 0, paddingBottom: 0 } : {}}
        data-testid="pp:desafios|solution-modal|root"
      >
        {selectedSolutionChallenge && (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={4}>🧪 {t.components.challengeTable.modal.solutions}</Title>
              <Paragraph>
                {t.components.challengeTable.modal.chooseFramework} "{selectedSolutionChallenge.titulo}":
              </Paragraph>
              
              <Space>
                <Select
                  value={selectedFramework}
                  onChange={setSelectedFramework}
                  style={{ width: 200 }}
                  options={[
                    { value: 'playwright', label: t.components.challengeTable.modal.playwright },
                    { value: 'cypress', label: t.components.challengeTable.modal.cypress }
                  ]}
                />
              </Space>
            </div>
            
            <div style={{ 
              background: '#f5f5f5', 
              padding: isMobile ? '12px' : '16px', 
              borderRadius: '8px',
              border: '1px solid #d9d9d9',
              fontFamily: 'monospace',
              fontSize: isMobile ? '11px' : '14px',
              overflow: 'auto',
              maxHeight: isMobile ? '300px' : '400px'
            }}>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                {getSolutionCode(selectedSolutionChallenge)}
              </pre>
            </div>
            
            <div>
              <Title level={5}>{t.components.challengeTable.modal.howToUse}</Title>
              <Paragraph>
                {selectedFramework === 'playwright' ? (
                  <span dangerouslySetInnerHTML={{ __html: t.components.challengeTable.modal.playwrightInstructions }} />
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: t.components.challengeTable.modal.cypressInstructions }} />
                )}
              </Paragraph>
            </div>
          </Space>
        )}
      </Modal>
    </>
  );
}
