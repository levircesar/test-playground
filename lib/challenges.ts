import challengesData from '@/data/challenges.json';

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

export function getChallenges(): Challenge[] {
  return challengesData as Challenge[];
}

export function getChallengeById(id: number): Challenge | undefined {
  return challengesData.find(challenge => challenge.id === id) as Challenge | undefined;
}
