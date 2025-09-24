import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, doc, getDoc } from 'firebase/firestore';
import { firestore } from '@/config/firebase';

export interface Challenge {
  id: string;
  titulo: string;
  nivel: string;
  tipo: string;
  tags: string[];
  rota: string;
  descricao: string;
  resultadoEsperado: string;
  solucaoPlaywright: string;
  solucaoCypress: string;
  traducoes: {
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

export function useChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadChallenges = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Carregando desafios do Firebase...');
      const challengesRef = collection(firestore, 'playground', 'challenges', 'data');
      // Removendo ordenação temporariamente para debug
      const querySnapshot = await getDocs(challengesRef);
      
      console.log('📊 Documentos encontrados:', querySnapshot.size);
      
      const challengesData: Challenge[] = [];
      querySnapshot.forEach((doc) => {
        console.log('📄 Documento:', doc.id, doc.data());
        challengesData.push({ id: doc.id, ...doc.data() } as Challenge);
      });
      
      console.log('✅ Desafios carregados:', challengesData.length);
      setChallenges(challengesData);
    } catch (err) {
      console.error('❌ Erro ao carregar desafios:', err);
      setError('Erro ao carregar desafios');
    } finally {
      setLoading(false);
    }
  };

  const getChallengeById = async (id: string): Promise<Challenge | null> => {
    try {
      const docRef = doc(firestore, 'playground', 'challenges', 'data', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Challenge;
      }
      return null;
    } catch (err) {
      console.error('Erro ao buscar desafio:', err);
      return null;
    }
  };

  const getChallengesByLevel = (level: string): Challenge[] => {
    return challenges.filter(challenge => challenge.nivel === level);
  };

  const getChallengesByType = (type: string): Challenge[] => {
    return challenges.filter(challenge => challenge.tipo === type);
  };

  const getChallengesByRoute = (route: string): Challenge[] => {
    return challenges.filter(challenge => challenge.rota === route);
  };

  useEffect(() => {
    loadChallenges();
  }, []);

  return {
    challenges,
    loading,
    error,
    loadChallenges,
    getChallengeById,
    getChallengesByLevel,
    getChallengesByType,
    getChallengesByRoute,
  };
}
