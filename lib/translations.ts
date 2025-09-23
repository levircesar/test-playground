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
      subtitle: 'Pratique Playwright com desafios práticos',
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
        description: 'Desafios ideais para iniciantes que querem aprender os fundamentos da automação de testes.',
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
      subtitle: 'Practice Playwright with practical challenges',
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
      subtitle: 'Pratiquez Playwright avec des défis pratiques',
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