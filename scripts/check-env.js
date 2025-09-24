const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuração do Firebase...\n');

const envPath = path.join(process.cwd(), '.env.local');

if (!fs.existsSync(envPath)) {
  console.error('❌ Arquivo .env.local não encontrado!');
  console.log('📝 Crie o arquivo .env.local na raiz do projeto com o seguinte conteúdo:\n');
  console.log(`NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id`);
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

const requiredVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID'
];

let allConfigured = true;

console.log('📋 Status das variáveis de ambiente:\n');

requiredVars.forEach(varName => {
  const value = envVars[varName];
  if (!value || value === 'your_api_key_here' || value === 'your_project_id' || value === 'your_sender_id' || value === 'your_app_id') {
    console.log(`❌ ${varName}: ${value || 'NÃO DEFINIDA'}`);
    allConfigured = false;
  } else {
    console.log(`✅ ${varName}: ${value.substring(0, 20)}...`);
  }
});

if (allConfigured) {
  console.log('\n🎉 Todas as variáveis estão configuradas!');
  console.log('🚀 Você pode executar o projeto com: npm run dev');
} else {
  console.log('\n⚠️  Algumas variáveis precisam ser configuradas.');
  console.log('📖 Consulte o arquivo ADMIN_SETUP.md para instruções detalhadas.');
  process.exit(1);
}
