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
  };
  
  // Roadmap pages
  roadmap: {
    challenges: string;
    viewChallenges: string;
    easy: {
      title: string;
      subtitle: string;
      description: string;
    };
    medium: {
      title: string;
      subtitle: string;
      description: string;
    };
    hard: {
      title: string;
      subtitle: string;
      description: string;
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
      title: 'Playground',
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
      title: 'Playwright Playground',
      subtitle: 'Aprenda Playwright de forma prática e divertida',
      description: 'Uma plataforma interativa para aprender automação de testes web com Playwright através de desafios práticos e exemplos reais.',
      startButton: 'Começar Agora',
      challengesButton: 'Ver Desafios',
      freeBadge: '100% Gratuito',
      howItWorks: 'Como Funciona',
      howItWorksDesc: 'Aprenda através de cenários práticos com Playwright, Cypress e outras ferramentas de automação',
      forWho: 'Para Quem É?',
      forWhoDesc: 'Desenvolvido para todos os níveis de conhecimento em automação de testes com Playwright, Cypress e mais',
      readyToStart: 'Pronto para Começar?',
      readyToStartDesc: 'Junte-se a milhares de desenvolvedores que já dominam automação de testes com Playwright, Cypress e outras ferramentas',
      aboutCreator: 'Sobre o Criador',
      aboutCreatorDesc: 'Conheça quem desenvolveu esta plataforma para a comunidade de QA',
      stats: {
        challenges: 'Desafios',
        tools: 'Ferramentas',
        levels: 'Níveis',
      },
      features: {
        playwright: 'Playwright',
        playwrightDesc: 'Pratique com botões, formulários, tabelas usando a ferramenta mais moderna para automação de testes.',
        cypress: 'Cypress',
        cypressDesc: 'Teste uploads, validações de arquivo e cenários complexos com a ferramenta mais popular do mercado.',
        e2e: 'E2E & APIs',
        e2eDesc: 'Domine iframes, comunicação entre elementos e testes de API completos com ambas as ferramentas.',
      },
      audience: {
        qaBeginner: 'QA Iniciante',
        qaBeginnerDesc: 'Aprenda os conceitos básicos de automação',
        automation: 'Automação',
        automationDesc: 'Pratique cenários complexos de teste',
        apiTesting: 'Testes de API',
        apiTestingDesc: 'Integre testes de API com interface',
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
    },
    roadmap: {
      challenges: 'Desafios',
      viewChallenges: 'Ver Desafios',
      easy: {
        title: 'Desafios Fáceis',
        subtitle: 'Comece com conceitos básicos de Playwright',
        description: 'Desafios ideais para iniciantes que querem aprender os fundamentos da automação de testes.',
      },
      medium: {
        title: 'Desafios Médios',
        subtitle: 'Evolua para cenários mais complexos',
        description: 'Desafios intermediários que testam conhecimentos mais avançados de automação.',
      },
      hard: {
        title: 'Desafios Difíceis',
        subtitle: 'Domine cenários avançados e complexos',
        description: 'Desafios para especialistas que querem testar conhecimentos avançados.',
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
      title: 'Playground',
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
      title: 'Playwright Playground',
      subtitle: 'Learn Playwright in a practical and fun way',
      description: 'An interactive platform to learn web test automation with Playwright through practical challenges and real examples.',
      startButton: 'Start Now',
      challengesButton: 'View Challenges',
      freeBadge: '100% Free',
      howItWorks: 'How It Works',
      howItWorksDesc: 'Learn through practical scenarios with Playwright, Cypress and other automation tools',
      forWho: 'Who Is It For?',
      forWhoDesc: 'Developed for all levels of knowledge in test automation with Playwright, Cypress and more',
      readyToStart: 'Ready to Start?',
      readyToStartDesc: 'Join thousands of developers who already master test automation with Playwright, Cypress and other tools',
      aboutCreator: 'About the Creator',
      aboutCreatorDesc: 'Meet who developed this platform for the QA community',
      stats: {
        challenges: 'Challenges',
        tools: 'Tools',
        levels: 'Levels',
      },
      features: {
        playwright: 'Playwright',
        playwrightDesc: 'Practice with buttons, forms, tables using the most modern tool for test automation.',
        cypress: 'Cypress',
        cypressDesc: 'Test uploads, file validations and complex scenarios with the most popular tool in the market.',
        e2e: 'E2E & APIs',
        e2eDesc: 'Master iframes, communication between elements and complete API tests with both tools.',
      },
      audience: {
        qaBeginner: 'QA Beginner',
        qaBeginnerDesc: 'Learn the basics of automation',
        automation: 'Automation',
        automationDesc: 'Practice complex test scenarios',
        apiTesting: 'API Testing',
        apiTestingDesc: 'Integrate API tests with interface',
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
    },
    roadmap: {
      challenges: 'Challenges',
      viewChallenges: 'View Challenges',
      easy: {
        title: 'Easy Challenges',
        subtitle: 'Start with basic Playwright concepts',
        description: 'Ideal challenges for beginners who want to learn the fundamentals of test automation.',
      },
      medium: {
        title: 'Medium Challenges',
        subtitle: 'Evolve to more complex scenarios',
        description: 'Intermediate challenges that test more advanced automation knowledge.',
      },
      hard: {
        title: 'Hard Challenges',
        subtitle: 'Master advanced and complex scenarios',
        description: 'Challenges for specialists who want to test advanced knowledge.',
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
      title: 'Playground',
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
      title: 'Playwright Playground',
      subtitle: 'Apprenez Playwright de manière pratique et amusante',
      description: 'Une plateforme interactive pour apprendre l\'automatisation des tests web avec Playwright à travers des défis pratiques et des exemples réels.',
      startButton: 'Commencer Maintenant',
      challengesButton: 'Voir les Défis',
      freeBadge: '100% Gratuit',
      howItWorks: 'Comment ça Marche',
      howItWorksDesc: 'Apprenez à travers des scénarios pratiques avec Playwright, Cypress et d\'autres outils d\'automatisation',
      forWho: 'Pour Qui?',
      forWhoDesc: 'Développé pour tous les niveaux de connaissance en automatisation de tests avec Playwright, Cypress et plus',
      readyToStart: 'Prêt à Commencer?',
      readyToStartDesc: 'Rejoignez des milliers de développeurs qui maîtrisent déjà l\'automatisation de tests avec Playwright, Cypress et d\'autres outils',
      aboutCreator: 'À Propos du Créateur',
      aboutCreatorDesc: 'Rencontrez qui a développé cette plateforme pour la communauté QA',
      stats: {
        challenges: 'Défis',
        tools: 'Outils',
        levels: 'Niveaux',
      },
      features: {
        playwright: 'Playwright',
        playwrightDesc: 'Pratiquez avec des boutons, formulaires, tableaux en utilisant l\'outil le plus moderne pour l\'automatisation de tests.',
        cypress: 'Cypress',
        cypressDesc: 'Testez les téléchargements, validations de fichiers et scénarios complexes avec l\'outil le plus populaire du marché.',
        e2e: 'E2E & APIs',
        e2eDesc: 'Maîtrisez les iframes, la communication entre éléments et les tests d\'API complets avec les deux outils.',
      },
      audience: {
        qaBeginner: 'QA Débutant',
        qaBeginnerDesc: 'Apprenez les bases de l\'automatisation',
        automation: 'Automatisation',
        automationDesc: 'Pratiquez des scénarios de test complexes',
        apiTesting: 'Tests d\'API',
        apiTestingDesc: 'Intégrez les tests d\'API avec l\'interface',
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
    },
    roadmap: {
      challenges: 'Défis',
      viewChallenges: 'Voir les Défis',
      easy: {
        title: 'Défis Faciles',
        subtitle: 'Commencez avec les concepts de base de Playwright',
        description: 'Défis idéaux pour les débutants qui veulent apprendre les fondamentaux de l\'automatisation de tests.',
      },
      medium: {
        title: 'Défis Moyens',
        subtitle: 'Évoluez vers des scénarios plus complexes',
        description: 'Défis intermédiaires qui testent des connaissances d\'automatisation plus avancées.',
      },
      hard: {
        title: 'Défis Difficiles',
        subtitle: 'Maîtrisez des scénarios avancés et complexes',
        description: 'Défis pour les spécialistes qui veulent tester des connaissances avancées.',
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