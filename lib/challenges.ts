import challengesData from '@/data/challenges.json';
import { getTranslations } from './translations';

export interface Challenge {
  id: number;
  titulo: string;
  nivel: string;
  tipo: string;
  tags: string[];
  rota: string;
  descricao: string;
  resultadoEsperado: string;
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

export function getChallengeById(id: number, locale: string = 'pt-BR'): Challenge | undefined {
  const challenges = getChallenges(locale);
  return challenges.find(challenge => challenge.id === id);
}
