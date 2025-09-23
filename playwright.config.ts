import { defineConfig, devices } from 'playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000, // Reduzido de 30s para 15s
  expect: {
    timeout: 30_000, // Reduzido de 30s para 5s
  },
  retries: 0,
  workers: 1,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    testIdAttribute: 'data-testid',
    locale: 'pt-BR',
    // Timeouts otimizados para inicialização mais rápida
    actionTimeout: 15_000, // Reduzido de 10s para 5s
    navigationTimeout: 15_000, // Reduzido de 30s para 15s
    // Configurações para inicialização mais rápida
    launchOptions: {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding',
        '--disable-extensions',
        '--disable-plugins',
        '--disable-images', // Desabilita carregamento de imagens para testes mais rápidos
        '--disable-javascript-harmony-shipping',
        '--disable-background-networking',
        '--disable-sync',
        '--metrics-recording-only',
        '--no-first-run',
        '--safebrowsing-disable-auto-update',
        '--enable-automation',
        '--password-store=basic',
        '--use-mock-keychain'
      ]
    }
  },
  projects: [
    // Chromium é geralmente mais rápido que Firefox
    { 
      name: 'chromium', 
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        // Modo headless para máxima velocidade
        headless: true,
        // Desabilitar recursos desnecessários
        ignoreHTTPSErrors: true,
        bypassCSP: true
      } 
    },
    // Firefox como alternativa (comentado para usar apenas Chromium por enquanto)
    // { name: 'firefox',  use: { ...devices['Desktop Firefox'] ,viewport: { width: 1280, height: 720 } } }, 
  ],
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    // Timeout reduzido para inicialização do servidor
    timeout: 10_000
  }
});
