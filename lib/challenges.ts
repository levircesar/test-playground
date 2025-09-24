import challengesData from '@/data/challenges.json';
import { getTranslations } from './translations';

export interface Challenge {
  id: number | string;
  titulo: string;
  nivel: string;
  tipo: string;
  tags: string[];
  rota: string;
  descricao: string;
  resultadoEsperado: string;
  solucaoPlaywright?: string;
  solucaoCypress?: string;
  traducoes?: {
    'pt-BR': {
      titulo: string;
      descricao: string;
      resultadoEsperado: string;
    };
    'en-US': {
      titulo: string;
      descricao: string;
      resultadoEsperado: string;
    };
    'fr-FR': {
      titulo: string;
      descricao: string;
      resultadoEsperado: string;
    };
  };
}

export function getChallenges(locale: string = 'pt-BR'): Challenge[] {
  const t = getTranslations(locale);
  
  return challengesData.map((challenge: any) => {
    const challengeKey = challenge.id.toString();
    const translatedChallenge = t.challenges.challengeList?.[challengeKey];
    
    if (translatedChallenge) {
      return {
        ...challenge,
        titulo: translatedChallenge.titulo,
        descricao: translatedChallenge.descricao,
        resultadoEsperado: translatedChallenge.resultadoEsperado
      };
    }
    
    // Fallback para o original se não houver tradução
    return challenge;
  });
}

export function getChallengeById(id: number | string, locale: string = 'pt-BR'): Challenge | undefined {
  const challenges = getChallenges(locale);
  return challenges.find(challenge => challenge.id === id);
}

// Função para aplicar traduções de desafios vindos do Firebase
export function applyTranslationsToChallenge(challenge: any, locale: string = 'pt-BR'): Challenge {
  if (challenge.traducoes && challenge.traducoes[locale]) {
    const translation = challenge.traducoes[locale];
    return {
      ...challenge,
      titulo: translation.titulo || challenge.titulo,
      descricao: translation.descricao || challenge.descricao,
      resultadoEsperado: translation.resultadoEsperado || challenge.resultadoEsperado
    };
  }
  
  return challenge;
}
