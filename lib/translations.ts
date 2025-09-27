export interface Translations {
  // Header
  header: {
    title: string;
    start: string;
    challenges: string;
    support: string;
  };
  
  // Footer
  footer: {
    madeWith: string;
    by: string;
    for: string;
    community: string;
  };
  
  // Home page
  home: {
    title: string;
    subtitle: string;
    description: string;
    startButton: string;
    challengesButton: string;
    freeBadge: string;
    howItWorks: string;
    howItWorksDesc: string;
    forWho: string;
    forWhoDesc: string;
    readyToStart: string;
    readyToStartDesc: string;
    aboutCreator: string;
    aboutCreatorDesc: string;
    stats: {
      challenges: string;
      tools: string;
      levels: string;
    };
    features: {
      playwright: string;
      playwrightDesc: string;
      cypress: string;
      cypressDesc: string;
      e2e: string;
      e2eDesc: string;
    };
    audience: {
      qaBeginner: string;
      qaBeginnerDesc: string;
      automation: string;
      automationDesc: string;
      apiTesting: string;
      apiTestingDesc: string;
      e2e: string;
      e2eDesc: string;
    };
    creator: {
      name: string;
      title: string;
      description: string;
      education: string;
      educationDesc: string;
      specialty: string;
      specialtyDesc: string;
    };
  };
  
  // Start page
  start: {
    title: string;
    subtitle: string;
    step1: {
      title: string;
      description: string;
    };
    step2: {
      title: string;
      description: string;
    };
    step3: {
      title: string;
      description: string;
    };
    startButton: string;
  };
  
  // Challenges page
  challenges: {
    title: string;
    subtitle: string;
    difficulty: {
      easy: string;
      medium: string;
      hard: string;
    };
    status: {
      pending: string;
      completed: string;
    };
    startChallenge: string;
    completedChallenge: string;
    noChallenges: string;
    filterBy: string;
    allLevels: string;
    // Challenge descriptions
    challengeList?: {
      [key: string]: {
        titulo: string;
        descricao: string;
        resultadoEsperado: string;
      };
    };
  };
  
  // Roadmap pages
  roadmap: {
    challenges: string;
    viewChallenges: string;
    levels: {
      easy: string;
      medium: string;
      hard: string;
      api: string;
      apiScreen: string;
    };
    easy: {
      title: string;
      subtitle: string;
      description: string;
    };
    medium: {
      title: string;
      subtitle: string;
      description: string;
      uploadSimple: string;
      uploadMultiple: string;
      validations: string;
      challengesToPractice: string;
      csvExample: string;
    };
    hard: {
      title: string;
      subtitle: string;
      description: string;
      iframeCommunication: string;
      nestedIframes: string;
      formInIframe: string;
      postMessage: string;
      challengesToPractice: string;
    };
    api: {
      title: string;
      subtitle: string;
      description: string;
    };
    apiScreen: {
      title: string;
      subtitle: string;
      description: string;
      apiStatus: string;
      online: string;
      offline: string;
      sync: string;
      lastSync: string;
      statistics: string;
      total: string;
      completed: string;
      pending: string;
      addTodo: string;
      clearCompleted: string;
      challengesToPractice: string;
    };
  };
  
  // Embeds pages
  embeds: {
    form: {
      title: string;
      subtitle: string;
      description: string;
    };
    table: {
      title: string;
      subtitle: string;
      description: string;
    };
  };

  // API Docs page
  apiDocs: {
    title: string;
    subtitle: string;
    description: string;
    aboutApis: string;
    aboutApisDesc: string;
    dataStructures: string;
    suggestedChallenges: string;
    endpoints: string;
    method: string;
    endpoint: string;
    title_: string;
    tags: string;
    actions: string;
    test: string;
    details: string;
    examples: string;
    request: string;
    response: string;
    copy: string;
    makeCall: string;
    callMade: string;
    callError: string;
    users: string;
    usersDesc: string;
    products: string;
    productsDesc: string;
    analytics: string;
    analyticsDesc: string;
    challenges: string[];
    viewApis: string;
  };
  
  // Donation page
  donation: {
    title: string;
    subtitle: string;
    description: string;
    qrCodeTitle: string;
    pixKey: string;
    copyPixKey: string;
    pixKeyCopied: string;
    optionalSupport: string;
  };
  
  // Components
  components: {
    backButton: string;
    contactForm: {
      title: string;
      name: string;
      email: string;
      message: string;
      send: string;
      sending: string;
      success: string;
      error: string;
    };
    challengeTable: {
      challenge: string;
      difficulty: string;
      status: string;
      actions: string;
      noData: string;
      modal: {
        description: string;
        expectedResult: string;
        information: string;
        solution: string;
        copyCode: string;
        viewSolution: string;
        confirmViewSolution: string;
        confirmYes: string;
        goToChallenge: string;
        type: string;
        tags: string;
        info: string;
        challengeDetails: string;
        solutions: string;
        chooseFramework: string;
        playwright: string;
        cypress: string;
        howToUse: string;
        playwrightInstructions: string;
        cypressInstructions: string;
      };
    };
    xpathTester: {
      title: string;
      xpath: string;
      test: string;
      results: string;
      noResults: string;
    };
  };
  
  // Introduction pages
  webIntro: {
    title: string;
    subtitle: string;
    description: string;
    concepts: {
      title: string;
      basicConcepts: string;
      basicConceptsDesc: string;
      selectors: string;
      selectorsDesc: string;
      assertions: string;
      assertionsDesc: string;
      interactions: string;
      interactionsDesc: string;
      waiting: string;
      waitingDesc: string;
      details: {
        basicConcepts: {
          title: string;
          explanation: string;
          concepts: string[];
          tips: string[];
        };
        selectors: {
          title: string;
          explanation: string;
          concepts: string[];
          tips: string[];
        };
        assertions: {
          title: string;
          explanation: string;
          concepts: string[];
          tips: string[];
        };
        interactions: {
          title: string;
          explanation: string;
          concepts: string[];
          tips: string[];
        };
        waiting: {
          title: string;
          explanation: string;
          concepts: string[];
          tips: string[];
        };
      };
    };
    commonMethods: {
      title: string;
      clickButton: string;
      clickButtonDesc: string;
      selectDropdown: string;
      selectDropdownDesc: string;
      fillInput: string;
      fillInputDesc: string;
      validateVisible: string;
      validateVisibleDesc: string;
      validateText: string;
      validateTextDesc: string;
      navigate: string;
      navigateDesc: string;
    };
    examples: {
      title: string;
      playwright: string;
      cypress: string;
    };
    nextSteps: string;
    goToApiIntro: string;
    backToStart: string;
  };
  apiIntro: {
    title: string;
    subtitle: string;
    description: string;
    concepts: {
      title: string;
      restBasics: string;
      restBasicsDesc: string;
      httpMethods: string;
      httpMethodsDesc: string;
      statusCodes: string;
      statusCodesDesc: string;
      headers: string;
      headersDesc: string;
      authentication: string;
      authenticationDesc: string;
      details: {
        restBasics: {
          title: string;
          explanation: string;
          concepts: string[];
          tips: string[];
        };
        httpMethods: {
          title: string;
          explanation: string;
          concepts: string[];
          tips: string[];
        };
        statusCodes: {
          title: string;
          explanation: string;
          concepts: string[];
          tips: string[];
        };
        headers: {
          title: string;
          explanation: string;
          concepts: string[];
          tips: string[];
        };
        authentication: {
          title: string;
          explanation: string;
          concepts: string[];
          tips: string[];
        };
      };
    };
    commonMethods: {
      title: string;
      getRequest: string;
      getRequestDesc: string;
      postRequest: string;
      postRequestDesc: string;
      validateResponse: string;
      validateResponseDesc: string;
      validateStatusCode: string;
      validateStatusCodeDesc: string;
      validateHeaders: string;
      validateHeadersDesc: string;
      validateData: string;
      validateDataDesc: string;
    };
    examples: {
      title: string;
      playwright: string;
      cypress: string;
    };
    nextSteps: string;
    goToWebIntro: string;
    backToStart: string;
  };

  // Common
  common: {
    loading: string;
    error: string;
    back: string;
    next: string;
    previous: string;
    close: string;
    save: string;
    cancel: string;
    yes: string;
    no: string;
    success: string;
    warning: string;
    info: string;
    search: string;
    filter: string;
    clear: string;
    reset: string;
    submit: string;
    edit: string;
    delete: string;
    view: string;
    download: string;
    upload: string;
    copy: string;
    paste: string;
    cut: string;
    select: string;
    selectAll: string;
    deselect: string;
  };
}

export const translations: Record<string, Translations> = {
  'pt-BR': {
    header: {
      title: 'Test Playground',
      start: 'Começar',
      challenges: 'Desafios',
      support: 'Apoiar',
    },
    footer: {
      madeWith: 'Feito com',
      by: 'por',
      for: 'para a',
      community: 'comunidade',
    },
    home: {
      title: 'Test Playground',
      subtitle: 'Ambiente de testes para aprendizado web e API',
      description: 'Uma plataforma interativa para aprender automação de testes web e API através de desafios práticos, com dicas de Playwright e Cypress.',
      startButton: 'Começar Agora',
      challengesButton: 'Ver Desafios',
      freeBadge: '100% Gratuito',
      howItWorks: 'Como Funciona',
      howItWorksDesc: 'Aprenda através de cenários práticos de testes web e API, com dicas e exemplos de Playwright, Cypress e outras ferramentas',
      forWho: 'Para Quem É?',
      forWhoDesc: 'Desenvolvido para todos os níveis de conhecimento em automação de testes web e API, com foco em Playwright e Cypress',
      readyToStart: 'Pronto para Começar?',
      readyToStartDesc: 'Junte-se a milhares de desenvolvedores que já dominam testes web e API com Playwright, Cypress e outras ferramentas',
      aboutCreator: 'Sobre o Criador',
      aboutCreatorDesc: 'Conheça quem desenvolveu esta plataforma para a comunidade de QA',
      stats: {
        challenges: 'Desafios',
        tools: 'Ferramentas',
        levels: 'Níveis',
      },
      features: {
        playwright: 'Testes Web',
        playwrightDesc: 'Pratique testes de interface com botões, formulários e tabelas usando Playwright e Cypress.',
        cypress: 'Testes de API',
        cypressDesc: 'Teste APIs REST, validações de dados e cenários de integração com exemplos práticos.',
        e2e: 'Ambiente Completo',
        e2eDesc: 'Domine testes end-to-end, iframes e comunicação entre elementos com ambas as ferramentas.',
      },
      audience: {
        qaBeginner: 'QA Iniciante',
        qaBeginnerDesc: 'Aprenda os conceitos básicos de testes web e API',
        automation: 'Automação',
        automationDesc: 'Pratique cenários complexos de teste com Playwright e Cypress',
        apiTesting: 'Testes de API',
        apiTestingDesc: 'Integre testes de API com testes de interface',
        e2e: 'E2E',
        e2eDesc: 'Fluxos completos de ponta a ponta',
      },
      creator: {
        name: 'Levir Lemos',
        title: 'Quality Assurance Analyst & Test Automation Specialist',
        description: 'Olá pessoal! Trabalho como SDET (Software Development Engineer in Test) e tenho experiência com Playwright, Cypress, Selenium e outras ferramentas de teste. Criei esta plataforma para democratizar o aprendizado de automação de testes e ajudar a comunidade QA.',
        education: 'Formação',
        educationDesc: 'Bacharel em Sistemas de informação',
        specialty: 'Especialidade',
        specialtyDesc: 'Test Automation & QA',
      },
    },
    start: {
      title: 'Como Começar',
      subtitle: 'Siga estes passos para começar sua jornada com Playwright',
      step1: {
        title: 'Instale o Playwright',
        description: 'Execute o comando de instalação em seu projeto',
      },
      step2: {
        title: 'Configure seu ambiente',
        description: 'Configure os navegadores e dependências necessárias',
      },
      step3: {
        title: 'Execute seus primeiros testes',
        description: 'Comece com testes simples e evolua gradualmente',
      },
      startButton: 'Começar Desafios',
    },
    challenges: {
      title: 'Desafios',
      subtitle: 'Pratique com desafios práticos',
      difficulty: {
        easy: 'Fácil',
        medium: 'Médio',
        hard: 'Difícil',
      },
      status: {
        pending: 'Pendente',
        completed: 'Concluído',
      },
      startChallenge: 'Iniciar Desafio',
      completedChallenge: 'Desafio Concluído',
      noChallenges: 'Nenhum desafio encontrado',
      filterBy: 'Filtrar por',
      allLevels: 'Todos os níveis',
      challengeList: {
        '1': {
          titulo: 'Clicar e validar contador',
          descricao: 'Clique no botão de incrementar e valide se o contador aumenta corretamente',
          resultadoEsperado: 'O contador deve incrementar de 0 para 1, 2, 3... a cada clique no botão'
        },
        '2': {
          titulo: 'Interagir com modal',
          descricao: 'Abra um modal, interaja com seus elementos e feche-o',
          resultadoEsperado: 'O modal deve abrir, permitir interação e fechar corretamente'
        },
        '3': {
          titulo: 'Navegar entre tabs',
          descricao: 'Navegue entre as diferentes abas e valide o conteúdo de cada uma',
          resultadoEsperado: 'Cada aba deve exibir seu conteúdo específico quando selecionada'
        },
        '4': {
          titulo: 'Expandir e contrair painéis',
          descricao: 'Expanda e contraia os painéis do componente Collapse',
          resultadoEsperado: 'Os painéis devem expandir e contrair corretamente ao clicar nos cabeçalhos'
        },
        '5': {
          titulo: 'Ordenar tabela por colunas',
          descricao: 'Ordene a tabela clicando nos cabeçalhos das colunas',
          resultadoEsperado: 'A tabela deve ser ordenada corretamente por nome e idade'
        },
        '6': {
          titulo: 'Upload CSV e pré-visualização',
          descricao: 'Faça upload de um arquivo CSV e valide a pré-visualização dos dados',
          resultadoEsperado: 'O arquivo deve ser carregado e os dados devem ser exibidos em uma tabela de pré-visualização'
        },
        '7': {
          titulo: 'Upload com validação de tipo',
          descricao: 'Tente fazer upload de um arquivo não-CSV e valide a mensagem de erro',
          resultadoEsperado: 'Deve aparecer uma mensagem de erro informando que apenas arquivos CSV são permitidos'
        },
        '8': {
          titulo: 'Upload com validação de tamanho',
          descricao: 'Tente fazer upload de um arquivo maior que 5MB e valide a validação',
          resultadoEsperado: 'Deve aparecer uma mensagem de erro informando que o arquivo deve ser menor que 5MB'
        },
        '9': {
          titulo: 'Drag and Drop de arquivo',
          descricao: 'Use a área de drag and drop para fazer upload de um arquivo CSV',
          resultadoEsperado: 'O arquivo deve ser carregado corretamente quando arrastado para a área'
        },
        '10': {
          titulo: 'Download de CSV processado',
          descricao: 'Após fazer upload de um CSV, baixe o arquivo processado',
          resultadoEsperado: 'O arquivo CSV processado deve ser baixado com o nome \'processed_data.csv\''
        },
        '11': {
          titulo: 'Formulário dentro de iframe',
          descricao: 'Preencha e envie o formulário que está dentro do iframe',
          resultadoEsperado: 'O formulário deve ser preenchido e enviado corretamente, aparecendo no histórico'
        },
        '12': {
          titulo: 'Tabela dentro de iframe',
          descricao: 'Adicione, edite ou remova produtos na tabela dentro do iframe',
          resultadoEsperado: 'As operações na tabela devem funcionar corretamente e aparecer no histórico'
        },
        '13': {
          titulo: 'Comunicação com iframe via PostMessage',
          descricao: 'Use os botões de controle para enviar mensagens aos iframes',
          resultadoEsperado: 'As mensagens devem ser enviadas e recebidas corretamente entre pai e iframe'
        },
        '14': {
          titulo: 'Iframe aninhado',
          descricao: 'Interaja com o iframe aninhado (iframe dentro de iframe)',
          resultadoEsperado: 'Deve ser possível interagir com o conteúdo do iframe aninhado'
        },
        '15': {
          titulo: 'GET /api/ping',
          descricao: 'Faça uma requisição GET para /api/ping e valide a resposta',
          resultadoEsperado: 'A API deve retornar status OK e timestamp do servidor'
        },
        '16': {
          titulo: 'POST /api/echo com texto',
          descricao: 'Envie um texto simples via POST para /api/echo',
          resultadoEsperado: 'A API deve retornar o texto enviado junto com timestamp do servidor'
        },
        '17': {
          titulo: 'POST /api/echo com JSON',
          descricao: 'Envie um objeto JSON via POST para /api/echo',
          resultadoEsperado: 'A API deve retornar o objeto JSON enviado junto com timestamp do servidor'
        },
        '18': {
          titulo: 'Histórico de chamadas API',
          descricao: 'Verifique se as chamadas de API são salvas no histórico do localStorage',
          resultadoEsperado: 'Todas as chamadas devem aparecer no histórico e persistir após recarregar a página'
        },
        '19': {
          titulo: 'Criar TODO via interface',
          descricao: 'Crie um novo TODO usando o formulário da interface',
          resultadoEsperado: 'O TODO deve aparecer na lista e ser salvo no localStorage'
        },
        '20': {
          titulo: 'Marcar TODO como concluído',
          descricao: 'Use o checkbox para marcar um TODO como concluído',
          resultadoEsperado: 'O TODO deve ser marcado como concluído e atualizar as estatísticas'
        },
        '21': {
          titulo: 'Excluir TODO',
          descricao: 'Exclua um TODO usando o botão de exclusão',
          resultadoEsperado: 'O TODO deve ser removido da lista e das estatísticas'
        },
        '22': {
          titulo: 'Sincronizar com API',
          descricao: 'Use o botão sincronizar para atualizar os dados com a API',
          resultadoEsperado: 'Os dados devem ser sincronizados com a API e o status deve mostrar \'Online\''
        },
        '23': {
          titulo: 'Limpar TODOs concluídos',
          descricao: 'Use o botão \'Limpar Concluídos\' para remover todos os TODOs marcados',
          resultadoEsperado: 'Apenas os TODOs pendentes devem permanecer na lista'
        },
        '24': {
          titulo: 'Persistência de dados',
          descricao: 'Recarregue a página e verifique se os TODOs persistem',
          resultadoEsperado: 'Todos os TODOs devem continuar na lista após recarregar a página'
        }
      }
    },
    roadmap: {
      challenges: 'Desafios',
      viewChallenges: 'Ver Desafios',
      levels: {
        easy: 'Fácil',
        medium: 'Médio',
        hard: 'Difícil',
        api: 'API',
        apiScreen: 'API+Tela',
      },
      easy: {
        title: 'Desafios Fáceis',
        subtitle: 'Comece com conceitos básicos de Playwright',
        description: 'Desafios para iniciantes que querem aprender os fundamentos da automação de testes.',
      },
      medium: {
        title: 'Desafios Médios',
        subtitle: 'Evolua para cenários mais complexos',
        description: 'Desafios intermediários que testam conhecimentos mais avançados de automação.',
        uploadSimple: 'Upload Simples',
        uploadMultiple: 'Upload Múltiplo',
        validations: 'Validações',
        challengesToPractice: 'Desafios para Praticar',
        csvExample: 'Exemplo de CSV para Teste',
      },
      hard: {
        title: 'Desafios Difíceis',
        subtitle: 'Domine cenários avançados e complexos',
        description: 'Desafios para especialistas que querem testar conhecimentos avançados.',
        iframeCommunication: 'Comunicação com Iframe',
        nestedIframes: 'Iframes Aninhados',
        formInIframe: 'Formulário em Iframe',
        postMessage: 'PostMessage',
        challengesToPractice: 'Desafios para Praticar',
      },
      api: {
        title: 'Testes de API',
        subtitle: 'Aprenda a testar APIs com Playwright',
        description: 'Desafios focados em testes de API e integração com testes de interface.',
      },
      apiScreen: {
        title: 'API + Tela',
        subtitle: 'Integre testes de API com testes de interface',
        description: 'Desafios que combinam testes de API com testes de interface para cenários completos.',
        apiStatus: 'Status da API',
        online: 'Online',
        offline: 'Offline',
        sync: 'Sincronizar',
        lastSync: 'Última sync',
        statistics: 'Estatísticas',
        total: 'Total',
        completed: 'Concluídos',
        pending: 'Pendentes',
        addTodo: 'Adicionar TODO',
        clearCompleted: 'Limpar Concluídos',
        challengesToPractice: 'Desafios para Praticar',
      },
    },
    embeds: {
      form: {
        title: 'Formulário Interativo',
        subtitle: 'Pratique testes de formulários',
        description: 'Formulário completo para testar validações, campos obrigatórios e interações.',
      },
      table: {
        title: 'Tabela de Dados',
        subtitle: 'Teste manipulação de tabelas',
        description: 'Tabela interativa para testar ordenação, filtros e paginação.',
      },
    },
    apiDocs: {
      title: 'Documentação da API',
      subtitle: 'Documentação completa das APIs disponíveis no Test Playground',
      description: 'Documentação completa das APIs disponíveis no Test Playground. Teste os endpoints diretamente e veja exemplos de uso.',
      aboutApis: 'Sobre as APIs',
      aboutApisDesc: 'Estas APIs foram criadas para demonstração e prática de testes automatizados. Elas simulam diferentes estruturas de dados e cenários comuns em aplicações reais.',
      dataStructures: 'Estruturas de Dados',
      suggestedChallenges: 'Desafios Sugeridos',
      endpoints: 'Endpoints Disponíveis',
      method: 'Método',
      endpoint: 'Endpoint',
      title_: 'Título',
      tags: 'Tags',
      actions: 'Ações',
      test: 'Testar',
      details: 'Detalhes',
      examples: 'Exemplos',
      request: 'Request:',
      response: 'Response:',
      copy: 'Copiar',
      makeCall: 'Fazer Chamada',
      callMade: 'Chamada realizada com sucesso!',
      callError: 'Erro na chamada da API',
      users: 'Usuários',
      usersDesc: 'Objetos complexos com perfis e habilidades',
      products: 'Produtos',
      productsDesc: 'Catálogo com inventário e avaliações',
      analytics: 'Analytics',
      analyticsDesc: 'Métricas e dados de performance',
      challenges: [
        'Teste todos os endpoints GET',
        'Valide estruturas de resposta',
        'Teste filtros e parâmetros',
        'Valide criação de dados via POST',
        'Teste cenários de erro',
        'Verifique códigos de status HTTP'
      ],
      viewApis: 'Ver APIs'
    },
    donation: {
      title: 'Apoie o Projeto',
      subtitle: 'Ajude a manter este projeto gratuito',
      description: 'Este projeto é mantido gratuitamente para a comunidade. Sua contribuição ajuda a manter os servidores e melhorar a plataforma.',
      qrCodeTitle: 'QR Code PIX',
      pixKey: 'Chave PIX',
      copyPixKey: 'Copiar Chave PIX',
      pixKeyCopied: 'Chave PIX copiada!',
      optionalSupport: 'Apoios são opcionais e ajudam a manter o projeto gratuito',
    },
    webIntro: {
      title: 'Introdução aos Testes de Aplicações Web',
      subtitle: 'Aprenda os conceitos fundamentais de automação de testes web',
      description: 'Esta página ensina os conceitos básicos e métodos mais comuns para testes de aplicações web usando Playwright e Cypress.',
      concepts: {
        title: 'Conceitos Fundamentais',
        basicConcepts: 'Conceitos Básicos',
        basicConceptsDesc: 'Entenda o que são testes automatizados e como funcionam',
        selectors: 'Seletores',
        selectorsDesc: 'Aprenda a localizar elementos na página (CSS, XPath, data-testid)',
        assertions: 'Asserções',
        assertionsDesc: 'Como validar se os elementos estão corretos',
        interactions: 'Interações',
        interactionsDesc: 'Como simular ações do usuário (clique, digitação, etc.)',
      waiting: 'Esperas',
      waitingDesc: 'Como aguardar elementos carregarem ou condições serem atendidas',
      details: {
        basicConcepts: {
          title: 'Conceitos Básicos de Testes Automatizados',
          explanation: 'Os testes automatizados são scripts que simulam interações de usuários reais com aplicações web. Eles verificam se a aplicação funciona corretamente sem intervenção manual.',
          concepts: [
            'Testes automatizados executam ações programaticamente',
            'Verificam se a aplicação responde como esperado',
            'Podem ser executados repetidamente sem falha',
            'Economizam tempo e reduzem erros humanos',
            'Permitem detecção precoce de problemas'
          ],
          tips: [
            'Comece com testes simples antes de partir para cenários complexos',
            'Use seletores estáveis (data-testid) em vez de classes CSS',
            'Escreva testes independentes que não dependam uns dos outros',
            'Mantenha os testes organizados e bem documentados',
            'Execute os testes regularmente durante o desenvolvimento'
          ]
        },
        selectors: {
          title: 'Seletores de Elementos',
          explanation: 'Seletores são formas de localizar elementos específicos na página web. São fundamentais para interagir com botões, campos de texto, links e outros componentes.',
          concepts: [
            'CSS Selectors: baseados em classes, IDs e hierarquia HTML',
            'XPath: linguagem poderosa para navegar na estrutura XML/HTML',
            'data-testid: atributos especiais criados para testes',
            'Texto visível: localizar elementos pelo texto que contêm',
            'Hierarquia: usar parent/child para elementos aninhados'
          ],
          tips: [
            'Prefira data-testid sobre classes CSS (mais estáveis)',
            'Use seletores específicos mas não frágeis',
            'Evite seletores baseados em posição (primeiro, último)',
            'Teste seus seletores antes de usar nos testes',
            'Documente seletores complexos para facilitar manutenção'
          ]
        },
        assertions: {
          title: 'Asserções e Validações',
          explanation: 'Asserções são verificações que confirmam se o comportamento da aplicação está correto. Elas comparam o estado atual com o estado esperado.',
          concepts: [
            'toBeVisible(): verifica se elemento está visível',
            'toHaveText(): confirma se texto está correto',
            'toBeEnabled(): verifica se elemento está habilitado',
            'toHaveValue(): valida valor em campos de entrada',
            'toHaveCount(): confirma quantidade de elementos'
          ],
          tips: [
            'Use asserções específicas em vez de genéricas',
            'Aguarde elementos carregarem antes de validar',
            'Valide tanto estados positivos quanto negativos',
            'Combine múltiplas asserções para validações completas',
            'Use mensagens descritivas nas asserções'
          ]
        },
        interactions: {
          title: 'Interações com Elementos',
          explanation: 'Interações simulam ações que um usuário real faria na aplicação, como clicar, digitar, selecionar opções e navegar entre páginas.',
          concepts: [
            'click(): simula clique em botões e links',
            'type(): digita texto em campos de entrada',
            'selectOption(): seleciona opções em dropdowns',
            'hover(): simula passar o mouse sobre elementos',
            'dragAndDrop(): arrasta e solta elementos'
          ],
          tips: [
            'Aguarde elementos estarem interativos antes de clicar',
            'Use clear() antes de type() em campos com valor existente',
            'Simule interações realistas (pausas, velocidade)',
            'Trate elementos dinâmicos que podem aparecer/desaparecer',
            'Teste interações em diferentes dispositivos e tamanhos de tela'
          ]
        },
        waiting: {
          title: 'Estratégias de Espera',
          explanation: 'Esperas são essenciais para lidar com elementos que carregam dinamicamente. Evitam falhas por timing e tornam os testes mais confiáveis.',
          concepts: [
            'waitForSelector(): aguarda elemento aparecer',
            'waitForNavigation(): aguarda navegação completar',
            'waitForResponse(): aguarda requisições de rede',
            'waitForFunction(): aguarda condição personalizada',
            'waitForTimeout(): espera tempo fixo (último recurso)'
          ],
          tips: [
            'Prefira esperas inteligentes sobre timeouts fixos',
            'Configure timeouts apropriados para cada tipo de espera',
            'Use waitForSelector antes de interagir com elementos',
            'Aguarde requisições de rede quando necessário',
            'Evite timeouts muito longos que tornam testes lentos'
          ]
        }
      }
    },
      commonMethods: {
        title: 'Métodos Mais Comuns',
        clickButton: 'Clicar em Botão',
        clickButtonDesc: 'Como clicar em botões e validar o resultado',
        selectDropdown: 'Selecionar Dropdown',
        selectDropdownDesc: 'Como selecionar opções em listas suspensas',
        fillInput: 'Preencher Input',
        fillInputDesc: 'Como preencher campos de texto',
        validateVisible: 'Validar Elemento Visível',
        validateVisibleDesc: 'Como verificar se um elemento está visível',
        validateText: 'Validar Texto',
        validateTextDesc: 'Como verificar se o texto está correto',
        navigate: 'Navegar',
        navigateDesc: 'Como navegar entre páginas',
      },
      examples: {
        title: 'Exemplos Práticos',
        playwright: 'Playwright',
        cypress: 'Cypress',
      },
      nextSteps: 'Próximos Passos',
      goToApiIntro: 'Testes de API',
      backToStart: 'Voltar ao Início',
    },
    apiIntro: {
      title: 'Introdução aos Testes de API',
      subtitle: 'Aprenda os conceitos fundamentais de testes de API REST',
      description: 'Esta página ensina os conceitos básicos e métodos mais comuns para testes de API usando Playwright e Cypress.',
      concepts: {
        title: 'Conceitos Fundamentais',
        restBasics: 'Fundamentos REST',
        restBasicsDesc: 'Entenda o que é REST e como funcionam as APIs',
        httpMethods: 'Métodos HTTP',
        httpMethodsDesc: 'GET, POST, PUT, DELETE e quando usar cada um',
        statusCodes: 'Códigos de Status',
        statusCodesDesc: 'Entenda os códigos de resposta HTTP (200, 404, 500, etc.)',
        headers: 'Headers',
        headersDesc: 'Como usar e validar headers HTTP',
      authentication: 'Autenticação',
      authenticationDesc: 'Como autenticar requisições (Bearer token, API key, etc.)',
      details: {
        restBasics: {
          title: 'Fundamentos de APIs REST',
          explanation: 'REST (Representational State Transfer) é um estilo arquitetural para desenvolvimento de APIs web. APIs REST usam métodos HTTP padrão para operações CRUD em recursos.',
          concepts: [
            'Recursos são identificados por URLs únicas',
            'Métodos HTTP definem a operação (GET, POST, PUT, DELETE)',
            'Stateless: cada requisição é independente',
            'JSON é o formato mais comum para dados',
            'Códigos de status HTTP indicam resultado da operação'
          ],
          tips: [
            'Use URLs descritivas e consistentes para recursos',
            'Siga convenções REST para métodos HTTP',
            'Retorne códigos de status apropriados',
            'Use JSON para estruturar dados de resposta',
            'Implemente versionamento da API quando necessário'
          ]
        },
        httpMethods: {
          title: 'Métodos HTTP e Quando Usar',
          explanation: 'Os métodos HTTP definem a ação que será executada em um recurso. Cada método tem um propósito específico e deve ser usado corretamente.',
          concepts: [
            'GET: recuperar dados (ler) - não modifica estado',
            'POST: criar novos recursos - pode modificar estado',
            'PUT: atualizar recurso completo - substitui dados',
            'PATCH: atualização parcial - modifica apenas campos específicos',
            'DELETE: remover recurso - pode modificar estado'
          ],
          tips: [
            'Use GET apenas para operações de leitura',
            'POST é ideal para criar novos recursos',
            'PUT substitui o recurso inteiro',
            'PATCH é mais eficiente para atualizações parciais',
            'DELETE remove o recurso permanentemente'
          ]
        },
        statusCodes: {
          title: 'Códigos de Status HTTP',
          explanation: 'Códigos de status HTTP são números de 3 dígitos que indicam o resultado de uma requisição. Eles ajudam a entender se a operação foi bem-sucedida ou se houve erro.',
          concepts: [
            '2xx: Sucesso (200 OK, 201 Created, 204 No Content)',
            '3xx: Redirecionamento (301 Moved, 304 Not Modified)',
            '4xx: Erro do cliente (400 Bad Request, 401 Unauthorized, 404 Not Found)',
            '5xx: Erro do servidor (500 Internal Server Error, 503 Service Unavailable)',
            'Códigos específicos indicam tipos diferentes de problemas'
          ],
          tips: [
            '200: operação bem-sucedida',
            '201: recurso criado com sucesso',
            '400: dados inválidos na requisição',
            '401: autenticação necessária',
            '404: recurso não encontrado',
            '500: erro interno do servidor'
          ]
        },
        headers: {
          title: 'Headers HTTP',
          explanation: 'Headers são metadados que acompanham requisições e respostas HTTP. Eles fornecem informações sobre o conteúdo, autenticação, cache e outras configurações.',
          concepts: [
            'Content-Type: especifica formato dos dados (application/json)',
            'Authorization: credenciais de autenticação (Bearer token)',
            'Accept: tipos de conteúdo aceitos pelo cliente',
            'Cache-Control: diretivas de cache',
            'Custom headers: informações específicas da aplicação'
          ],
          tips: [
            'Sempre especifique Content-Type nas requisições POST/PUT',
            'Use Authorization header para autenticação',
            'Configure Accept para indicar formato esperado',
            'Implemente headers customizados quando necessário',
            'Valide headers obrigatórios nos testes'
          ]
        },
        authentication: {
          title: 'Autenticação em APIs',
          explanation: 'Autenticação garante que apenas usuários autorizados possam acessar recursos protegidos. Existem várias estratégias para implementar autenticação em APIs.',
          concepts: [
            'API Key: chave simples para identificação',
            'Bearer Token: token de acesso (JWT, OAuth)',
            'Basic Auth: usuário e senha codificados em Base64',
            'OAuth 2.0: padrão para autorização de terceiros',
            'JWT: tokens auto-contidos com informações do usuário'
          ],
          tips: [
            'Use HTTPS para transmitir credenciais com segurança',
            'Implemente expiração de tokens para segurança',
            'Valide tokens em todas as requisições protegidas',
            'Use refresh tokens para renovação de acesso',
            'Implemente rate limiting para prevenir abuso'
          ]
        }
      }
    },
      commonMethods: {
        title: 'Métodos Mais Comuns',
        getRequest: 'Requisições GET',
        getRequestDesc: 'Como fazer requisições GET e validar dados',
        postRequest: 'Requisições POST',
        postRequestDesc: 'Como enviar dados via POST',
        validateResponse: 'Validar Resposta',
        validateResponseDesc: 'Como validar o corpo da resposta',
        validateStatusCode: 'Validar Status Code',
        validateStatusCodeDesc: 'Como verificar códigos de status HTTP',
        validateHeaders: 'Validar Headers',
        validateHeadersDesc: 'Como validar headers da resposta',
        validateData: 'Validar Dados',
        validateDataDesc: 'Como validar estrutura e conteúdo dos dados',
      },
      examples: {
        title: 'Exemplos Práticos',
        playwright: 'Playwright',
        cypress: 'Cypress',
      },
      nextSteps: 'Próximos Passos',
      goToWebIntro: 'Testes Web',
      backToStart: 'Voltar ao Início',
    },
    components: {
      backButton: 'Voltar',
      contactForm: {
        title: 'Entre em Contato',
        name: 'Nome',
        email: 'Email',
        message: 'Mensagem',
        send: 'Enviar',
        sending: 'Enviando...',
        success: 'Mensagem enviada com sucesso!',
        error: 'Erro ao enviar mensagem',
      },
      challengeTable: {
        challenge: 'Desafio',
        difficulty: 'Dificuldade',
        status: 'Status',
        actions: 'Ações',
        noData: 'Nenhum dado disponível',
        modal: {
          description: 'Descrição do Desafio',
          expectedResult: 'Resultado Esperado',
          information: 'Informações',
          solution: 'Solução',
          copyCode: 'Copiar Código',
          viewSolution: 'Ver Solução',
          confirmViewSolution: 'Tem certeza que deseja ver a solução deste desafio? Isso pode reduzir o aprendizado.',
          confirmYes: 'Sim, mostrar solução',
          goToChallenge: 'Ir para o Desafio',
          type: 'Tipo',
          tags: 'Tags',
          info: 'Info',
          challengeDetails: 'Detalhes do Desafio',
          solutions: 'Soluções de Teste',
          chooseFramework: 'Escolha o framework e veja a solução para o desafio',
          playwright: '🎭 Playwright',
          cypress: '🌲 Cypress',
          howToUse: '💡 Como usar:',
          playwrightInstructions: '1. Copie o código acima<br/>2. Cole em um arquivo .spec.ts<br/>3. Execute com: npx playwright test',
          cypressInstructions: '1. Copie o código acima<br/>2. Cole em um arquivo .cy.ts<br/>3. Execute com: npx cypress run',
        },
      },
      xpathTester: {
        title: 'Testador de XPath',
        xpath: 'XPath',
        test: 'Testar',
        results: 'Resultados',
        noResults: 'Nenhum resultado encontrado',
      },
    },
    common: {
      loading: 'Carregando...',
      error: 'Erro',
      back: 'Voltar',
      next: 'Próximo',
      previous: 'Anterior',
      close: 'Fechar',
      save: 'Salvar',
      cancel: 'Cancelar',
      yes: 'Sim',
      no: 'Não',
      success: 'Sucesso',
      warning: 'Aviso',
      info: 'Informação',
      search: 'Buscar',
      filter: 'Filtrar',
      clear: 'Limpar',
      reset: 'Resetar',
      submit: 'Enviar',
      edit: 'Editar',
      delete: 'Excluir',
      view: 'Visualizar',
      download: 'Baixar',
      upload: 'Enviar',
      copy: 'Copiar',
      paste: 'Colar',
      cut: 'Cortar',
      select: 'Selecionar',
      selectAll: 'Selecionar Tudo',
      deselect: 'Desselecionar',
    },
  },
  'en-US': {
    header: {
      title: 'Test Playground',
      start: 'Start',
      challenges: 'Challenges',
      support: 'Support',
    },
    footer: {
      madeWith: 'Made with',
      by: 'by',
      for: 'for the',
      community: 'community',
    },
    home: {
      title: 'Test Playground',
      subtitle: 'Testing environment for web and API learning',
      description: 'An interactive platform to learn web and API test automation through practical challenges, with tips for Playwright and Cypress.',
      startButton: 'Start Now',
      challengesButton: 'View Challenges',
      freeBadge: '100% Free',
      howItWorks: 'How It Works',
      howItWorksDesc: 'Learn through practical web and API testing scenarios, with tips and examples for Playwright, Cypress and other tools',
      forWho: 'Who Is It For?',
      forWhoDesc: 'Developed for all levels of knowledge in web and API test automation, focusing on Playwright and Cypress',
      readyToStart: 'Ready to Start?',
      readyToStartDesc: 'Join thousands of developers who already master web and API testing with Playwright, Cypress and other tools',
      aboutCreator: 'About the Creator',
      aboutCreatorDesc: 'Meet who developed this platform for the QA community',
      stats: {
        challenges: 'Challenges',
        tools: 'Tools',
        levels: 'Levels',
      },
      features: {
        playwright: 'Web Testing',
        playwrightDesc: 'Practice interface testing with buttons, forms and tables using Playwright and Cypress.',
        cypress: 'API Testing',
        cypressDesc: 'Test REST APIs, data validation and integration scenarios with practical examples.',
        e2e: 'Complete Environment',
        e2eDesc: 'Master end-to-end testing, iframes and element communication with both tools.',
      },
      audience: {
        qaBeginner: 'QA Beginner',
        qaBeginnerDesc: 'Learn the basics of web and API testing',
        automation: 'Automation',
        automationDesc: 'Practice complex test scenarios with Playwright and Cypress',
        apiTesting: 'API Testing',
        apiTestingDesc: 'Integrate API tests with interface tests',
        e2e: 'E2E',
        e2eDesc: 'Complete end-to-end flows',
      },
      creator: {
        name: 'Levir Lemos',
        title: 'Quality Assurance Analyst & Test Automation Specialist',
        description: 'Hey there! I work as an SDET (Software Development Engineer in Test) with experience in Playwright, Cypress, Selenium and other testing tools. I created this platform to democratize test automation learning and help the QA community.',
        education: 'Education',
        educationDesc: 'Bachelor in Information Systems',
        specialty: 'Specialty',
        specialtyDesc: 'Test Automation & QA',
      },
    },
    start: {
      title: 'How to Start',
      subtitle: 'Follow these steps to begin your Playwright journey',
      step1: {
        title: 'Install Playwright',
        description: 'Run the installation command in your project',
      },
      step2: {
        title: 'Configure your environment',
        description: 'Set up browsers and necessary dependencies',
      },
      step3: {
        title: 'Run your first tests',
        description: 'Start with simple tests and gradually evolve',
      },
      startButton: 'Start Challenges',
    },
    challenges: {
      title: 'Challenges',
      subtitle: 'Practice with practical challenges',
      difficulty: {
        easy: 'Easy',
        medium: 'Medium',
        hard: 'Hard',
      },
      status: {
        pending: 'Pending',
        completed: 'Completed',
      },
      startChallenge: 'Start Challenge',
      completedChallenge: 'Challenge Completed',
      noChallenges: 'No challenges found',
      filterBy: 'Filter by',
      allLevels: 'All levels',
      challengeList: {
        '1': {
          titulo: 'Click and validate counter',
          descricao: 'Click the increment button and validate if the counter increases correctly',
          resultadoEsperado: 'The counter should increment from 0 to 1, 2, 3... with each button click'
        },
        '2': {
          titulo: 'Interact with modal',
          descricao: 'Open a modal, interact with its elements and close it',
          resultadoEsperado: 'The modal should open, allow interaction and close correctly'
        },
        '3': {
          titulo: 'Navigate between tabs',
          descricao: 'Navigate between different tabs and validate the content of each one',
          resultadoEsperado: 'Each tab should display its specific content when selected'
        },
        '4': {
          titulo: 'Expand and collapse panels',
          descricao: 'Expand and collapse the Collapse component panels',
          resultadoEsperado: 'The panels should expand and collapse correctly when clicking on headers'
        },
        '5': {
          titulo: 'Sort table by columns',
          descricao: 'Sort the table by clicking on column headers',
          resultadoEsperado: 'The table should be sorted correctly by name and age'
        },
        '15': {
          titulo: 'GET /api/ping',
          descricao: 'Make a GET request to /api/ping and validate the response',
          resultadoEsperado: 'The API should return OK status and server timestamp'
        },
        '16': {
          titulo: 'POST /api/echo with text',
          descricao: 'Send a simple text via POST to /api/echo',
          resultadoEsperado: 'The API should return the sent text along with server timestamp'
        },
        '17': {
          titulo: 'POST /api/echo with JSON',
          descricao: 'Send a JSON object via POST to /api/echo',
          resultadoEsperado: 'The API should return the sent JSON object along with server timestamp'
        }
      }
    },
    roadmap: {
      challenges: 'Challenges',
      viewChallenges: 'View Challenges',
      levels: {
        easy: 'Easy',
        medium: 'Medium',
        hard: 'Hard',
        api: 'API',
        apiScreen: 'API+Screen',
      },
      easy: {
        title: 'Easy Challenges',
        subtitle: 'Start with basic Playwright concepts',
        description: 'Ideal challenges for beginners who want to learn the fundamentals of test automation.',
      },
      medium: {
        title: 'Medium Challenges',
        subtitle: 'Evolve to more complex scenarios',
        description: 'Intermediate challenges that test more advanced automation knowledge.',
        uploadSimple: 'Simple Upload',
        uploadMultiple: 'Multiple Upload',
        validations: 'Validations',
        challengesToPractice: 'Challenges to Practice',
        csvExample: 'CSV Example for Testing',
      },
      hard: {
        title: 'Hard Challenges',
        subtitle: 'Master advanced and complex scenarios',
        description: 'Challenges for specialists who want to test advanced knowledge.',
        iframeCommunication: 'Iframe Communication',
        nestedIframes: 'Nested Iframes',
        formInIframe: 'Form in Iframe',
        postMessage: 'PostMessage',
        challengesToPractice: 'Challenges to Practice',
      },
      api: {
        title: 'API Testing',
        subtitle: 'Learn to test APIs with Playwright',
        description: 'Challenges focused on API testing and integration with interface tests.',
      },
      apiScreen: {
        title: 'API + Screen',
        subtitle: 'Integrate API tests with interface tests',
        description: 'Challenges that combine API tests with interface tests for complete scenarios.',
        apiStatus: 'API Status',
        online: 'Online',
        offline: 'Offline',
        sync: 'Sync',
        lastSync: 'Last sync',
        statistics: 'Statistics',
        total: 'Total',
        completed: 'Completed',
        pending: 'Pending',
        addTodo: 'Add TODO',
        clearCompleted: 'Clear Completed',
        challengesToPractice: 'Challenges to Practice',
      },
    },
    embeds: {
      form: {
        title: 'Interactive Form',
        subtitle: 'Practice form testing',
        description: 'Complete form to test validations, required fields and interactions.',
      },
      table: {
        title: 'Data Table',
        subtitle: 'Test table manipulation',
        description: 'Interactive table to test sorting, filters and pagination.',
      },
    },
    apiDocs: {
      title: 'API Documentation',
      subtitle: 'Complete documentation of APIs available in Test Playground',
      description: 'Complete documentation of APIs available in Test Playground. Test endpoints directly and see usage examples.',
      aboutApis: 'About the APIs',
      aboutApisDesc: 'These APIs were created for demonstration and automated testing practice. They simulate different data structures and common scenarios in real applications.',
      dataStructures: 'Data Structures',
      suggestedChallenges: 'Suggested Challenges',
      endpoints: 'Available Endpoints',
      method: 'Method',
      endpoint: 'Endpoint',
      title_: 'Title',
      tags: 'Tags',
      actions: 'Actions',
      test: 'Test',
      details: 'Details',
      examples: 'Examples',
      request: 'Request:',
      response: 'Response:',
      copy: 'Copy',
      makeCall: 'Make Call',
      callMade: 'API call made successfully!',
      callError: 'Error in API call',
      users: 'Users',
      usersDesc: 'Complex objects with profiles and skills',
      products: 'Products',
      productsDesc: 'Catalog with inventory and ratings',
      analytics: 'Analytics',
      analyticsDesc: 'Metrics and performance data',
      challenges: [
        'Test all GET endpoints',
        'Validate response structures',
        'Test filters and parameters',
        'Validate data creation via POST',
        'Test error scenarios',
        'Check HTTP status codes'
      ],
      viewApis: 'View APIs'
    },
    donation: {
      title: 'Support the Project',
      subtitle: 'Help keep this project free',
      description: 'This project is maintained free for the community. Your contribution helps maintain servers and improve the platform.',
      qrCodeTitle: 'PIX QR Code',
      pixKey: 'PIX Key',
      copyPixKey: 'Copy PIX Key',
      pixKeyCopied: 'PIX Key copied!',
      optionalSupport: 'Support is optional and helps keep the project free',
    },
    webIntro: {
      title: 'Introduction to Web Application Testing',
      subtitle: 'Learn the fundamentals of web test automation',
      description: 'This page teaches the basic concepts and most common methods for web application testing using Playwright and Cypress.',
      concepts: {
        title: 'Fundamental Concepts',
        basicConcepts: 'Basic Concepts',
        basicConceptsDesc: 'Understand what automated tests are and how they work',
        selectors: 'Selectors',
        selectorsDesc: 'Learn to locate elements on the page (CSS, XPath, data-testid)',
        assertions: 'Assertions',
        assertionsDesc: 'How to validate if elements are correct',
        interactions: 'Interactions',
        interactionsDesc: 'How to simulate user actions (click, type, etc.)',
      waiting: 'Waiting',
      waitingDesc: 'How to wait for elements to load or conditions to be met',
      details: {
        basicConcepts: {
          title: 'Basic Concepts of Automated Testing',
          explanation: 'Automated tests are scripts that simulate real user interactions with web applications. They verify if the application works correctly without manual intervention.',
          concepts: [
            'Automated tests execute actions programmatically',
            'They verify if the application responds as expected',
            'They can be executed repeatedly without failure',
            'They save time and reduce human errors',
            'They allow early detection of problems'
          ],
          tips: [
            'Start with simple tests before moving to complex scenarios',
            'Use stable selectors (data-testid) instead of CSS classes',
            'Write independent tests that don\'t depend on each other',
            'Keep tests organized and well documented',
            'Run tests regularly during development'
          ]
        },
        selectors: {
          title: 'Element Selectors',
          explanation: 'Selectors are ways to locate specific elements on a web page. They are fundamental for interacting with buttons, text fields, links and other components.',
          concepts: [
            'CSS Selectors: based on classes, IDs and HTML hierarchy',
            'XPath: powerful language for navigating XML/HTML structure',
            'data-testid: special attributes created for testing',
            'Visible text: locate elements by the text they contain',
            'Hierarchy: use parent/child for nested elements'
          ],
          tips: [
            'Prefer data-testid over CSS classes (more stable)',
            'Use specific but not fragile selectors',
            'Avoid position-based selectors (first, last)',
            'Test your selectors before using them in tests',
            'Document complex selectors to facilitate maintenance'
          ]
        },
        assertions: {
          title: 'Assertions and Validations',
          explanation: 'Assertions are checks that confirm if the application behavior is correct. They compare the current state with the expected state.',
          concepts: [
            'toBeVisible(): checks if element is visible',
            'toHaveText(): confirms if text is correct',
            'toBeEnabled(): verifies if element is enabled',
            'toHaveValue(): validates value in input fields',
            'toHaveCount(): confirms number of elements'
          ],
          tips: [
            'Use specific assertions instead of generic ones',
            'Wait for elements to load before validating',
            'Validate both positive and negative states',
            'Combine multiple assertions for complete validations',
            'Use descriptive messages in assertions'
          ]
        },
        interactions: {
          title: 'Element Interactions',
          explanation: 'Interactions simulate actions that a real user would do in the application, such as clicking, typing, selecting options and navigating between pages.',
          concepts: [
            'click(): simulates click on buttons and links',
            'type(): types text in input fields',
            'selectOption(): selects options in dropdowns',
            'hover(): simulates mouse hover over elements',
            'dragAndDrop(): drags and drops elements'
          ],
          tips: [
            'Wait for elements to be interactive before clicking',
            'Use clear() before type() in fields with existing value',
            'Simulate realistic interactions (pauses, speed)',
            'Handle dynamic elements that may appear/disappear',
            'Test interactions on different devices and screen sizes'
          ]
        },
        waiting: {
          title: 'Waiting Strategies',
          explanation: 'Waits are essential for handling elements that load dynamically. They prevent timing failures and make tests more reliable.',
          concepts: [
            'waitForSelector(): waits for element to appear',
            'waitForNavigation(): waits for navigation to complete',
            'waitForResponse(): waits for network requests',
            'waitForFunction(): waits for custom condition',
            'waitForTimeout(): fixed time wait (last resort)'
          ],
          tips: [
            'Prefer smart waits over fixed timeouts',
            'Configure appropriate timeouts for each wait type',
            'Use waitForSelector before interacting with elements',
            'Wait for network requests when necessary',
            'Avoid timeouts that are too long and make tests slow'
          ]
        }
      }
    },
      commonMethods: {
        title: 'Most Common Methods',
        clickButton: 'Click Button',
        clickButtonDesc: 'How to click buttons and validate the result',
        selectDropdown: 'Select Dropdown',
        selectDropdownDesc: 'How to select options in dropdown lists',
        fillInput: 'Fill Input',
        fillInputDesc: 'How to fill text fields',
        validateVisible: 'Validate Element Visible',
        validateVisibleDesc: 'How to check if an element is visible',
        validateText: 'Validate Text',
        validateTextDesc: 'How to verify if the text is correct',
        navigate: 'Navigate',
        navigateDesc: 'How to navigate between pages',
      },
      examples: {
        title: 'Practical Examples',
        playwright: 'Playwright',
        cypress: 'Cypress',
      },
      nextSteps: 'Next Steps',
      goToApiIntro: 'API Testing',
      backToStart: 'Back to Start',
    },
    apiIntro: {
      title: 'Introduction to API Testing',
      subtitle: 'Learn the fundamentals of REST API testing',
      description: 'This page teaches the basic concepts and most common methods for API testing using Playwright and Cypress.',
      concepts: {
        title: 'Fundamental Concepts',
        restBasics: 'REST Fundamentals',
        restBasicsDesc: 'Understand what REST is and how APIs work',
        httpMethods: 'HTTP Methods',
        httpMethodsDesc: 'GET, POST, PUT, DELETE and when to use each one',
        statusCodes: 'Status Codes',
        statusCodesDesc: 'Understand HTTP response codes (200, 404, 500, etc.)',
        headers: 'Headers',
        headersDesc: 'How to use and validate HTTP headers',
      authentication: 'Authentication',
      authenticationDesc: 'How to authenticate requests (Bearer token, API key, etc.)',
      details: {
        restBasics: {
          title: 'REST API Fundamentals',
          explanation: 'REST (Representational State Transfer) is an architectural style for developing web APIs. REST APIs use standard HTTP methods for CRUD operations on resources.',
          concepts: [
            'Resources are identified by unique URLs',
            'HTTP methods define the operation (GET, POST, PUT, DELETE)',
            'Stateless: each request is independent',
            'JSON is the most common format for data',
            'HTTP status codes indicate operation result'
          ],
          tips: [
            'Use descriptive and consistent URLs for resources',
            'Follow REST conventions for HTTP methods',
            'Return appropriate status codes',
            'Use JSON to structure response data',
            'Implement API versioning when necessary'
          ]
        },
        httpMethods: {
          title: 'HTTP Methods and When to Use',
          explanation: 'HTTP methods define the action that will be executed on a resource. Each method has a specific purpose and should be used correctly.',
          concepts: [
            'GET: retrieve data (read) - does not modify state',
            'POST: create new resources - may modify state',
            'PUT: complete resource update - replaces data',
            'PATCH: partial update - modifies only specific fields',
            'DELETE: remove resource - may modify state'
          ],
          tips: [
            'Use GET only for read operations',
            'POST is ideal for creating new resources',
            'PUT replaces the entire resource',
            'PATCH is more efficient for partial updates',
            'DELETE removes the resource permanently'
          ]
        },
        statusCodes: {
          title: 'HTTP Status Codes',
          explanation: 'HTTP status codes are 3-digit numbers that indicate the result of a request. They help understand if the operation was successful or if there was an error.',
          concepts: [
            '2xx: Success (200 OK, 201 Created, 204 No Content)',
            '3xx: Redirection (301 Moved, 304 Not Modified)',
            '4xx: Client error (400 Bad Request, 401 Unauthorized, 404 Not Found)',
            '5xx: Server error (500 Internal Server Error, 503 Service Unavailable)',
            'Specific codes indicate different types of problems'
          ],
          tips: [
            '200: operation successful',
            '201: resource created successfully',
            '400: invalid data in request',
            '401: authentication required',
            '404: resource not found',
            '500: internal server error'
          ]
        },
        headers: {
          title: 'HTTP Headers',
          explanation: 'Headers are metadata that accompany HTTP requests and responses. They provide information about content, authentication, cache and other settings.',
          concepts: [
            'Content-Type: specifies data format (application/json)',
            'Authorization: authentication credentials (Bearer token)',
            'Accept: content types accepted by client',
            'Cache-Control: cache directives',
            'Custom headers: application-specific information'
          ],
          tips: [
            'Always specify Content-Type in POST/PUT requests',
            'Use Authorization header for authentication',
            'Configure Accept to indicate expected format',
            'Implement custom headers when necessary',
            'Validate required headers in tests'
          ]
        },
        authentication: {
          title: 'API Authentication',
          explanation: 'Authentication ensures that only authorized users can access protected resources. There are several strategies for implementing authentication in APIs.',
          concepts: [
            'API Key: simple key for identification',
            'Bearer Token: access token (JWT, OAuth)',
            'Basic Auth: username and password encoded in Base64',
            'OAuth 2.0: standard for third-party authorization',
            'JWT: self-contained tokens with user information'
          ],
          tips: [
            'Use HTTPS to transmit credentials securely',
            'Implement token expiration for security',
            'Validate tokens on all protected requests',
            'Use refresh tokens for access renewal',
            'Implement rate limiting to prevent abuse'
          ]
        }
      }
    },
      commonMethods: {
        title: 'Most Common Methods',
        getRequest: 'GET Requests',
        getRequestDesc: 'How to make GET requests and validate data',
        postRequest: 'POST Requests',
        postRequestDesc: 'How to send data via POST',
        validateResponse: 'Validate Response',
        validateResponseDesc: 'How to validate the response body',
        validateStatusCode: 'Validate Status Code',
        validateStatusCodeDesc: 'How to check HTTP status codes',
        validateHeaders: 'Validate Headers',
        validateHeadersDesc: 'How to validate response headers',
        validateData: 'Validate Data',
        validateDataDesc: 'How to validate data structure and content',
      },
      examples: {
        title: 'Practical Examples',
        playwright: 'Playwright',
        cypress: 'Cypress',
      },
      nextSteps: 'Next Steps',
      goToWebIntro: 'Web Testing',
      backToStart: 'Back to Start',
    },
    components: {
      backButton: 'Back',
      contactForm: {
        title: 'Get in Touch',
        name: 'Name',
        email: 'Email',
        message: 'Message',
        send: 'Send',
        sending: 'Sending...',
        success: 'Message sent successfully!',
        error: 'Error sending message',
      },
      challengeTable: {
        challenge: 'Challenge',
        difficulty: 'Difficulty',
        status: 'Status',
        actions: 'Actions',
        noData: 'No data available',
        modal: {
          description: 'Challenge Description',
          expectedResult: 'Expected Result',
          information: 'Information',
          solution: 'Solution',
          copyCode: 'Copy Code',
          viewSolution: 'View Solution',
          confirmViewSolution: 'Are you sure you want to see the solution to this challenge? This may reduce learning.',
          confirmYes: 'Yes, show solution',
          goToChallenge: 'Go to Challenge',
          type: 'Type',
          tags: 'Tags',
          info: 'Info',
          challengeDetails: 'Challenge Details',
          solutions: 'Test Solutions',
          chooseFramework: 'Choose the framework and see the solution for the challenge',
          playwright: '🎭 Playwright',
          cypress: '🌲 Cypress',
          howToUse: '💡 How to use:',
          playwrightInstructions: '1. Copy the code above<br/>2. Paste it in a .spec.ts file<br/>3. Run with: npx playwright test',
          cypressInstructions: '1. Copy the code above<br/>2. Paste it in a .cy.ts file<br/>3. Run with: npx cypress run',
        },
      },
      xpathTester: {
        title: 'XPath Tester',
        xpath: 'XPath',
        test: 'Test',
        results: 'Results',
        noResults: 'No results found',
      },
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      close: 'Close',
      save: 'Save',
      cancel: 'Cancel',
      yes: 'Yes',
      no: 'No',
      success: 'Success',
      warning: 'Warning',
      info: 'Info',
      search: 'Search',
      filter: 'Filter',
      clear: 'Clear',
      reset: 'Reset',
      submit: 'Submit',
      edit: 'Edit',
      delete: 'Delete',
      view: 'View',
      download: 'Download',
      upload: 'Upload',
      copy: 'Copy',
      paste: 'Paste',
      cut: 'Cut',
      select: 'Select',
      selectAll: 'Select All',
      deselect: 'Deselect',
    },
  },
  'fr-FR': {
    header: {
      title: 'Test Playground',
      start: 'Commencer',
      challenges: 'Défis',
      support: 'Soutenir',
    },
    footer: {
      madeWith: 'Fait avec',
      by: 'par',
      for: 'pour la',
      community: 'communauté',
    },
    home: {
      title: 'Test Playground',
      subtitle: 'Environnement de tests pour l\'apprentissage web et API',
      description: 'Une plateforme interactive pour apprendre l\'automatisation des tests web et API à travers des défis pratiques, avec des conseils pour Playwright et Cypress.',
      startButton: 'Commencer Maintenant',
      challengesButton: 'Voir les Défis',
      freeBadge: '100% Gratuit',
      howItWorks: 'Comment ça Marche',
      howItWorksDesc: 'Apprenez à travers des scénarios pratiques de tests web et API, avec des conseils et exemples pour Playwright, Cypress et d\'autres outils',
      forWho: 'Pour Qui?',
      forWhoDesc: 'Développé pour tous les niveaux de connaissance en automatisation de tests web et API, en se concentrant sur Playwright et Cypress',
      readyToStart: 'Prêt à Commencer?',
      readyToStartDesc: 'Rejoignez des milliers de développeurs qui maîtrisent déjà les tests web et API avec Playwright, Cypress et d\'autres outils',
      aboutCreator: 'À Propos du Créateur',
      aboutCreatorDesc: 'Rencontrez qui a développé cette plateforme pour la communauté QA',
      stats: {
        challenges: 'Défis',
        tools: 'Outils',
        levels: 'Niveaux',
      },
      features: {
        playwright: 'Tests Web',
        playwrightDesc: 'Pratiquez les tests d\'interface avec des boutons, formulaires et tableaux en utilisant Playwright et Cypress.',
        cypress: 'Tests d\'API',
        cypressDesc: 'Testez les APIs REST, validations de données et scénarios d\'intégration avec des exemples pratiques.',
        e2e: 'Environnement Complet',
        e2eDesc: 'Maîtrisez les tests end-to-end, iframes et communication entre éléments avec les deux outils.',
      },
      audience: {
        qaBeginner: 'QA Débutant',
        qaBeginnerDesc: 'Apprenez les bases des tests web et API',
        automation: 'Automatisation',
        automationDesc: 'Pratiquez des scénarios de test complexes avec Playwright et Cypress',
        apiTesting: 'Tests d\'API',
        apiTestingDesc: 'Intégrez les tests d\'API avec les tests d\'interface',
        e2e: 'E2E',
        e2eDesc: 'Flux complets de bout en bout',
      },
      creator: {
        name: 'Levir Lemos',
        title: 'Analyste Assurance Qualité & Spécialiste Automatisation Tests',
        description: 'Salut ! Je travaille comme SDET (Software Development Engineer in Test) avec de l\'expérience en Playwright, Cypress, Selenium et autres outils de test. J\'ai créé cette plateforme pour démocratiser l\'apprentissage de l\'automatisation de tests et aider la communauté QA.',
        education: 'Formation',
        educationDesc: 'Licence en Systèmes d\'Information',
        specialty: 'Spécialité',
        specialtyDesc: 'Automatisation Tests & QA',
      },
    },
    start: {
      title: 'Comment Commencer',
      subtitle: 'Suivez ces étapes pour commencer votre parcours avec Playwright',
      step1: {
        title: 'Installer Playwright',
        description: 'Exécutez la commande d\'installation dans votre projet',
      },
      step2: {
        title: 'Configurez votre environnement',
        description: 'Configurez les navigateurs et dépendances nécessaires',
      },
      step3: {
        title: 'Exécutez vos premiers tests',
        description: 'Commencez avec des tests simples et évoluez progressivement',
      },
      startButton: 'Commencer les Défis',
    },
    challenges: {
      title: 'Défis',
      subtitle: 'Pratiquez avec des défis pratiques',
      difficulty: {
        easy: 'Facile',
        medium: 'Moyen',
        hard: 'Difficile',
      },
      status: {
        pending: 'En Attente',
        completed: 'Terminé',
      },
      startChallenge: 'Commencer le Défi',
      completedChallenge: 'Défi Terminé',
      noChallenges: 'Aucun défi trouvé',
      filterBy: 'Filtrer par',
      allLevels: 'Tous les niveaux',
      challengeList: {
        '1': {
          titulo: 'Cliquer et valider le compteur',
          descricao: 'Cliquez sur le bouton d\'incrémentation et validez si le compteur augmente correctement',
          resultadoEsperado: 'Le compteur devrait s\'incrémenter de 0 à 1, 2, 3... à chaque clic sur le bouton'
        },
        '2': {
          titulo: 'Interagir avec le modal',
          descricao: 'Ouvrez un modal, interagissez avec ses éléments et fermez-le',
          resultadoEsperado: 'Le modal devrait s\'ouvrir, permettre l\'interaction et se fermer correctement'
        },
        '3': {
          titulo: 'Naviguer entre les onglets',
          descricao: 'Naviguez entre les différents onglets et validez le contenu de chacun',
          resultadoEsperado: 'Chaque onglet devrait afficher son contenu spécifique lorsqu\'il est sélectionné'
        },
        '15': {
          titulo: 'GET /api/ping',
          descricao: 'Faites une requête GET vers /api/ping et validez la réponse',
          resultadoEsperado: 'L\'API devrait retourner un statut OK et le timestamp du serveur'
        },
        '16': {
          titulo: 'POST /api/echo avec texte',
          descricao: 'Envoyez un texte simple via POST vers /api/echo',
          resultadoEsperado: 'L\'API devrait retourner le texte envoyé avec le timestamp du serveur'
        }
      }
    },
    roadmap: {
      challenges: 'Défis',
      viewChallenges: 'Voir les Défis',
      levels: {
        easy: 'Facile',
        medium: 'Moyen',
        hard: 'Difficile',
        api: 'API',
        apiScreen: 'API+Écran',
      },
      easy: {
        title: 'Défis Faciles',
        subtitle: 'Commencez avec les concepts de base de Playwright',
        description: 'Défis idéaux pour les débutants qui veulent apprendre les fondamentaux de l\'automatisation de tests.',
      },
      medium: {
        title: 'Défis Moyens',
        subtitle: 'Évoluez vers des scénarios plus complexes',
        description: 'Défis intermédiaires qui testent des connaissances d\'automatisation plus avancées.',
        uploadSimple: 'Upload Simple',
        uploadMultiple: 'Upload Multiple',
        validations: 'Validations',
        challengesToPractice: 'Défis à Pratiquer',
        csvExample: 'Exemple CSV pour Test',
      },
      hard: {
        title: 'Défis Difficiles',
        subtitle: 'Maîtrisez des scénarios avancés et complexes',
        description: 'Défis pour les spécialistes qui veulent tester des connaissances avancées.',
        iframeCommunication: 'Communication avec Iframe',
        nestedIframes: 'Iframes Imbriqués',
        formInIframe: 'Formulaire en Iframe',
        postMessage: 'PostMessage',
        challengesToPractice: 'Défis à Pratiquer',
      },
      api: {
        title: 'Tests d\'API',
        subtitle: 'Apprenez à tester les APIs avec Playwright',
        description: 'Défis axés sur les tests d\'API et l\'intégration avec les tests d\'interface.',
      },
      apiScreen: {
        title: 'API + Écran',
        subtitle: 'Intégrez les tests d\'API avec les tests d\'interface',
        description: 'Défis qui combinent les tests d\'API avec les tests d\'interface pour des scénarios complets.',
        apiStatus: 'Statut API',
        online: 'En ligne',
        offline: 'Hors ligne',
        sync: 'Synchroniser',
        lastSync: 'Dernière sync',
        statistics: 'Statistiques',
        total: 'Total',
        completed: 'Terminés',
        pending: 'En attente',
        addTodo: 'Ajouter TODO',
        clearCompleted: 'Effacer Terminés',
        challengesToPractice: 'Défis à Pratiquer',
      },
    },
    embeds: {
      form: {
        title: 'Formulaire Interactif',
        subtitle: 'Pratiquez les tests de formulaires',
        description: 'Formulaire complet pour tester les validations, champs obligatoires et interactions.',
      },
      table: {
        title: 'Tableau de Données',
        subtitle: 'Testez la manipulation de tableaux',
        description: 'Tableau interactif pour tester le tri, les filtres et la pagination.',
      },
    },
    apiDocs: {
      title: 'Documentation API',
      subtitle: 'Documentation complète des APIs disponibles dans Test Playground',
      description: 'Documentation complète des APIs disponibles dans Test Playground. Testez les endpoints directement et voyez des exemples d\'utilisation.',
      aboutApis: 'À propos des APIs',
      aboutApisDesc: 'Ces APIs ont été créées pour la démonstration et la pratique des tests automatisés. Elles simulent différentes structures de données et scénarios courants dans les applications réelles.',
      dataStructures: 'Structures de Données',
      suggestedChallenges: 'Défis Suggérés',
      endpoints: 'Endpoints Disponibles',
      method: 'Méthode',
      endpoint: 'Endpoint',
      title_: 'Titre',
      tags: 'Étiquettes',
      actions: 'Actions',
      test: 'Tester',
      details: 'Détails',
      examples: 'Exemples',
      request: 'Requête:',
      response: 'Réponse:',
      copy: 'Copier',
      makeCall: 'Faire Appel',
      callMade: 'Appel API effectué avec succès!',
      callError: 'Erreur dans l\'appel API',
      users: 'Utilisateurs',
      usersDesc: 'Objets complexes avec profils et compétences',
      products: 'Produits',
      productsDesc: 'Catalogue avec inventaire et évaluations',
      analytics: 'Analytics',
      analyticsDesc: 'Métriques et données de performance',
      challenges: [
        'Tester tous les endpoints GET',
        'Valider les structures de réponse',
        'Tester les filtres et paramètres',
        'Valider la création de données via POST',
        'Tester les scénarios d\'erreur',
        'Vérifier les codes de statut HTTP'
      ],
      viewApis: 'Voir APIs'
    },
    donation: {
      title: 'Soutenir le Projet',
      subtitle: 'Aidez à maintenir ce projet gratuit',
      description: 'Ce projet est maintenu gratuitement pour la communauté. Votre contribution aide à maintenir les serveurs et améliorer la plateforme.',
      qrCodeTitle: 'QR Code PIX',
      pixKey: 'Clé PIX',
      copyPixKey: 'Copier la Clé PIX',
      pixKeyCopied: 'Clé PIX copiée!',
      optionalSupport: 'Le soutien est optionnel et aide à maintenir le projet gratuit',
    },
    webIntro: {
      title: 'Introduction aux Tests d\'Applications Web',
      subtitle: 'Apprenez les concepts fondamentaux de l\'automatisation des tests web',
      description: 'Cette page enseigne les concepts de base et les méthodes les plus courantes pour les tests d\'applications web en utilisant Playwright et Cypress.',
      concepts: {
        title: 'Concepts Fondamentaux',
        basicConcepts: 'Concepts de Base',
        basicConceptsDesc: 'Comprenez ce que sont les tests automatisés et comment ils fonctionnent',
        selectors: 'Sélecteurs',
        selectorsDesc: 'Apprenez à localiser les éléments sur la page (CSS, XPath, data-testid)',
        assertions: 'Assertions',
        assertionsDesc: 'Comment valider si les éléments sont corrects',
        interactions: 'Interactions',
        interactionsDesc: 'Comment simuler les actions utilisateur (clic, saisie, etc.)',
      waiting: 'Attente',
      waitingDesc: 'Comment attendre que les éléments se chargent ou que les conditions soient remplies',
      details: {
        basicConcepts: {
          title: 'Concepts de Base des Tests Automatisés',
          explanation: 'Les tests automatisés sont des scripts qui simulent les interactions d\'utilisateurs réels avec les applications web. Ils vérifient si l\'application fonctionne correctement sans intervention manuelle.',
          concepts: [
            'Les tests automatisés exécutent des actions par programmation',
            'Ils vérifient si l\'application répond comme attendu',
            'Ils peuvent être exécutés de manière répétée sans échec',
            'Ils économisent du temps et réduisent les erreurs humaines',
            'Ils permettent la détection précoce de problèmes'
          ],
          tips: [
            'Commencez par des tests simples avant de passer aux scénarios complexes',
            'Utilisez des sélecteurs stables (data-testid) au lieu des classes CSS',
            'Écrivez des tests indépendants qui ne dépendent pas les uns des autres',
            'Gardez les tests organisés et bien documentés',
            'Exécutez les tests régulièrement pendant le développement'
          ]
        },
        selectors: {
          title: 'Sélecteurs d\'Éléments',
          explanation: 'Les sélecteurs sont des moyens de localiser des éléments spécifiques sur une page web. Ils sont fondamentaux pour interagir avec des boutons, des champs de texte, des liens et d\'autres composants.',
          concepts: [
            'Sélecteurs CSS : basés sur les classes, IDs et hiérarchie HTML',
            'XPath : langage puissant pour naviguer dans la structure XML/HTML',
            'data-testid : attributs spéciaux créés pour les tests',
            'Texte visible : localiser les éléments par le texte qu\'ils contiennent',
            'Hiérarchie : utiliser parent/enfant pour les éléments imbriqués'
          ],
          tips: [
            'Préférez data-testid aux classes CSS (plus stable)',
            'Utilisez des sélecteurs spécifiques mais pas fragiles',
            'Évitez les sélecteurs basés sur la position (premier, dernier)',
            'Testez vos sélecteurs avant de les utiliser dans les tests',
            'Documentez les sélecteurs complexes pour faciliter la maintenance'
          ]
        },
        assertions: {
          title: 'Assertions et Validations',
          explanation: 'Les assertions sont des vérifications qui confirment si le comportement de l\'application est correct. Elles comparent l\'état actuel avec l\'état attendu.',
          concepts: [
            'toBeVisible() : vérifie si l\'élément est visible',
            'toHaveText() : confirme si le texte est correct',
            'toBeEnabled() : vérifie si l\'élément est activé',
            'toHaveValue() : valide la valeur dans les champs de saisie',
            'toHaveCount() : confirme le nombre d\'éléments'
          ],
          tips: [
            'Utilisez des assertions spécifiques au lieu de génériques',
            'Attendez que les éléments se chargent avant de valider',
            'Validez à la fois les états positifs et négatifs',
            'Combine multiple assertions pour des validations complètes',
            'Utilisez des messages descriptifs dans les assertions'
          ]
        },
        interactions: {
          title: 'Interactions avec les Éléments',
          explanation: 'Les interactions simulent des actions qu\'un utilisateur réel ferait dans l\'application, comme cliquer, taper, sélectionner des options et naviguer entre les pages.',
          concepts: [
            'click() : simule un clic sur des boutons et liens',
            'type() : tape du texte dans les champs de saisie',
            'selectOption() : sélectionne des options dans les listes déroulantes',
            'hover() : simule le survol de la souris sur les éléments',
            'dragAndDrop() : fait glisser et déposer des éléments'
          ],
          tips: [
            'Attendez que les éléments soient interactifs avant de cliquer',
            'Utilisez clear() avant type() dans les champs avec une valeur existante',
            'Simulez des interactions réalistes (pauses, vitesse)',
            'Traitez les éléments dynamiques qui peuvent apparaître/disparaître',
            'Testez les interactions sur différents appareils et tailles d\'écran'
          ]
        },
        waiting: {
          title: 'Stratégies d\'Attente',
          explanation: 'Les attentes sont essentielles pour gérer les éléments qui se chargent dynamiquement. Elles évitent les échecs de timing et rendent les tests plus fiables.',
          concepts: [
            'waitForSelector() : attend que l\'élément apparaisse',
            'waitForNavigation() : attend que la navigation se termine',
            'waitForResponse() : attend les requêtes réseau',
            'waitForFunction() : attend une condition personnalisée',
            'waitForTimeout() : attente de temps fixe (dernier recours)'
          ],
          tips: [
            'Préférez les attentes intelligentes aux timeouts fixes',
            'Configurez des timeouts appropriés pour chaque type d\'attente',
            'Utilisez waitForSelector avant d\'interagir avec les éléments',
            'Attendez les requêtes réseau quand nécessaire',
            'Évitez les timeouts trop longs qui rendent les tests lents'
          ]
        }
      }
    },
      commonMethods: {
        title: 'Méthodes les Plus Courantes',
        clickButton: 'Cliquer sur un Bouton',
        clickButtonDesc: 'Comment cliquer sur des boutons et valider le résultat',
        selectDropdown: 'Sélectionner Dropdown',
        selectDropdownDesc: 'Comment sélectionner des options dans les listes déroulantes',
        fillInput: 'Remplir Input',
        fillInputDesc: 'Comment remplir les champs de texte',
        validateVisible: 'Valider Élément Visible',
        validateVisibleDesc: 'Comment vérifier si un élément est visible',
        validateText: 'Valider Texte',
        validateTextDesc: 'Comment vérifier si le texte est correct',
        navigate: 'Naviguer',
        navigateDesc: 'Comment naviguer entre les pages',
      },
      examples: {
        title: 'Exemples Pratiques',
        playwright: 'Playwright',
        cypress: 'Cypress',
      },
      nextSteps: 'Prochaines Étapes',
      goToApiIntro: 'Tests d\'API',
      backToStart: 'Retour au Début',
    },
    apiIntro: {
      title: 'Introduction aux Tests d\'API',
      subtitle: 'Apprenez les concepts fondamentaux des tests d\'API REST',
      description: 'Cette page enseigne les concepts de base et les méthodes les plus courantes pour les tests d\'API en utilisant Playwright et Cypress.',
      concepts: {
        title: 'Concepts Fondamentaux',
        restBasics: 'Fondamentaux REST',
        restBasicsDesc: 'Comprenez ce qu\'est REST et comment fonctionnent les APIs',
        httpMethods: 'Méthodes HTTP',
        httpMethodsDesc: 'GET, POST, PUT, DELETE et quand utiliser chacune',
        statusCodes: 'Codes de Statut',
        statusCodesDesc: 'Comprenez les codes de réponse HTTP (200, 404, 500, etc.)',
        headers: 'Headers',
        headersDesc: 'Comment utiliser et valider les headers HTTP',
      authentication: 'Authentification',
      authenticationDesc: 'Comment authentifier les requêtes (Bearer token, API key, etc.)',
      details: {
        restBasics: {
          title: 'Fondamentaux des APIs REST',
          explanation: 'REST (Representational State Transfer) est un style architectural pour le développement d\'APIs web. Les APIs REST utilisent des méthodes HTTP standard pour les opérations CRUD sur les ressources.',
          concepts: [
            'Les ressources sont identifiées par des URLs uniques',
            'Les méthodes HTTP définissent l\'opération (GET, POST, PUT, DELETE)',
            'Stateless : chaque requête est indépendante',
            'JSON est le format le plus courant pour les données',
            'Les codes de statut HTTP indiquent le résultat de l\'opération'
          ],
          tips: [
            'Utilisez des URLs descriptives et cohérentes pour les ressources',
            'Suivez les conventions REST pour les méthodes HTTP',
            'Retournez des codes de statut appropriés',
            'Utilisez JSON pour structurer les données de réponse',
            'Implémentez le versioning de l\'API quand nécessaire'
          ]
        },
        httpMethods: {
          title: 'Méthodes HTTP et Quand les Utiliser',
          explanation: 'Les méthodes HTTP définissent l\'action qui sera exécutée sur une ressource. Chaque méthode a un objectif spécifique et doit être utilisée correctement.',
          concepts: [
            'GET : récupérer des données (lire) - ne modifie pas l\'état',
            'POST : créer de nouvelles ressources - peut modifier l\'état',
            'PUT : mise à jour complète de ressource - remplace les données',
            'PATCH : mise à jour partielle - modifie seulement des champs spécifiques',
            'DELETE : supprimer ressource - peut modifier l\'état'
          ],
          tips: [
            'Utilisez GET seulement pour les opérations de lecture',
            'POST est idéal pour créer de nouvelles ressources',
            'PUT remplace la ressource entière',
            'PATCH est plus efficace pour les mises à jour partielles',
            'DELETE supprime la ressource définitivement'
          ]
        },
        statusCodes: {
          title: 'Codes de Statut HTTP',
          explanation: 'Les codes de statut HTTP sont des nombres à 3 chiffres qui indiquent le résultat d\'une requête. Ils aident à comprendre si l\'opération a réussi ou s\'il y a eu une erreur.',
          concepts: [
            '2xx : Succès (200 OK, 201 Created, 204 No Content)',
            '3xx : Redirection (301 Moved, 304 Not Modified)',
            '4xx : Erreur client (400 Bad Request, 401 Unauthorized, 404 Not Found)',
            '5xx : Erreur serveur (500 Internal Server Error, 503 Service Unavailable)',
            'Les codes spécifiques indiquent différents types de problèmes'
          ],
          tips: [
            '200 : opération réussie',
            '201 : ressource créée avec succès',
            '400 : données invalides dans la requête',
            '401 : authentification nécessaire',
            '404 : ressource non trouvée',
            '500 : erreur interne du serveur'
          ]
        },
        headers: {
          title: 'Headers HTTP',
          explanation: 'Les headers sont des métadonnées qui accompagnent les requêtes et réponses HTTP. Ils fournissent des informations sur le contenu, l\'authentification, le cache et autres paramètres.',
          concepts: [
            'Content-Type : spécifie le format des données (application/json)',
            'Authorization : credentials d\'authentification (Bearer token)',
            'Accept : types de contenu acceptés par le client',
            'Cache-Control : directives de cache',
            'Headers personnalisés : informations spécifiques à l\'application'
          ],
          tips: [
            'Spécifiez toujours Content-Type dans les requêtes POST/PUT',
            'Utilisez le header Authorization pour l\'authentification',
            'Configurez Accept pour indiquer le format attendu',
            'Implémentez des headers personnalisés quand nécessaire',
            'Validez les headers obligatoires dans les tests'
          ]
        },
        authentication: {
          title: 'Authentification des APIs',
          explanation: 'L\'authentification garantit que seuls les utilisateurs autorisés peuvent accéder aux ressources protégées. Il existe plusieurs stratégies pour implémenter l\'authentification dans les APIs.',
          concepts: [
            'API Key : clé simple pour l\'identification',
            'Bearer Token : token d\'accès (JWT, OAuth)',
            'Basic Auth : nom d\'utilisateur et mot de passe encodés en Base64',
            'OAuth 2.0 : standard pour l\'autorisation de tiers',
            'JWT : tokens auto-contenus avec informations utilisateur'
          ],
          tips: [
            'Utilisez HTTPS pour transmettre les credentials en sécurité',
            'Implémentez l\'expiration des tokens pour la sécurité',
            'Validez les tokens sur toutes les requêtes protégées',
            'Utilisez des refresh tokens pour le renouvellement d\'accès',
            'Implémentez le rate limiting pour prévenir les abus'
          ]
        }
      }
    },
      commonMethods: {
        title: 'Méthodes les Plus Courantes',
        getRequest: 'Requêtes GET',
        getRequestDesc: 'Comment faire des requêtes GET et valider les données',
        postRequest: 'Requêtes POST',
        postRequestDesc: 'Comment envoyer des données via POST',
        validateResponse: 'Valider Réponse',
        validateResponseDesc: 'Comment valider le corps de la réponse',
        validateStatusCode: 'Valider Code de Statut',
        validateStatusCodeDesc: 'Comment vérifier les codes de statut HTTP',
        validateHeaders: 'Valider Headers',
        validateHeadersDesc: 'Comment valider les headers de réponse',
        validateData: 'Valider Données',
        validateDataDesc: 'Comment valider la structure et le contenu des données',
      },
      examples: {
        title: 'Exemples Pratiques',
        playwright: 'Playwright',
        cypress: 'Cypress',
      },
      nextSteps: 'Prochaines Étapes',
      goToWebIntro: 'Tests Web',
      backToStart: 'Retour au Début',
    },
    components: {
      backButton: 'Retour',
      contactForm: {
        title: 'Entrer en Contact',
        name: 'Nom',
        email: 'Email',
        message: 'Message',
        send: 'Envoyer',
        sending: 'Envoi en cours...',
        success: 'Message envoyé avec succès!',
        error: 'Erreur lors de l\'envoi du message',
      },
      challengeTable: {
        challenge: 'Défi',
        difficulty: 'Difficulté',
        status: 'Statut',
        actions: 'Actions',
        noData: 'Aucune donnée disponible',
        modal: {
          description: 'Description du Défi',
          expectedResult: 'Résultat Attendu',
          information: 'Informations',
          solution: 'Solution',
          copyCode: 'Copier le Code',
          viewSolution: 'Voir Solution',
          confirmViewSolution: 'Êtes-vous sûr de vouloir voir la solution de ce défi? Cela peut réduire l\'apprentissage.',
          confirmYes: 'Oui, montrer solution',
          goToChallenge: 'Aller au Défi',
          type: 'Type',
          tags: 'Étiquettes',
          info: 'Info',
          challengeDetails: 'Détails du Défi',
          solutions: 'Solutions de Test',
          chooseFramework: 'Choisissez le framework et voyez la solution pour le défi',
          playwright: '🎭 Playwright',
          cypress: '🌲 Cypress',
          howToUse: '💡 Comment utiliser:',
          playwrightInstructions: '1. Copiez le code ci-dessus<br/>2. Collez-le dans un fichier .spec.ts<br/>3. Exécutez avec: npx playwright test',
          cypressInstructions: '1. Copiez le code ci-dessus<br/>2. Collez-le dans un fichier .cy.ts<br/>3. Exécutez avec: npx cypress run',
        },
      },
      xpathTester: {
        title: 'Testeur XPath',
        xpath: 'XPath',
        test: 'Tester',
        results: 'Résultats',
        noResults: 'Aucun résultat trouvé',
      },
    },
    common: {
      loading: 'Chargement...',
      error: 'Erreur',
      back: 'Retour',
      next: 'Suivant',
      previous: 'Précédent',
      close: 'Fermer',
      save: 'Sauvegarder',
      cancel: 'Annuler',
      yes: 'Oui',
      no: 'Non',
      success: 'Succès',
      warning: 'Avertissement',
      info: 'Information',
      search: 'Rechercher',
      filter: 'Filtrer',
      clear: 'Effacer',
      reset: 'Réinitialiser',
      submit: 'Soumettre',
      edit: 'Modifier',
      delete: 'Supprimer',
      view: 'Voir',
      download: 'Télécharger',
      upload: 'Téléverser',
      copy: 'Copier',
      paste: 'Coller',
      cut: 'Couper',
      select: 'Sélectionner',
      selectAll: 'Tout Sélectionner',
      deselect: 'Désélectionner',
    },
  },
};

export function getTranslations(locale: string): Translations {
  return translations[locale] || translations['pt-BR'];
}